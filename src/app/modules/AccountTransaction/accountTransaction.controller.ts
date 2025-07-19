import httpStatus from 'http-status'
import sendResponse from '../../helpers/sendResponse'
import catchAsync from '../../helpers/asyncHandler'
import AccountTransactionServices from './accountTransaction.service'

const addTransaction = catchAsync(async (req, res) => {
    const result = await AccountTransactionServices.addTransaction(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'transaction added successfully',
        data: result,
    })
})
const getTransactions = catchAsync(async (req, res) => {
    const result = await AccountTransactionServices.getTransactions()
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'transactions fetched successfully',
        data: result,
    })
})
const updateTransaction = catchAsync(async (req, res) => {
    const transactionId = req.params.transactionId
    const result = await AccountTransactionServices.updateTransaction(
        transactionId,
        req.body
    )
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'transaction updated successfully',
        data: result,
    })
})

const AccountTransactionController = {
    addTransaction,
    getTransactions,
    updateTransaction,
}
export default AccountTransactionController
