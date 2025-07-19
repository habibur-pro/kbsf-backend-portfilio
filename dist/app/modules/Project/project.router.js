"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const project_controller_1 = __importDefault(require("./project.controller"));
const cloudinaryUploader_1 = require("../../middleware/cloudinaryUploader");
const router = (0, express_1.Router)();
router.post('/', (0, cloudinaryUploader_1.cloudinaryUploader)('single', 'image'), project_controller_1.default.addProject);
router.get('/', project_controller_1.default.getProjects);
router.get('/:projectId', project_controller_1.default.getProject);
router.patch('/:projectId/update', project_controller_1.default.updateProject);
router.delete('/:projectId/delete', project_controller_1.default.deleteProject);
const ProjectRoutes = router;
exports.default = ProjectRoutes;
