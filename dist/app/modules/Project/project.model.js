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
const ProjectSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: [true, 'id is required'],
        unique: true,
    },
    projectNumber: {
        type: String,
        required: [true, 'Project number is required'],
        unique: true,
    },
    projectType: {
        type: String,
        enum: {
            values: Object.values(enum_1.EProjectType),
            message: 'Invalid project type',
        },
        required: [true, 'Project type is required'],
    },
    image: {
        type: String,
        required: [true, 'image  is required'],
    },
    projectName: {
        type: String,
        required: [true, 'Project name is required'],
        trim: true,
    },
    targetAmount: {
        type: Number,
        default: 0,
    },
    currentAmount: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: {
            values: Object.values(enum_1.EProjectStatus),
            message: 'Invalid project status',
        },
        default: enum_1.EProjectStatus.ACTIVE,
    },
    endDate: {
        type: Date,
        default: null,
    },
    projectDescription: {
        type: String,
        required: [true, 'Project description is required'],
    },
}, {
    timestamps: true,
});
ProjectSchema.pre('validate', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.id) {
            this.id = yield (0, idGenerator_1.default)(this.constructor);
        }
        next();
    });
});
const Project = (0, mongoose_1.model)('project', ProjectSchema);
exports.default = Project;
