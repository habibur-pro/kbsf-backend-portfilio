"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const donation_model_1 = require("./donation.model");
const project_model_1 = __importDefault(require("../Project/project.model"));
const ApiErrot_1 = __importDefault(require("../../helpers/ApiErrot"));
const http_status_1 = __importDefault(require("http-status"));
const accounts_model_1 = __importDefault(require("../Accounts/accounts.model"));
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const sslcommerz_lts_1 = __importDefault(require("sslcommerz-lts"));
const config_1 = __importDefault(require("../../config"));
const enum_1 = require("../../enum");
const initiateDonation = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        console.log('payload', payload);
        const store_id = config_1.default.ssl_store_id;
        const store_passwd = config_1.default.ssl_store_pass;
        const is_live = false;
        const baseUrl = `${req.protocol}://${req.get('host')}/api/v1/donations`;
        const tranId = `TXN-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
        let searchProject = null;
        if (payload.projectId) {
            searchProject = yield project_model_1.default.findOne({
                id: payload.projectId,
            })
                .session(session)
                .lean();
        }
        const data = {
            total_amount: payload.amount,
            currency: 'BDT',
            tran_id: tranId, // use unique tran_id for each api call
            success_url: `${baseUrl}/success/${tranId}`,
            fail_url: `${baseUrl}/fail/${tranId}`,
            cancel_url: `${baseUrl}/fail/${tranId}`,
            ipn_url: `${baseUrl}/ipn`,
            shipping_method: 'Courier',
            product_name: (searchProject === null || searchProject === void 0 ? void 0 : searchProject.projectName) || 'Donation.',
            product_category: 'Donation',
            product_profile: 'general',
            cus_name: payload.name,
            cus_email: payload.email || '',
            cus_add1: 'f',
            cus_add2: 'f',
            cus_city: 'f',
            cus_state: 'f',
            cus_postcode: 'f',
            cus_country: 'Bangladesh',
            cus_phone: payload.phone,
            cus_fax: 'f',
            ship_name: 'f',
            ship_add1: 'f',
            ship_add2: 'f',
            ship_city: 'f',
            ship_state: 'f',
            ship_postcode: 1000,
            ship_country: 'Bangladesh',
        };
        // console.log({ store_id, store_passwd })
        const sslcz = new sslcommerz_lts_1.default(store_id, store_passwd, is_live);
        const apiResponse = yield sslcz.init(data);
        const GatewayPageURL = apiResponse === null || apiResponse === void 0 ? void 0 : apiResponse.GatewayPageURL;
        if (GatewayPageURL) {
            yield donation_model_1.Donation.create([
                {
                    name: (payload === null || payload === void 0 ? void 0 : payload.name) || null,
                    amount: payload.amount,
                    senderNumber: (payload === null || payload === void 0 ? void 0 : payload.phone) || null,
                    paymentMethod: enum_1.EPaymentMethod.SSl,
                    projectId: (searchProject === null || searchProject === void 0 ? void 0 : searchProject.id) || null,
                    status: enum_1.EDonationStatus.PENDING,
                    transactionId: tranId,
                    notes: (payload === null || payload === void 0 ? void 0 : payload.message) || null,
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    project: (searchProject === null || searchProject === void 0 ? void 0 : searchProject._id) || null,
                },
            ], { session });
            yield session.commitTransaction(); // Don't forget to commit
            return { url: GatewayPageURL };
        }
        else {
            throw new ApiErrot_1.default(http_status_1.default.BAD_REQUEST, 'payment init failed');
        }
    }
    catch (error) {
        yield session.abortTransaction();
        throw new ApiErrot_1.default(http_status_1.default.BAD_REQUEST, (error === null || error === void 0 ? void 0 : error.message) || 'something went wrong');
    }
    finally {
        yield session.endSession();
    }
});
const successPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const tranId = req.params.tranId;
        console.log({ tranId });
        const updatedDonation = yield donation_model_1.Donation.findOneAndUpdate({ transactionId: tranId }, { status: enum_1.EDonationStatus.APPROVED }, { new: true, session });
        if (!updatedDonation) {
            throw new ApiErrot_1.default(http_status_1.default.BAD_REQUEST, 'payment failed');
        }
        if (updatedDonation === null || updatedDonation === void 0 ? void 0 : updatedDonation.projectId) {
            yield project_model_1.default.findOneAndUpdate({ id: updatedDonation.projectId }, { $inc: { currentAmount: (updatedDonation === null || updatedDonation === void 0 ? void 0 : updatedDonation.amount) || 0 } }, { new: true, session });
        }
        yield accounts_model_1.default.findOneAndUpdate({}, {
            $inc: {
                totalBalance: (updatedDonation === null || updatedDonation === void 0 ? void 0 : updatedDonation.amount) || 0,
                totalEarning: (updatedDonation === null || updatedDonation === void 0 ? void 0 : updatedDonation.amount) || 0,
            },
        }, { new: true, session });
        const url = `${config_1.default.frontend_url}/donation/success`;
        yield session.commitTransaction();
        console.log({ url });
        res.redirect(url);
    }
    catch (error) {
        console.error('Payment success handling failed:', error);
        res.redirect(`${config_1.default.frontend_url}/donation/fail`);
    }
});
const failedPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tranId = req.params.tranId;
        console.log({ tranId });
        yield donation_model_1.Donation.findOneAndUpdate({ transactionId: tranId }, { status: enum_1.EDonationStatus.REJECTED }, { new: true });
        const url = `${config_1.default.frontend_url}/donation/fail`;
        console.log({ url });
        res.redirect(url);
    }
    catch (error) {
        console.error('Payment success handling failed:', error);
        res.redirect(`${config_1.default.frontend_url}/donation/fail`);
    }
});
const giveDonation = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    console.log(payload);
    session.startTransaction();
    try {
        const donationPayload = Object.assign({}, payload);
        if (payload.projectId) {
            const project = yield project_model_1.default.findOne({
                id: payload.projectId,
            }).session(session);
            if (!project)
                throw new ApiErrot_1.default(http_status_1.default.BAD_REQUEST, 'project not found');
            yield project_model_1.default.findOneAndUpdate({ id: project.id }, { $inc: { currentAmount: payload.amount } }, { new: true, session });
            donationPayload.project = project._id;
            donationPayload.projectName = project.projectName;
        }
        yield donation_model_1.Donation.create([donationPayload], { session });
        const accounts = yield accounts_model_1.default.findOne().session(session);
        if (!accounts)
            throw new ApiErrot_1.default(http_status_1.default.BAD_REQUEST, 'accounts not found');
        yield accounts_model_1.default.findByIdAndUpdate(accounts._id, {
            $inc: {
                totalBalance: payload.amount,
                totalEarning: payload.amount,
            },
        }, { new: true, session });
        yield session.commitTransaction();
        return { message: 'thanks for donation' };
    }
    catch (error) {
        yield session.abortTransaction();
        throw new ApiErrot_1.default(http_status_1.default.BAD_REQUEST, (error === null || error === void 0 ? void 0 : error.message) || 'something went wrong');
    }
    finally {
        yield session.endSession();
    }
});
const getDonations = () => __awaiter(void 0, void 0, void 0, function* () {
    const donations = yield donation_model_1.Donation.find()
        .populate('project')
        .sort({ createdAt: -1 });
    return donations;
});
const getDonation = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const donation = yield donation_model_1.Donation.findOne({ id }).populate('project');
    return donation;
});
const DonationServices = {
    giveDonation,
    getDonations,
    getDonation,
    initiateDonation,
    successPayment,
    failedPayment,
};
exports.default = DonationServices;
