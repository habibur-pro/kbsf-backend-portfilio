import { Router } from 'express'
import AccountsController from './accounts.controller'

const router = Router()
router.post('/', AccountsController.createAccounts)
router.get('/', AccountsController.getAccounts)
const AccountsRoutes = router
export default AccountsRoutes
