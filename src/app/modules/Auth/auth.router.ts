import { Router } from 'express'
import AuthController from './auth.controller'

const router = Router()
router.post('/admin/verify-login', AuthController.verifyAdminLogin)
router.get('/admin/login', AuthController.adminLogin)
const AuthRoutes = router
export default AuthRoutes
