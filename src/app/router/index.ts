import { Router } from 'express'
import MemberRoutes from '../modules/Member/member.router'

const router = Router()
const routes = [
    {
        path: '/members',
        route: MemberRoutes,
    },
]

routes.map((route) => router.use(route.path, route.route))

export default router
