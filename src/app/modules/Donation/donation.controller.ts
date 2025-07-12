import httpStatus from 'http-status'
import sendResponse from '../../helpers/sendResponse'
import catchAsync from '../../helpers/asyncHandler'
import DonationServices from './donation.service'

const giveDonation = catchAsync(async (req, res) => {
    const result = await DonationServices.giveDonation(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'donation added successfully',
        data: result,
    })
})
const getDonations = catchAsync(async (req, res) => {
    const result = await DonationServices.getDonations()
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'donations fetched successfully',
        data: result,
    })
})
const getDonation = catchAsync(async (req, res) => {
    const donationId = req.params.donationId
    const result = await DonationServices.getDonation(donationId)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'donation fetched successfully',
        data: result,
    })
})

const DonationController = {
    giveDonation,
    getDonations,
    getDonation,
}
export default DonationController
