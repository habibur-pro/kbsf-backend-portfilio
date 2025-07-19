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
const mongoose_1 = require("mongoose");
const enum_1 = require("../../enum");
const idGenerator_1 = __importDefault(require("../../helpers/idGenerator"));
const AccountTransactionSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: [true, 'is is required'],
        unique: true,
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
    },
    type: {
        type: String,
        enum: {
            values: Object.values(enum_1.EAccountTransactionType),
            message: "Type must be either 'income' or 'expense'",
        },
        required: [true, 'Type is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required'],
    },
    adminId: {
        type: String,
        required: [true, 'Admin ID is required'],
    },
    reference: {
        type: String,
        required: [true, 'Reference is required'],
    },
}, {
    timestamps: true,
});
AccountTransactionSchema.pre('validate', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.id) {
            this.id = yield (0, idGenerator_1.default)(this.constructor);
        }
        next();
    });
});
const AccountTransaction = (0, mongoose_1.model)('accountTransaction', AccountTransactionSchema);
exports.default = AccountTransaction;
