import httpStatus from 'http-status'
import sendResponse from '../../helpers/sendResponse'
import catchAsync from '../../helpers/asyncHandler'
import AccountsServices from './accounts.service'

const createAccounts = catchAsync(async (req, res) => {
    const result = await AccountsServices.createAccounts(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'accounts created successfully',
        data: result,
    })
})
const AccountsController = {
    createAccounts,
}
export default AccountsController
