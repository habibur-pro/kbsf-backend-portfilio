import { Router } from 'express'
import DashboardController from './dashboard.controller'

const router = Router()
router.get('/', DashboardController.getDashboardSummary)
const DashboardRouter = router
export default DashboardRouter
