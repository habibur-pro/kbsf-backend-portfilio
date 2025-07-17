"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const message_controller_1 = __importDefault(require("./message.controller"));
const router = (0, express_1.Router)();
router.get('/', message_controller_1.default.getMessages);
router.post('/send', message_controller_1.default.send);
router.patch('/:messageId/update', message_controller_1.default.updateStatus);
const MessageRoutes = router;
exports.default = MessageRoutes;
