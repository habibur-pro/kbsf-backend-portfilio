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
const giveDonation = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
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
const DonationServices = { giveDonation, getDonations, getDonation };
exports.default = DonationServices;
