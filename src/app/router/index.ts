import { Router } from 'express'
import MemberRoutes from '../modules/Member/member.router'
import AuthRoutes from '../modules/Auth/auth.router'

const router = Router()
const routes = [
    {
        path: '/members',
        route: MemberRoutes,
    },
    {
        path: '/auth',
        route: AuthRoutes,
    },
]

routes.map((route) => router.use(route.path, route.route))

export default router
