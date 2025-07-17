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
const ApiErrot_1 = __importDefault(require("../../helpers/ApiErrot"));
const member_model_1 = __importDefault(require("../Member/member.model"));
const auth_model_1 = __importDefault(require("./auth.model"));
const http_status_1 = __importDefault(require("http-status"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const verifyAdminLogin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('payload', payload);
    const member = yield member_model_1.default.findOne({ phone: payload.phone, role: 'admin' });
    if (!member)
        throw new ApiErrot_1.default(http_status_1.default.BAD_REQUEST, 'user not found');
    const auth = yield auth_model_1.default.findOne({ phone: payload.phone, role: 'admin' });
    if (!auth)
        throw new ApiErrot_1.default(http_status_1.default.BAD_REQUEST, 'user not found');
    console.log('auth', auth);
    console.log('member', member);
    const compare = bcrypt_1.default.compare(payload.password, auth.password);
    if (!compare)
        throw new ApiErrot_1.default(http_status_1.default.BAD_REQUEST, 'wrong password');
    return { role: member.role };
});
const adminLogin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const member = yield member_model_1.default.findOne({ phone: payload.phone, role: 'admin' });
    if (!member)
        throw new ApiErrot_1.default(http_status_1.default.BAD_REQUEST, 'user not found');
    const auth = yield auth_model_1.default.findOne({ phone: payload.phone, role: 'admin' });
    if (!auth)
        throw new ApiErrot_1.default(http_status_1.default.BAD_REQUEST, 'user not found');
    const compare = bcrypt_1.default.compare(payload.password, auth.password);
    if (!compare)
        throw new ApiErrot_1.default(http_status_1.default.BAD_REQUEST, 'wrong password');
    const token = jsonwebtoken_1.default.sign({ id: member.id, role: member.role }, config_1.default.jwt_secret);
    const responseData = {
        id: member.id,
        name: member.name,
        role: member.role,
        email: member.email,
        photo: member.photo,
        phone: member.phone,
        accessToken: token,
    };
    return responseData;
});
const AuthServices = {
    adminLogin,
    verifyAdminLogin,
};
exports.default = AuthServices;
