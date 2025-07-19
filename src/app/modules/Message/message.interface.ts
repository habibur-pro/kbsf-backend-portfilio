import { EMessageStatus } from '../../enum'

export interface IMessage {
    id: string
    name: string
    phone: string
    subject: string
    message: string
    status: EMessageStatus
    createdAt: Date
    updatedAt: Date
}
