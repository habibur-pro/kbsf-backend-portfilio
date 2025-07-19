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
const MemberSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: [true, 'Id is required'],
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        unique: true,
    },
    fatherName: {
        type: String,
        required: [true, "Father's name is required"],
    },
    profession: {
        type: String,
        required: [true, 'profession  is required'],
    },
    photo: {
        type: String,
        default: null,
    },
    gender: {
        type: String,
        enum: {
            values: Object.values(enum_1.EGender),
            message: 'Gender must be one of male, female, or other',
        },
        required: [true, 'Gender is required'],
    },
    maritalStatus: {
        type: String,
        enum: {
            values: Object.values(enum_1.EMaritalStatus),
            message: 'Invalid marital status',
        },
        required: [true, 'Marital status is required'],
    },
    village: {
        type: String,
        required: [true, 'Village is required'],
    },
    district: {
        type: String,
        required: [true, 'District is required'],
    },
    thana: {
        type: String,
        required: [true, 'Thana is required'],
    },
    postOffice: {
        type: String,
        required: [true, 'Post office is required'],
    },
    fullAddress: {
        type: String,
        required: [true, 'Full address is required'],
    },
    email: {
        type: String,
        default: null,
    },
    role: {
        type: String,
        default: 'user',
    },
    bloodGroup: {
        type: String,
        enum: {
            values: Object.values(enum_1.EBloodGroup),
            message: 'Invalid blood group',
        },
        required: [true, 'Blood group is required'],
    },
    lastBloodDonationDate: {
        type: Date,
        default: null,
    },
}, {
    timestamps: true,
});
MemberSchema.pre('validate', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.id) {
            this.id = yield (0, idGenerator_1.default)(this.constructor);
        }
        next();
    });
});
const Member = (0, mongoose_1.model)('member', MemberSchema);
exports.default = Member;
