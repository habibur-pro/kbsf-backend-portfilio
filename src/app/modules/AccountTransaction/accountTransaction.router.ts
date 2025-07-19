import { Router } from 'express'
import AccountTransactionController from './accountTransaction.controller'

const router = Router()

router.get('/', AccountTransactionController.getTransactions)
router.post('/', AccountTransactionController.addTransaction)
router.patch(
    '/:transactionId/update',
    AccountTransactionController.updateTransaction
)

const AccountsTransactionRoutes = router
export default AccountsTransactionRoutes
