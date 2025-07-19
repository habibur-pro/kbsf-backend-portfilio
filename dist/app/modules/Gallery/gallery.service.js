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
const cloudinaryConfig_1 = __importDefault(require("../../config/cloudinaryConfig"));
const ApiErrot_1 = __importDefault(require("../../helpers/ApiErrot"));
const gallery_model_1 = __importDefault(require("./gallery.model"));
const http_status_1 = __importDefault(require("http-status"));
const upload = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield gallery_model_1.default.insertMany(payload);
    return { message: 'photo uploaded' };
});
const getImages = () => __awaiter(void 0, void 0, void 0, function* () {
    const images = yield gallery_model_1.default.find();
    return images;
});
const deleteImage = (galleryId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // gallery id is _id;
        const image = yield gallery_model_1.default.findById(galleryId);
        if (!image) {
            throw new ApiErrot_1.default(http_status_1.default.BAD_REQUEST, 'image not found');
        }
        const url = new URL(image.url);
        const parts = url.pathname.split('/');
        const filenameWithExt = parts.slice(3).join('/');
        const publicId = filenameWithExt.replace(/\.[^/.]+$/, '');
        yield cloudinaryConfig_1.default.uploader.destroy(publicId);
        yield gallery_model_1.default.findByIdAndDelete(galleryId);
        return { message: 'deleted' };
    }
    catch (error) {
        throw new ApiErrot_1.default(http_status_1.default.BAD_REQUEST, (error === null || error === void 0 ? void 0 : error.message) || 'something went wrong');
    }
});
const GalleryServices = { upload, getImages, deleteImage };
exports.default = GalleryServices;
