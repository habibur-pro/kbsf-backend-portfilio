import { Types } from 'mongoose'

export interface IDonation {
    id: string
    name: string
    userId: string
    amount: number
    transactionId: string
    paymentMethod: string
    senderNumber: string
    projectId: string
    project: Types.ObjectId
    status: string
    createdAt: Date
    updatedAt: Date
}
