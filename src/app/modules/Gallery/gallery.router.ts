import { Router } from 'express'
import GalleryController from './gallery.controller'
import { cloudinaryUploader } from '../../middleware/cloudinaryUploader'

const router = Router()
router.get('/', GalleryController.getImages)
router.delete('/:galleryId/delete', GalleryController.deleteImage)
router.post(
    '/upload',
    cloudinaryUploader('multiple', 'images', 50),
    GalleryController.upload
)
const GalleryRoutes = router
export default GalleryRoutes
