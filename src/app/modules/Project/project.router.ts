import { Router } from 'express'
import ProjectController from './project.controller'
import { cloudinaryUploader } from '../../middleware/cloudinaryUploader'

const router = Router()
router.post(
    '/',
    cloudinaryUploader('single', 'image'),
    ProjectController.addProject
)
router.get('/', ProjectController.getProjects)
router.get('/:projectId', ProjectController.getProject)
router.patch('/:projectId/update', ProjectController.updateProject)
router.delete('/:projectId/delete', ProjectController.deleteProject)
const ProjectRoutes = router
export default ProjectRoutes
