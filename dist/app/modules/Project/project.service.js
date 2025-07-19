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
const project_model_1 = __importDefault(require("./project.model"));
const ApiErrot_1 = __importDefault(require("../../helpers/ApiErrot"));
const http_status_1 = __importDefault(require("http-status"));
const addProject = (payload, req) => __awaiter(void 0, void 0, void 0, function* () {
    const files = req.uploadedFiles;
    delete payload.image;
    if (!(files === null || files === void 0 ? void 0 : files.length)) {
        throw new ApiErrot_1.default(http_status_1.default.BAD_REQUEST, 'failed project creation');
    }
    // Get the last created project sorted by projectNumber
    const lastProject = yield project_model_1.default.findOne()
        .sort({ projectNumber: -1 })
        .select('projectNumber');
    const nextNumber = lastProject ? lastProject.projectNumber + 1 : 1;
    const formattedId = `PRO${String(nextNumber).padStart(5, '0')}`;
    console.log({ formattedId });
    yield project_model_1.default.create(Object.assign(Object.assign({}, payload), { projectNumber: formattedId, image: files[0].url }));
    return { message: 'project added' };
});
const getProjects = () => __awaiter(void 0, void 0, void 0, function* () {
    const projects = yield project_model_1.default.find();
    return projects;
});
const getProject = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const projects = yield project_model_1.default.findOne({ id });
    return projects;
});
const updateProject = (projectId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield project_model_1.default.findOne({ id: projectId });
    if (!project) {
        throw new ApiErrot_1.default(http_status_1.default.BAD_REQUEST, 'project not found');
    }
    yield project_model_1.default.findOneAndUpdate({ id: projectId }, payload, { new: true });
    return { message: 'updated' };
});
const deleteProject = (projectId) => __awaiter(void 0, void 0, void 0, function* () {
    yield project_model_1.default.findOneAndDelete({ id: projectId });
    return { message: 'deleted' };
});
const ProjectServices = {
    addProject,
    getProjects,
    getProject,
    updateProject,
    deleteProject,
};
exports.default = ProjectServices;
