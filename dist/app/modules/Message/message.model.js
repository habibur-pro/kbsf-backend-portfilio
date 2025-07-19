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
const enum_1 = require("../../enum");
const MessageSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: [true, 'Message ID is required'],
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
    },
    subject: {
        type: String,
        required: [true, 'subject is required'],
    },
    message: {
        type: String,
        required: [true, 'Message content is required'],
    },
    status: {
        type: String,
        default: enum_1.EMessageStatus.UNREAD,
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt
});
MessageSchema.pre('validate', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.id) {
            this.id = yield (0, idGenerator_1.default)(this.constructor);
        }
        next();
    });
});
const Message = (0, mongoose_1.model)('message', MessageSchema);
exports.default = Message;
