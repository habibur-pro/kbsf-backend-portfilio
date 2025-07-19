import httpStatus from 'http-status'
import sendResponse from '../../helpers/sendResponse'
import catchAsync from '../../helpers/asyncHandler'
import GalleryServices from './gallery.service'

const upload = catchAsync(async (req, res) => {
    const files = req.uploadedFiles
    const result = await GalleryServices.upload(files)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'project added successfully',
        data: result,
    })
})
const getImages = catchAsync(async (req, res) => {
    const result = await GalleryServices.getImages()
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'images fetched successfully',
        data: result,
    })
})
const deleteImage = catchAsync(async (req, res) => {
    const galleryId = req.params.galleryId
    const result = await GalleryServices.deleteImage(galleryId)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'image deleted successfully',
        data: result,
    })
})

const GalleryController = { upload, getImages, deleteImage }
export default GalleryController
