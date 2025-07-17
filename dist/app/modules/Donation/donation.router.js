"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const donation_controller_1 = __importDefault(require("./donation.controller"));
const router = (0, express_1.Router)();
router.post('/', donation_controller_1.default.giveDonation);
router.get('/', donation_controller_1.default.getDonations);
router.get('/:donationId', donation_controller_1.default.getDonation);
const DonationRouter = router;
exports.default = DonationRouter;
