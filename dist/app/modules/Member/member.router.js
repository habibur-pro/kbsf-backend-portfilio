"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const member_controller_1 = __importDefault(require("./member.controller"));
const router = (0, express_1.Router)();
router.post('/add', member_controller_1.default.addMember);
router.get('/:id', member_controller_1.default.getMember);
router.get('/', member_controller_1.default.getMembers);
router.patch('/:memberId/make-admin', member_controller_1.default.createAdmin);
router.patch('/:memberId/update', member_controller_1.default.updateMember);
router.delete('/:memberId/delete', member_controller_1.default.deleteMember);
const MemberRoutes = router;
exports.default = MemberRoutes;
