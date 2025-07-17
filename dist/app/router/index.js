"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const member_router_1 = __importDefault(require("../modules/Member/member.router"));
const auth_router_1 = __importDefault(require("../modules/Auth/auth.router"));
const donation_router_1 = __importDefault(require("../modules/Donation/donation.router"));
const account_router_1 = __importDefault(require("../modules/Accounts/account.router"));
const project_router_1 = __importDefault(require("../modules/Project/project.router"));
const dashboard_router_1 = __importDefault(require("../modules/dashboard/dashboard.router"));
const gallery_router_1 = __importDefault(require("../modules/Gallery/gallery.router"));
const message_router_1 = __importDefault(require("../modules/Message/message.router"));
const router = (0, express_1.Router)();
const routes = [
    {
        path: '/members',
        route: member_router_1.default,
    },
    {
        path: '/auth',
        route: auth_router_1.default,
    },
    {
        path: '/donations',
        route: donation_router_1.default,
    },
    {
        path: '/accounts',
        route: account_router_1.default,
    },
    {
        path: '/projects',
        route: project_router_1.default,
    },
    {
        path: '/dashboard',
        route: dashboard_router_1.default,
    },
    {
        path: '/gallery',
        route: gallery_router_1.default,
    },
    {
        path: '/messages',
        route: message_router_1.default,
    },
];
routes.map((route) => router.use(route.path, route.route));
exports.default = router;
