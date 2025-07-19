"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const accountTransaction_controller_1 = __importDefault(require("./accountTransaction.controller"));
const router = (0, express_1.Router)();
router.get('/', accountTransaction_controller_1.default.getTransactions);
router.post('/', accountTransaction_controller_1.default.addTransaction);
router.patch('/:transactionId/update', accountTransaction_controller_1.default.updateTransaction);
const AccountsTransactionRoutes = router;
exports.default = AccountsTransactionRoutes;
