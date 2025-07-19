"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EAccountTransactionType = exports.EPaymentMethod = exports.EDonationStatus = exports.EMessageStatus = exports.EProjectStatus = exports.EProjectType = exports.EBloodGroup = exports.EMaritalStatus = exports.EGender = void 0;
var EGender;
(function (EGender) {
    EGender["Male"] = "\u09AA\u09C1\u09B0\u09C1\u09B7";
    EGender["Female"] = "\u09A8\u09BE\u09B0\u09C0";
})(EGender || (exports.EGender = EGender = {}));
var EMaritalStatus;
(function (EMaritalStatus) {
    EMaritalStatus["Single"] = "\u0985\u09AC\u09BF\u09AC\u09BE\u09B9\u09BF\u09A4";
    EMaritalStatus["Married"] = "\u09AC\u09BF\u09AC\u09BE\u09B9\u09BF\u09A4";
    EMaritalStatus["Divorced"] = "\u09A4\u09BE\u09B2\u09BE\u0995\u09AA\u09CD\u09B0\u09BE\u09AA\u09CD\u09A4";
    EMaritalStatus["Widowed"] = "\u09AC\u09BF\u09A7\u09AC\u09BE";
    EMaritalStatus["Separated"] = "\u0986\u09B2\u09BE\u09A6\u09BE ";
    EMaritalStatus["Other"] = "\u0985\u099C\u09BE\u09A8\u09BE";
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
    EProjectType["Fundraising"] = "\u09A4\u09B9\u09AC\u09BF\u09B2 \u09B8\u0982\u0997\u09CD\u09B0\u09B9";
    EProjectType["Volunteer"] = "\u09B8\u09CD\u09AC\u09C7\u099A\u09CD\u099B\u09BE\u09B8\u09C7\u09AC\u0995";
})(EProjectType || (exports.EProjectType = EProjectType = {}));
var EProjectStatus;
(function (EProjectStatus) {
    EProjectStatus["UPCOMING"] = "\u0986\u09B8\u09A8\u09CD\u09A8";
    EProjectStatus["ACTIVE"] = "\u099A\u09B2\u09AE\u09BE\u09A8";
    EProjectStatus["COMPLETED"] = "\u09B8\u09AE\u09CD\u09AA\u09A8\u09CD\u09A8";
    EProjectStatus["CANCELLED"] = "\u09AC\u09BE\u09A4\u09BF\u09B2";
    EProjectStatus["PAUSED"] = "\u09AC\u09BF\u09B0\u09A4\u09BF";
    EProjectStatus["CLOSED"] = "\u09AC\u09A8\u09CD\u09A7";
})(EProjectStatus || (exports.EProjectStatus = EProjectStatus = {}));
var EMessageStatus;
(function (EMessageStatus) {
    EMessageStatus["READ"] = "\u09AA\u09DC\u09BE \u09B9\u09DF\u09C7\u099B\u09C7";
    EMessageStatus["UNREAD"] = "\u0985\u09AA\u09A0\u09BF\u09A4";
})(EMessageStatus || (exports.EMessageStatus = EMessageStatus = {}));
var EDonationStatus;
(function (EDonationStatus) {
    EDonationStatus["PENDING"] = "\u0985\u09AA\u09C7\u0995\u09CD\u09B7\u09AE\u09BE\u09A3";
    EDonationStatus["APPROVED"] = "\u0985\u09A8\u09C1\u09AE\u09CB\u09A6\u09BF\u09A4";
    EDonationStatus["REJECTED"] = "\u09AA\u09CD\u09B0\u09A4\u09CD\u09AF\u09BE\u0996\u09CD\u09AF\u09BE\u09A4";
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
    EAccountTransactionType["Income"] = "\u0986\u09DF";
    EAccountTransactionType["Expense"] = "\u09AC\u09CD\u09AF\u09BE\u09DF";
})(EAccountTransactionType || (exports.EAccountTransactionType = EAccountTransactionType = {}));
