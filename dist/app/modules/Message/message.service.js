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
const message_model_1 = __importDefault(require("./message.model"));
const send = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield message_model_1.default.create(payload);
    return { message: 'message sent' };
});
const getMessages = () => __awaiter(void 0, void 0, void 0, function* () {
    const messages = yield message_model_1.default.find();
    messages.sort((a, b) => {
        if (a.status === b.status) {
            return b.createdAt.getTime() - a.createdAt.getTime();
        }
        return a.status === enum_1.EMessageStatus.UNREAD ? -1 : 1;
    });
    return messages;
});
const updateStatus = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id);
    yield message_model_1.default.findOneAndUpdate({ id }, payload, { new: true });
    return { message: 'status updated' };
});
const deleteMessage = (messageId) => __awaiter(void 0, void 0, void 0, function* () {
    yield message_model_1.default.findOneAndDelete({ id: messageId });
    return { message: 'deleted' };
});
const MessageServices = { send, getMessages, updateStatus, deleteMessage };
exports.default = MessageServices;
