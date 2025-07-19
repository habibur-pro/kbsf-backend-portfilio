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
const member_model_1 = __importDefault(require("../Member/member.model"));
const http_status_1 = __importDefault(require("http-status"));
const ApiErrot_1 = __importDefault(require("../../helpers/ApiErrot"));
const enum_1 = require("../../enum");
const accounts_model_1 = __importDefault(require("../Accounts/accounts.model"));
const accountTransaction_model_1 = __importDefault(require("./accountTransaction.model"));
const addTransaction = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        if (!payload.amount || payload.amount <= 0) {
            throw new ApiErrot_1.default(http_status_1.default.BAD_REQUEST, 'Amount must be greater than 0');
        }
        const admin = yield member_model_1.default.findOne({
            id: payload.adminId,
            role: 'admin',
        }).session(session);
        if (!admin) {
            throw new ApiErrot_1.default(http_status_1.default.UNAUTHORIZED, 'Unauthorized access');
        }
        const accounts = yield accounts_model_1.default.findOne({
            adminId: payload.adminId,
        }).session(session);
        if (!accounts) {
            throw new ApiErrot_1.default(http_status_1.default.NOT_FOUND, 'Accounts not found');
        }
        const newTransaction = yield accountTransaction_model_1.default.create([payload], {
            session,
        });
        if (!newTransaction.length) {
            throw new ApiErrot_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create transaction');
        }
        const amount = newTransaction[0].amount;
        if (payload.type === enum_1.EAccountTransactionType.Income) {
            yield accounts_model_1.default.findOneAndUpdate({ id: accounts.id }, {
                $inc: {
                    totalBalance: amount,
                    totalEarning: amount,
                },
            }, { new: true, session });
        }
        else if (payload.type === enum_1.EAccountTransactionType.Expense) {
            if (accounts.totalBalance < amount) {
                throw new ApiErrot_1.default(http_status_1.default.BAD_REQUEST, 'Insufficient balance');
            }
            yield accounts_model_1.default.findOneAndUpdate({ id: accounts.id }, {
                $inc: {
                    totalBalance: -amount,
                    totalCost: amount,
                    totalCostEntry: 1,
                },
            }, { new: true, session });
        }
        else {
            throw new ApiErrot_1.default(http_status_1.default.BAD_REQUEST, 'Invalid transaction type');
        }
        yield session.commitTransaction();
        return { message: 'Transaction added' };
    }
    catch (error) {
        yield session.abortTransaction();
        throw new ApiErrot_1.default(http_status_1.default.BAD_REQUEST, (error === null || error === void 0 ? void 0 : error.message) || 'Something went wrong');
    }
    finally {
        yield session.endSession();
    }
});
const updateTransaction = (transactionId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    delete payload.type; // Don't allow changing type for now
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const transaction = yield accountTransaction_model_1.default.findOne({
            id: transactionId,
        }).session(session);
        if (!transaction) {
            throw new ApiErrot_1.default(http_status_1.default.BAD_REQUEST, 'Transaction not found');
        }
        const admin = yield member_model_1.default.findOne({
            id: payload.adminId,
            role: 'admin',
        }).session(session);
        if (!admin) {
            throw new ApiErrot_1.default(http_status_1.default.UNAUTHORIZED, 'Unauthorized access');
        }
        const accounts = yield accounts_model_1.default.findOne({
            adminId: payload.adminId,
        }).session(session);
        if (!accounts) {
            throw new ApiErrot_1.default(http_status_1.default.NOT_FOUND, 'Accounts not found');
        }
        // Handle amount update
        if (payload.amount !== undefined) {
            const oldAmount = transaction.amount;
            const newAmount = payload.amount;
            const type = transaction.type;
            const difference = newAmount - oldAmount;
            if (difference !== 0) {
                const newTotalBalance = type === 'income'
                    ? accounts.totalBalance + difference
                    : accounts.totalBalance - difference;
                const newTotalEarning = type === 'income'
                    ? accounts.totalEarning + difference
                    : accounts.totalEarning;
                const newTotalCost = type === 'expense'
                    ? accounts.totalCost + difference
                    : accounts.totalCost;
                // ❌ Validate no negative values
                if (newTotalBalance < 0) {
                    throw new ApiErrot_1.default(http_status_1.default.BAD_REQUEST, 'Transaction update failed: insufficient balance.');
                }
                if (type === 'income' && newTotalEarning < 0) {
                    throw new ApiErrot_1.default(http_status_1.default.BAD_REQUEST, 'Transaction update failed: insufficient balance.');
                }
                if (type === 'expense' && newTotalCost < 0) {
                    throw new ApiErrot_1.default(http_status_1.default.BAD_REQUEST, 'Transaction update failed: total cost cannot be negative.');
                }
                // ✅ Apply the update
                const updateFields = {};
                if (type === 'income') {
                    updateFields.totalBalance = difference;
                    updateFields.totalEarning = difference;
                }
                else if (type === 'expense') {
                    updateFields.totalBalance = -difference;
                    updateFields.totalCost = difference;
                }
                yield accounts_model_1.default.findOneAndUpdate({ id: accounts.id }, { $inc: updateFields }, { new: true, session });
            }
            // Update the transaction
            yield accountTransaction_model_1.default.findOneAndUpdate({ id: transactionId }, payload, { new: true, session });
        }
        yield session.commitTransaction();
    }
    catch (error) {
        yield session.abortTransaction();
        throw new ApiErrot_1.default(http_status_1.default.BAD_REQUEST, (error === null || error === void 0 ? void 0 : error.message) || 'Something went wrong during transaction update');
    }
    finally {
        yield session.endSession();
    }
});
const getTransactions = () => __awaiter(void 0, void 0, void 0, function* () {
    const transactions = yield accountTransaction_model_1.default.find();
    return transactions;
});
const AccountTransactionServices = {
    addTransaction,
    getTransactions,
    updateTransaction,
};
exports.default = AccountTransactionServices;
