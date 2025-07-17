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
exports.Donation = void 0;
const mongoose_1 = require("mongoose");
const idGenerator_1 = __importDefault(require("../../helpers/idGenerator"));
const DonationSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: [true, 'Donation ID is required'],
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    userId: {
        type: String,
        default: null,
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required'],
    },
    transactionId: {
        type: String,
        default: null,
    },
    paymentMethod: {
        type: String,
        required: [true, 'Payment method is required'],
    },
    senderNumber: {
        type: String,
        default: null,
    },
    projectId: {
        type: String,
        default: null,
    },
    project: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'project',
        default: null,
    },
    status: {
        type: String,
        enum: {
            values: ['pending', 'approved', 'rejected'],
            message: 'Status must be either pending, approved, or rejected',
        },
        default: 'approved',
    },
}, {
    timestamps: true,
});
DonationSchema.pre('validate', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.id) {
            this.id = yield (0, idGenerator_1.default)(this.constructor);
        }
        next();
    });
});
exports.Donation = (0, mongoose_1.model)('donation', DonationSchema);
