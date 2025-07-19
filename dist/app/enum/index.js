"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EAccountTransactionType = exports.EPaymentMethod = exports.EDonationStatus = exports.EMessageStatus = exports.EProjectStatus = exports.EProjectType = exports.EBloodGroup = exports.EMaritalStatus = exports.EGender = void 0;
var EGender;
(function (EGender) {
    EGender["Male"] = "male";
    EGender["Female"] = "female";
})(EGender || (exports.EGender = EGender = {}));
var EMaritalStatus;
(function (EMaritalStatus) {
    EMaritalStatus["Single"] = "single";
    EMaritalStatus["Married"] = "married";
    EMaritalStatus["Divorced"] = "divorced";
    EMaritalStatus["Widowed"] = "widowed";
    EMaritalStatus["Separated"] = "separated";
    EMaritalStatus["Other"] = "other";
})(EMaritalStatus || (exports.EMaritalStatus = EMaritalStatus = {}));
var EBloodGroup;
(function (EBloodGroup) {
    EBloodGroup["APositive"] = "A+";
    EBloodGroup["ANegative"] = "A-";
    EBloodGroup["BPositive"] = "B+";
    EBloodGroup["BNegative"] = "B-";
    EBloodGroup["ABPositive"] = "AB+";
    EBloodGroup["ABNegative"] = "AB-";
    EBloodGroup["OPositive"] = "O+";
    EBloodGroup["ONegative"] = "O-";
})(EBloodGroup || (exports.EBloodGroup = EBloodGroup = {}));
var EProjectType;
(function (EProjectType) {
    EProjectType["Fundraising"] = "fundraising";
    EProjectType["Volunteer"] = "volunteer";
})(EProjectType || (exports.EProjectType = EProjectType = {}));
var EProjectStatus;
(function (EProjectStatus) {
    EProjectStatus["UPCOMING"] = "upcoming";
    EProjectStatus["ACTIVE"] = "active";
    EProjectStatus["COMPLETED"] = "completed";
    EProjectStatus["CANCELLED"] = "cancelled";
    EProjectStatus["PAUSED"] = "paused";
    EProjectStatus["DRAFT"] = "draft";
    EProjectStatus["CLOSED"] = "closed";
    EProjectStatus["ARCHIVED"] = "archived";
})(EProjectStatus || (exports.EProjectStatus = EProjectStatus = {}));
var EMessageStatus;
(function (EMessageStatus) {
    EMessageStatus["READ"] = "read";
    EMessageStatus["UNREAD"] = "unread";
})(EMessageStatus || (exports.EMessageStatus = EMessageStatus = {}));
var EDonationStatus;
(function (EDonationStatus) {
    EDonationStatus["PENDING"] = "pending";
    EDonationStatus["APPROVED"] = "approved";
    EDonationStatus["REJECTED"] = "rejected";
})(EDonationStatus || (exports.EDonationStatus = EDonationStatus = {}));
var EPaymentMethod;
(function (EPaymentMethod) {
    EPaymentMethod["bKash"] = "bkash";
    EPaymentMethod["Nagad"] = "nagad";
    EPaymentMethod["Rocket"] = "rocket";
    EPaymentMethod["Upay"] = "upay";
    EPaymentMethod["Card"] = "card";
    EPaymentMethod["Others"] = "others";
})(EPaymentMethod || (exports.EPaymentMethod = EPaymentMethod = {}));
var EAccountTransactionType;
(function (EAccountTransactionType) {
    EAccountTransactionType["Income"] = "income";
    EAccountTransactionType["Expense"] = "expense";
})(EAccountTransactionType || (exports.EAccountTransactionType = EAccountTransactionType = {}));
