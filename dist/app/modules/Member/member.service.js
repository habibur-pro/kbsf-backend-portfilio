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
const member_model_1 = __importDefault(require("./member.model"));
const http_status_1 = __importDefault(require("http-status"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_model_1 = __importDefault(require("../Auth/auth.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const addMember = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const isExist = yield member_model_1.default.findOne({
            $or: [
                { phone: payload.phone },
                { name: payload.name, fatherName: payload.fatherName },
            ],
        }).session(session);
        if (isExist) {
            throw new ApiErrot_1.default(http_status_1.default.BAD_REQUEST, 'phone, name or email already used');
        }
        const newMember = yield member_model_1.default.create([payload], { session: session });
        const saltRounds = 10;
        const hashedPassword = yield bcrypt_1.default.hash((payload === null || payload === void 0 ? void 0 : payload.password) || 'kbsf.com', saltRounds);
        console.log(payload.password, hashedPassword);
        yield auth_model_1.default.create([
            {
                email: newMember[0].email,
                userId: newMember[0].id,
                phone: newMember[0].phone,
                role: 'user',
                password: hashedPassword,
            },
        ], { session: session });
        yield session.commitTransaction();
        return { message: 'member added' };
    }
    catch (error) {
        yield session.abortTransaction();
        throw new ApiErrot_1.default(http_status_1.default.BAD_REQUEST, (error === null || error === void 0 ? void 0 : error.message) || 'something went wrong');
    }
    finally {
        yield session.endSession();
    }
});
const getMembers = () => __awaiter(void 0, void 0, void 0, function* () {
    const allMembers = yield member_model_1.default.find();
    return allMembers;
});
const getMember = (memberId) => __awaiter(void 0, void 0, void 0, function* () {
    const member = yield member_model_1.default.findOne({ id: memberId });
    return member;
});
const createAdmin = (memberId) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const member = yield member_model_1.default.findOne({ id: memberId }).session(session);
        if (!member) {
            throw new ApiErrot_1.default(http_status_1.default.BAD_REQUEST, 'member not found');
        }
        yield member_model_1.default.findOneAndUpdate({ id: memberId }, { role: 'admin' }, { new: true, session });
        yield auth_model_1.default.findOneAndUpdate({
            userId: member.id,
        }, { role: 'admin' }, { new: true, session });
        yield session.commitTransaction();
        return { message: 'admin created' };
    }
    catch (error) {
        yield session.abortTransaction();
        throw new ApiErrot_1.default(http_status_1.default.BAD_REQUEST, (error === null || error === void 0 ? void 0 : error.message) || 'something went wrong');
    }
    finally {
        yield session.endSession();
    }
});
const updateMember = (memberId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const member = yield member_model_1.default.findOne({ id: memberId }).session(session);
        if (!member)
            throw new Error('Member not found');
        yield member_model_1.default.findOneAndUpdate({ id: memberId }, payload, {
            new: true,
            session,
        });
        const authUpdateFields = {};
        if (payload.phone)
            authUpdateFields.phone = payload.phone;
        if (payload.email)
            authUpdateFields.email = payload.email;
        if (payload.role)
            authUpdateFields.role = payload.role;
        if (payload.password)
            authUpdateFields.role = payload.password;
        if (Object.keys(authUpdateFields).length > 0) {
            yield auth_model_1.default.findOneAndUpdate({ userId: member.id }, authUpdateFields, { new: true, session });
        }
        yield session.commitTransaction();
        return { message: 'updated' };
    }
    catch (error) {
        yield session.abortTransaction();
        throw new ApiErrot_1.default(http_status_1.default.BAD_REQUEST, (error === null || error === void 0 ? void 0 : error.message) || 'something went wrong');
    }
    finally {
        yield session.endSession();
    }
});
const deleteMember = (memberId) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        yield member_model_1.default.findOneAndDelete({ id: memberId }, { session });
        yield auth_model_1.default.findOneAndDelete({ userId: memberId }, { session });
        yield session.commitTransaction();
        return { message: 'deleted' };
    }
    catch (error) {
        yield session.abortTransaction();
        throw error; // optionally rethrow or handle error
    }
    finally {
        session.endSession();
    }
});
const MemberServices = {
    addMember,
    getMembers,
    getMember,
    createAdmin,
    updateMember,
    deleteMember,
};
exports.default = MemberServices;
