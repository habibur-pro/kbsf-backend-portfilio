import { Router } from 'express'
import MemberRoutes from '../modules/Member/member.router'
import AuthRoutes from '../modules/Auth/auth.router'
import DonationRouter from '../modules/Donation/donation.router'
import AccountsRoutes from '../modules/Accounts/account.router'
import ProjectRoutes from '../modules/Project/project.router'
import DashboardRouter from '../modules/dashboard/dashboard.router'

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
    {
        path: '/accounts',
        route: AccountsRoutes,
    },
    {
        path: '/projects',
        route: ProjectRoutes,
    },
    {
        path: '/dashboard',
        route: DashboardRouter,
    },
]

routes.map((route) => router.use(route.path, route.route))

export default router
