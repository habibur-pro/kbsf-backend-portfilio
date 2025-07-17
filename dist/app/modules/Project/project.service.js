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
const addProject = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Get the last created project sorted by projectNumber
    const lastProject = yield project_model_1.default.findOne()
        .sort({ projectNumber: -1 })
        .select('projectNumber');
    const nextNumber = lastProject ? lastProject.projectNumber + 1 : 1;
    const formattedId = `PRO${String(nextNumber).padStart(5, '0')}`;
    console.log({ formattedId });
    yield project_model_1.default.create(Object.assign(Object.assign({}, payload), { projectNumber: formattedId }));
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
const ProjectServices = { addProject, getProjects, getProject };
exports.default = ProjectServices;
