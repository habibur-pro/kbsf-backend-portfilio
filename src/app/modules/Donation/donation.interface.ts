import { Types } from 'mongoose'
import { EDonationStatus, EPaymentMethod } from '../../enum'

export interface IDonation {
    id: string
    name: string
    userId: string
    amount: number
    transactionId: string
    paymentMethod: EPaymentMethod
    senderNumber: string
    projectId: string
    project: Types.ObjectId
    projectName: string
    status: EDonationStatus
    notes: string
    createdAt: Date
    updatedAt: Date
}
