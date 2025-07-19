import cloudinary from '../../config/cloudinaryConfig'
import ApiError from '../../helpers/ApiErrot'
import Gallery from './gallery.model'
import httpStatus from 'http-status'
const upload = async (payload: Array<{ url: string }> | undefined) => {
    await Gallery.insertMany(payload)
    return { message: 'photo uploaded' }
}
const getImages = async () => {
    const images = await Gallery.find()
    return images
}
const deleteImage = async (galleryId: string) => {
    try {
        // gallery id is _id;
        const image = await Gallery.findById(galleryId)
        if (!image) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'image not found')
        }
        const url = new URL(image.url)
        const parts = url.pathname.split('/')
        const filenameWithExt = parts.slice(3).join('/')
        const publicId = filenameWithExt.replace(/\.[^/.]+$/, '')
        await cloudinary.uploader.destroy(publicId)
        await Gallery.findByIdAndDelete(galleryId)
        return { message: 'deleted' }
    } catch (error: any) {
        throw new ApiError(
            httpStatus.BAD_REQUEST,
            error?.message || 'something went wrong'
        )
    }
}
const GalleryServices = { upload, getImages, deleteImage }
export default GalleryServices
