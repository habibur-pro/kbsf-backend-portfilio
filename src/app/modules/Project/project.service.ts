import { Request } from 'express'
import { IProject } from './project.interface'
import Project from './project.model'
import ApiError from '../../helpers/ApiErrot'
import httStatus from 'http-status'
const addProject = async (payload: Partial<IProject>, req: Request) => {
    const files = req.uploadedFiles
    delete payload.image
    if (!files?.length) {
        throw new ApiError(httStatus.BAD_REQUEST, 'failed project creation')
    }
    // Get the last created project sorted by projectNumber
    const lastProject = await Project.findOne()
        .sort({ projectNumber: -1 })
        .select('projectNumber')

    const nextNumber = lastProject ? lastProject.projectNumber + 1 : 1
    const formattedId = `PRO${String(nextNumber).padStart(5, '0')}`
    console.log({ formattedId })
    await Project.create({
        ...payload,
        projectNumber: formattedId,
        image: files[0].url,
    })
    return { message: 'project added' }
}

const getProjects = async () => {
    const projects = await Project.find()
    return projects
}
const getProject = async (id: string) => {
    const projects = await Project.findOne({ id })
    return projects
}

const updateProject = async (projectId: string, payload: Partial<IProject>) => {
    const project = await Project.findOne({ id: projectId })
    if (!project) {
        throw new ApiError(httStatus.BAD_REQUEST, 'project not found')
    }
    await Project.findOneAndUpdate({ id: projectId }, payload, { new: true })
    return { message: 'updated' }
}
const deleteProject = async (projectId: string) => {
    await Project.findOneAndDelete({ id: projectId })
    return { message: 'deleted' }
}

const ProjectServices = {
    addProject,
    getProjects,
    getProject,
    updateProject,
    deleteProject,
}
export default ProjectServices
