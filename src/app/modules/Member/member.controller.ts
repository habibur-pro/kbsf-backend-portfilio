import httpStatus from 'http-status'
import sendResponse from '../../helpers/sendResponse'
import catchAsync from '../../helpers/asyncHandler'
import MemberServices from './member.service'

const addMember = catchAsync(async (req, res) => {
    const result = await MemberServices.addMember(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'member added successfully',
        data: result,
    })
})
const getMembers = catchAsync(async (req, res) => {
    const result = await MemberServices.getMembers()
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'members fetched successfully',
        data: result,
    })
})
const getMember = catchAsync(async (req, res) => {
    const memberId = req.params.id
    const result = await MemberServices.getMember(memberId)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'member fetched successfully',
        data: result,
    })
})

const createAdmin = catchAsync(async (req, res) => {
    const memberId = req.params.memberId
    const result = await MemberServices.createAdmin(memberId)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'admin successfully',
        data: result,
    })
})
const updateMember = catchAsync(async (req, res) => {
    const memberId = req.params.memberId
    const result = await MemberServices.updateMember(memberId, req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'member updated successfully',
        data: result,
    })
})
const deleteMember = catchAsync(async (req, res) => {
    const memberId = req.params.memberId
    const result = await MemberServices.deleteMember(memberId)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'member deleted successfully',
        data: result,
    })
})
const MemberController = {
    addMember,
    getMembers,
    getMember,
    createAdmin,
    updateMember,
    deleteMember,
}
export default MemberController
