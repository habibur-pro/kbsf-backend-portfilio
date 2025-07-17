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
const accounts_model_1 = __importDefault(require("./accounts.model"));
const http_status_1 = __importDefault(require("http-status"));
const createAccounts = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const member = yield member_model_1.default.findOne({ id: payload.userId, role: 'admin' });
    if (!member) {
        throw new ApiErrot_1.default(http_status_1.default.UNAUTHORIZED, 'unauthorize access');
    }
    const existAccounts = yield accounts_model_1.default.findOne();
    if (!existAccounts) {
        yield accounts_model_1.default.deleteMany();
    }
    yield accounts_model_1.default.create({ adminId: member.id });
    return { message: 'accounts created' };
});
const AccountsServices = { createAccounts };
exports.default = AccountsServices;
