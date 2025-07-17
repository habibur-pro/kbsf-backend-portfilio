"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const accounts_controller_1 = __importDefault(require("./accounts.controller"));
const router = (0, express_1.Router)();
router.post('/', accounts_controller_1.default.createAccounts);
const AccountsRoutes = router;
exports.default = AccountsRoutes;
