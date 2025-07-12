import catchAsync from '../../helpers/asyncHandler'
import sendResponse from '../../helpers/sendResponse'
import AuthServices from './auth.service'
import httpStatus from 'http-status'

const verifyAdminLogin = catchAsync(async (req, res) => {
    const result = await AuthServices.verifyAdminLogin(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'verify login successfully',
        data: result,
    })
})
const adminLogin = catchAsync(async (req, res) => {
    const result = await AuthServices.adminLogin(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'login successfully',
        data: result,
    })
})
const AuthController = {
    verifyAdminLogin,
    adminLogin,
}
export default AuthController
