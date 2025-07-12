import Gallery from './gallery.model'

const upload = async (payload: Array<{ url: string }> | undefined) => {
    await Gallery.insertMany(payload)
    return { message: 'photo uploaded' }
}
const getImages = async () => {
    const images = await Gallery.find()
    return images
}
const GalleryServices = { upload, getImages }
export default GalleryServices
