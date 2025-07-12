import httpStatus from 'http-status'
import sendResponse from '../../helpers/sendResponse'
import catchAsync from '../../helpers/asyncHandler'
import DashboardServices from './dashboard.service'

const getDashboardSummary = catchAsync(async (req, res) => {
    const result = await DashboardServices.getDashboardSummary()
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'dashboard summary fetched successfully',
        data: result,
    })
})

const DashboardController = { getDashboardSummary }
export default DashboardController
