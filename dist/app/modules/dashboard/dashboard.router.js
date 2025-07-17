"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboard_controller_1 = __importDefault(require("./dashboard.controller"));
const router = (0, express_1.Router)();
router.get('/', dashboard_controller_1.default.getDashboardSummary);
const DashboardRouter = router;
exports.default = DashboardRouter;
