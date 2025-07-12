import { Router } from 'express'
import AccountsController from './accounts.controller'

const router = Router()
router.post('/', AccountsController.createAccounts)
const AccountsRoutes = router
export default AccountsRoutes
