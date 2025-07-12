import { IProject } from './project.interface'
import Project from './project.model'

const addProject = async (payload: Partial<IProject>) => {
    // Get the last created project sorted by projectNumber
    const lastProject = await Project.findOne()
        .sort({ projectNumber: -1 })
        .select('projectNumber')

    const nextNumber = lastProject ? lastProject.projectNumber + 1 : 1
    const formattedId = `PRO${String(nextNumber).padStart(5, '0')}`
    console.log({ formattedId })
    await Project.create({ ...payload, projectNumber: formattedId })
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

const ProjectServices = { addProject, getProjects, getProject }
export default ProjectServices
