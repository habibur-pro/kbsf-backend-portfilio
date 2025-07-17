"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const project_controller_1 = __importDefault(require("./project.controller"));
const router = (0, express_1.Router)();
router.post('/', project_controller_1.default.addProject);
router.get('/', project_controller_1.default.getProjects);
router.get('/:projectId', project_controller_1.default.getProject);
const ProjectRoutes = router;
exports.default = ProjectRoutes;
