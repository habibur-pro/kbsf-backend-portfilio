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
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../helpers/sendResponse"));
const asyncHandler_1 = __importDefault(require("../../helpers/asyncHandler"));
const donation_service_1 = __importDefault(require("./donation.service"));
const giveDonation = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield donation_service_1.default.giveDonation(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'donation added successfully',
        data: result,
    });
}));
const getDonations = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield donation_service_1.default.getDonations();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'donations fetched successfully',
        data: result,
    });
}));
const getDonation = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const donationId = req.params.donationId;
    const result = yield donation_service_1.default.getDonation(donationId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'donation fetched successfully',
        data: result,
    });
}));
const initiateDonation = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield donation_service_1.default.initiateDonation(req);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'donation initiated successfully',
        data: result,
    });
}));
const successPayment = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield donation_service_1.default.successPayment(req, res);
}));
const failPayment = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield donation_service_1.default.failedPayment(req, res);
}));
const DonationController = {
    giveDonation,
    getDonations,
    getDonation,
    initiateDonation,
    successPayment,
    failPayment,
};
exports.default = DonationController;
