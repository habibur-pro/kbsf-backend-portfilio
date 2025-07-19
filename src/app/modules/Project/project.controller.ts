import httpStatus from 'http-status'
import sendResponse from '../../helpers/sendResponse'
import catchAsync from '../../helpers/asyncHandler'
import ProjectServices from './project.service'

const addProject = catchAsync(async (req, res) => {
    const result = await ProjectServices.addProject(req.body, req)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'project added successfully',
        data: result,
    })
})
const getProjects = catchAsync(async (req, res) => {
    const result = await ProjectServices.getProjects()
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'projects fetched successfully',
        data: result,
    })
})
const getProject = catchAsync(async (req, res) => {
    const projectId = req.params.projectId
    const result = await ProjectServices.getProject(projectId)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'project fetched successfully',
        data: result,
    })
})
const updateProject = catchAsync(async (req, res) => {
    const projectId = req.params.projectId
    const result = await ProjectServices.updateProject(projectId, req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'project updated successfully',
        data: result,
    })
})
const deleteProject = catchAsync(async (req, res) => {
    const projectId = req.params.projectId
    const result = await ProjectServices.deleteProject(projectId)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'project deleted successfully',
        data: result,
    })
})

const ProjectController = {
    addProject,
    getProjects,
    getProject,
    updateProject,
    deleteProject,
}
export default ProjectController
