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
const member_service_1 = __importDefault(require("./member.service"));
const addMember = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield member_service_1.default.addMember(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'member added successfully',
        data: result,
    });
}));
const getMembers = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield member_service_1.default.getMembers();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'members fetched successfully',
        data: result,
    });
}));
const getMember = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const memberId = req.params.id;
    const result = yield member_service_1.default.getMember(memberId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'member fetched successfully',
        data: result,
    });
}));
const createAdmin = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const memberId = req.params.memberId;
    const result = yield member_service_1.default.createAdmin(memberId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'admin successfully',
        data: result,
    });
}));
const updateMember = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const memberId = req.params.memberId;
    const result = yield member_service_1.default.updateMember(memberId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'member updated successfully',
        data: result,
    });
}));
const deleteMember = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const memberId = req.params.memberId;
    const result = yield member_service_1.default.deleteMember(memberId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'member deleted successfully',
        data: result,
    });
}));
const MemberController = {
    addMember,
    getMembers,
    getMember,
    createAdmin,
    updateMember,
    deleteMember,
};
exports.default = MemberController;
