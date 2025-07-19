import httpStatus from 'http-status'
import sendResponse from '../../helpers/sendResponse'
import catchAsync from '../../helpers/asyncHandler'
import MessageServices from './message.service'

const send = catchAsync(async (req, res) => {
    const result = await MessageServices.send(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'message sent successfully',
        data: result,
    })
})
const getMessages = catchAsync(async (req, res) => {
    const result = await MessageServices.getMessages()
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'messages fetched successfully',
        data: result,
    })
})
const updateStatus = catchAsync(async (req, res) => {
    const messageId = req.params.messageId
    const result = await MessageServices.updateStatus(messageId, req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'message updated successfully',
        data: result,
    })
})
const deleteMessage = catchAsync(async (req, res) => {
    const messageId = req.params.messageId
    const result = await MessageServices.deleteMessage(messageId)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'messages deleted successfully',
        data: result,
    })
})

const MessageController = { send, getMessages, updateStatus, deleteMessage }
export default MessageController
