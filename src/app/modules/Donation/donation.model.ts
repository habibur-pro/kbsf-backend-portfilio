import { model, Schema, Model, Document } from 'mongoose'
import { IDonation } from './donation.interface'
import idGenerator from '../../helpers/idGenerator'

const DonationSchema = new Schema<IDonation>(
    {
        id: {
            type: String,
            required: [true, 'Donation ID is required'],
            unique: true,
        },
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        userId: {
            type: String,
            default: null,
        },
        amount: {
            type: Number,
            required: [true, 'Amount is required'],
        },
        transactionId: {
            type: String,
            default: null,
        },
        paymentMethod: {
            type: String,
            required: [true, 'Payment method is required'],
        },
        senderNumber: {
            type: String,
            default: null,
        },
        status: {
            type: String,
            enum: {
                values: ['pending', 'approved', 'rejected'],
                message: 'Status must be either pending, approved, or rejected',
            },
            default: 'approved',
        },
    },
    {
        timestamps: true,
    }
)
DonationSchema.pre<IDonation>('validate', async function (next) {
    if (!this.id) {
        this.id = await idGenerator(
            this.constructor as Model<Document & IDonation>
        )
    }
    next()
})
export const Donation = model<IDonation>('donation', DonationSchema)
