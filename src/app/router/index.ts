import { Router } from 'express'
import MemberRoutes from '../modules/Member/member.router'
import AuthRoutes from '../modules/Auth/auth.router'
import DonationRouter from '../modules/Donation/donation.router'
import AccountsRoutes from '../modules/Accounts/account.router'
import ProjectRoutes from '../modules/Project/project.router'
import DashboardRouter from '../modules/dashboard/dashboard.router'
import GalleryRoutes from '../modules/Gallery/gallery.router'
import MessageRoutes from '../modules/Message/message.router'
import AccountsTransactionRoutes from '../modules/AccountTransaction/accountTransaction.router'

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
    {
        path: '/gallery',
        route: GalleryRoutes,
    },
    {
        path: '/messages',
        route: MessageRoutes,
    },
    {
        path: '/accounts-transactions',
        route: AccountsTransactionRoutes,
    },
]

routes.map((route) => router.use(route.path, route.route))

export default router
