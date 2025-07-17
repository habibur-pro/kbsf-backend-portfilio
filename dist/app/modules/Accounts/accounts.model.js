"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const accountSchema = new mongoose_1.Schema({
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
const Accounts = (0, mongoose_1.model)('accounts', accountSchema);
exports.default = Accounts;
