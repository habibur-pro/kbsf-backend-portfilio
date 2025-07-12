import { model, Schema } from 'mongoose'
import { IGallery } from './gallery.interface'

const GallerySchema = new Schema<IGallery>(
    {
        url: { type: String, required: [true, 'url is required'] },
    },
    { timestamps: true }
)

const Gallery = model('gallery', GallerySchema)
export default Gallery
