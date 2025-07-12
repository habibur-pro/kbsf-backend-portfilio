import { Router } from 'express'
import MemberRoutes from '../modules/Member/member.router'
import AuthRoutes from '../modules/Auth/auth.router'
import DonationRouter from '../modules/Donation/donation.router'

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
    {
        path: '/donations',
        route: DonationRouter,
    },
]

routes.map((route) => router.use(route.path, route.route))

export default router
