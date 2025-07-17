"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const GallerySchema = new mongoose_1.Schema({
    url: { type: String, required: [true, 'url is required'] },
}, { timestamps: true });
const Gallery = (0, mongoose_1.model)('gallery', GallerySchema);
exports.default = Gallery;
