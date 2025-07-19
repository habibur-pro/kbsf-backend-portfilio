"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gallery_controller_1 = __importDefault(require("./gallery.controller"));
const cloudinaryUploader_1 = require("../../middleware/cloudinaryUploader");
const router = (0, express_1.Router)();
router.get('/', gallery_controller_1.default.getImages);
router.delete('/:galleryId/delete', gallery_controller_1.default.deleteImage);
router.post('/upload', (0, cloudinaryUploader_1.cloudinaryUploader)('multiple', 'images', 50), gallery_controller_1.default.upload);
const GalleryRoutes = router;
exports.default = GalleryRoutes;
