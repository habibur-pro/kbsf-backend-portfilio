import { Document, Model, Schema, model } from 'mongoose'
import { IMessage } from './message.interface'
import idGenerator from '../../helpers/idGenerator'
import { EMessageStatus } from '../../enum'

const MessageSchema = new Schema<IMessage>(
    {
        id: {
            type: String,
            required: [true, 'Message ID is required'],
            unique: true,
        },
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        phone: {
            type: String,
            required: [true, 'Phone number is required'],
        },
        message: {
            type: String,
            required: [true, 'Message content is required'],
        },
        status: {
            type: String,
            default: EMessageStatus.UNREAD,
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt
    }
)
MessageSchema.pre<IMessage>('validate', async function (next) {
    if (!this.id) {
        this.id = await idGenerator(
            this.constructor as Model<Document & IMessage>
        )
    }
    next()
})
const Message = model<IMessage>('message', MessageSchema)
export default Message
