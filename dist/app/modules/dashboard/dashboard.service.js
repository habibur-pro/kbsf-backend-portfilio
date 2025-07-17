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
const enum_1 = require("../../enum");
const donation_model_1 = require("../Donation/donation.model");
const member_model_1 = __importDefault(require("../Member/member.model"));
const project_model_1 = __importDefault(require("../Project/project.model"));
const date_fns_1 = require("date-fns");
const bengaliMonths = [
    'জানুয়ারি',
    'ফেব্রুয়ারি',
    'মার্চ',
    'এপ্রিল',
    'মে',
    'জুন',
    'জুলাই',
    'আগস্ট',
    'সেপ্টেম্বর',
    'অক্টোবর',
    'নভেম্বর',
    'ডিসেম্বর',
];
const bengaliWeekDays = [
    'রবিবার',
    'সোমবার',
    'মঙ্গলবার',
    'বুধবার',
    'বৃহস্পতিবার',
    'শুক্রবার',
    'শনিবার',
];
const getDashboardSummary = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const now = new Date();
    // 1. Total donation amount & count
    const donationStats = yield donation_model_1.Donation.aggregate([
        { $match: { status: 'approved' } },
        {
            $group: {
                _id: null,
                totalAmount: { $sum: '$amount' },
                count: { $sum: 1 },
            },
        },
    ]);
    const totalDonation = ((_a = donationStats[0]) === null || _a === void 0 ? void 0 : _a.totalAmount) || 0;
    const totalDonationCount = ((_b = donationStats[0]) === null || _b === void 0 ? void 0 : _b.count) || 0;
    // 2. Total members
    const totalMembers = yield member_model_1.default.countDocuments();
    // 3. Total active projects
    const totalActiveProjects = yield project_model_1.default.countDocuments({
        status: enum_1.EProjectStatus.ACTIVE,
    });
    // 4. Last 6 months chart (only donation amount)
    const last6MonthsChart = yield Promise.all([...Array(6)].map((_, i) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const date = (0, date_fns_1.subMonths)(now, 5 - i);
        const label = bengaliMonths[date.getMonth()];
        const start = (0, date_fns_1.startOfMonth)(date);
        const end = (0, date_fns_1.endOfMonth)(date);
        const donation = yield donation_model_1.Donation.aggregate([
            {
                $match: {
                    status: 'approved',
                    createdAt: { $gte: start, $lte: end },
                },
            },
            {
                $group: { _id: null, total: { $sum: '$amount' } },
            },
        ]);
        return {
            label,
            amount: ((_a = donation[0]) === null || _a === void 0 ? void 0 : _a.total) || 0,
        };
    })));
    // 5. Last 7 days chart (label, ডোনেশন, নতুন সদস্য)
    const startDate = (0, date_fns_1.startOfDay)((0, date_fns_1.subDays)(now, 6));
    const endDate = (0, date_fns_1.endOfDay)(now);
    const [dailyDonations, dailyUsers] = yield Promise.all([
        donation_model_1.Donation.aggregate([
            {
                $match: {
                    status: 'approved',
                    createdAt: { $gte: startDate, $lte: endDate },
                },
            },
            {
                $group: {
                    _id: {
                        year: { $year: '$createdAt' },
                        month: { $month: '$createdAt' },
                        day: { $dayOfMonth: '$createdAt' },
                    },
                    totalAmount: { $sum: '$amount' },
                },
            },
        ]),
        member_model_1.default.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate, $lte: endDate },
                },
            },
            {
                $group: {
                    _id: {
                        year: { $year: '$createdAt' },
                        month: { $month: '$createdAt' },
                        day: { $dayOfMonth: '$createdAt' },
                    },
                    count: { $sum: 1 },
                },
            },
        ]),
    ]);
    const last7DaysChart = [...Array(7)].map((_, i) => {
        const date = (0, date_fns_1.subDays)(now, 6 - i);
        const y = date.getFullYear();
        const m = date.getMonth() + 1;
        const d = date.getDate();
        const label = bengaliWeekDays[date.getDay()];
        const donationEntry = dailyDonations.find((x) => x._id.year === y && x._id.month === m && x._id.day === d);
        const userEntry = dailyUsers.find((x) => x._id.year === y && x._id.month === m && x._id.day === d);
        return {
            label,
            ডোনেশন: (donationEntry === null || donationEntry === void 0 ? void 0 : donationEntry.totalAmount) || 0,
            'নতুন সদস্য': (userEntry === null || userEntry === void 0 ? void 0 : userEntry.count) || 0,
        };
    });
    return {
        totalDonation,
        totalDonationCount,
        totalMembers,
        totalActiveProjects,
        last6MonthsChart,
        last7DaysChart,
    };
});
const DashboardServices = { getDashboardSummary };
exports.default = DashboardServices;
