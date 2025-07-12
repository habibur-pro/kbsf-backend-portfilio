import { Router } from 'express'
import ProjectController from './project.controller'

const router = Router()
router.post('/', ProjectController.addProject)
router.get('/', ProjectController.getProjects)
router.get('/:projectId', ProjectController.getProject)
const ProjectRoutes = router
export default ProjectRoutes
