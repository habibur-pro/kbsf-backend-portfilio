/* eslint-disable @typescript-eslint/no-namespace */
import multer from 'multer'
import { Request, Response, NextFunction } from 'express'
import cloudinary from '../config/cloudinaryConfig'

// ✅ Extend Express Request to include uploadedFiles as [{ url: string }]
declare global {
    namespace Express {
        interface Request {
            uploadedFiles?: { url: string }[]
        }
    }
}

// ✅ Multer memory storage
const storage = multer.memoryStorage()
const upload = multer({ storage })

// ✅ Upload a buffer to Cloudinary
const uploadToCloudinary = async (
    fileBuffer: Buffer,
    mimetype: string,
    folder = 'uploads'
): Promise<string> => {
    const base64 = `data:${mimetype};base64,${fileBuffer.toString('base64')}`
    const result = await cloudinary.uploader.upload(base64, {
        folder,
        resource_type: 'auto',
    })
    return result.secure_url
}

// ✅ Middleware factory
type UploadType = 'single' | 'multiple'

export const cloudinaryUploader = (
    type: UploadType = 'single',
    fieldName: string = 'file',
    maxCount: number = 10,
    folder: string = 'KBSF/gallery'
) => {
    const multerHandler =
        type === 'multiple'
            ? upload.array(fieldName, maxCount)
            : upload.single(fieldName)

    return async (req: Request, res: Response, next: NextFunction) => {
        multerHandler(req, res, async (err: any) => {
            if (err) return res.status(400).json({ error: err.message })
            try {
                const files =
                    type === 'multiple'
                        ? (req.files as Express.Multer.File[])
                        : [req.file as Express.Multer.File]

                if (!files || files.length === 0) {
                    req.uploadedFiles = []
                    return next()
                }

                const uploadedFiles = await Promise.all(
                    files.map(async (file) => {
                        const url = await uploadToCloudinary(
                            file.buffer,
                            file.mimetype,
                            folder
                        )
                        return { url } // ✅ Only return url
                    })
                )

                req.uploadedFiles = uploadedFiles // ✅ Set to [{ url: string }]
                next()
            } catch (uploadErr) {
                console.error('Cloudinary upload failed:', uploadErr)
                res.status(500).json({ error: 'Cloudinary upload failed' })
            }
        })
    }
}
