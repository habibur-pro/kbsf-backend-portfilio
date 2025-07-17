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
const gallery_model_1 = __importDefault(require("./gallery.model"));
const upload = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield gallery_model_1.default.insertMany(payload);
    return { message: 'photo uploaded' };
});
const getImages = () => __awaiter(void 0, void 0, void 0, function* () {
    const images = yield gallery_model_1.default.find();
    return images;
});
const GalleryServices = { upload, getImages };
exports.default = GalleryServices;
