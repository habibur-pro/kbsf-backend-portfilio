"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("./auth.controller"));
const router = (0, express_1.Router)();
router.post('/admin/verify-login', auth_controller_1.default.verifyAdminLogin);
router.post('/admin/login', auth_controller_1.default.adminLogin);
const AuthRoutes = router;
exports.default = AuthRoutes;
