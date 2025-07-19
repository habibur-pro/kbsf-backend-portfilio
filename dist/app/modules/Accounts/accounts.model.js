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
const idGenerator_1 = __importDefault(require("../../helpers/idGenerator"));
const accountSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: [true, ' ID is required'],
        unique: true,
    },
    adminId: {
        type: String,
        required: [true, 'Admin ID is required'],
    },
    totalBalance: {
        type: Number,
        required: [true, 'Total balance is required'],
        default: 0,
    },
    totalCost: {
        type: Number,
        required: [true, 'Total cost is required'],
        default: 0,
    },
    totalEarning: {
        type: Number,
        required: [true, 'Total earning is required'],
        default: 0,
    },
    totalCostEntry: {
        type: Number,
        required: [true, 'Total cost entry is required'],
        default: 0,
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt automatically
});
accountSchema.pre('validate', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.id) {
            this.id = yield (0, idGenerator_1.default)(this.constructor);
        }
        next();
    });
});
const Accounts = (0, mongoose_1.model)('accounts', accountSchema);
exports.default = Accounts;
