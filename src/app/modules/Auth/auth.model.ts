import { Model, model, Schema } from 'mongoose'
import { IAuth } from './auth.interface'
import idGenerator from '../../helpers/idGenerator'
import { Document } from 'mongoose'

const AuthSchema = new Schema<IAuth>(
    {
        id: {
            type: String,
            required: [true, 'id is required'],
            unique: true,
        },
        userId: {
            type: String,
            required: [true, 'userId is required'],
        },
        phone: {
            type: String,
            required: [true, 'Phone number is required'],
            unique: true,
        },
        email: {
            type: String,
            default: null,
        },
        role: {
            type: String,
            default: 'user',
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true, // adds createdAt and updatedAt
    }
)

AuthSchema.pre<IAuth>('validate', async function (next) {
    if (!this.id) {
        this.id = await idGenerator(this.constructor as Model<Document & IAuth>)
    }
    next()
})

const Auth = model<IAuth>('Auth', AuthSchema)

export default Auth
