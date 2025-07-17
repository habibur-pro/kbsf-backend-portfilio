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
exports.cloudinaryUploader = void 0;
/* eslint-disable @typescript-eslint/no-namespace */
const multer_1 = __importDefault(require("multer"));
const cloudinaryConfig_1 = __importDefault(require("../config/cloudinaryConfig"));
// ✅ Multer memory storage
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
// ✅ Upload a buffer to Cloudinary
const uploadToCloudinary = (fileBuffer_1, mimetype_1, ...args_1) => __awaiter(void 0, [fileBuffer_1, mimetype_1, ...args_1], void 0, function* (fileBuffer, mimetype, folder = 'uploads') {
    const base64 = `data:${mimetype};base64,${fileBuffer.toString('base64')}`;
    const result = yield cloudinaryConfig_1.default.uploader.upload(base64, {
        folder,
        resource_type: 'auto',
    });
    return result.secure_url;
});
const cloudinaryUploader = (type = 'single', fieldName = 'file', maxCount = 10, folder = 'KBSF/gallery') => {
    const multerHandler = type === 'multiple'
        ? upload.array(fieldName, maxCount)
        : upload.single(fieldName);
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        multerHandler(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
            if (err)
                return res.status(400).json({ error: err.message });
            try {
                const files = type === 'multiple'
                    ? req.files
                    : [req.file];
                if (!files || files.length === 0) {
                    req.uploadedFiles = [];
                    return next();
                }
                const uploadedFiles = yield Promise.all(files.map((file) => __awaiter(void 0, void 0, void 0, function* () {
                    const url = yield uploadToCloudinary(file.buffer, file.mimetype, folder);
                    return { url }; // ✅ Only return url
                })));
                req.uploadedFiles = uploadedFiles; // ✅ Set to [{ url: string }]
                next();
            }
            catch (uploadErr) {
                console.error('Cloudinary upload failed:', uploadErr);
                res.status(500).json({ error: 'Cloudinary upload failed' });
            }
        }));
    });
};
exports.cloudinaryUploader = cloudinaryUploader;
