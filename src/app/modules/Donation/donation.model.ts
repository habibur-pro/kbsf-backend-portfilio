import { model, Schema, Model, Document } from 'mongoose'
import { IDonation } from './donation.interface'
import idGenerator from '../../helpers/idGenerator'
import { EDonationStatus, EPaymentMethod } from '../../enum'

const DonationSchema = new Schema<IDonation>(
    {
        id: {
            type: String,
            required: [true, 'Donation ID is required'],
            unique: true,
        },
        name: {
            type: String,
            default: '-',
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
            enum: Object.values(EPaymentMethod),
            default: EPaymentMethod.Others,
        },
        senderNumber: {
            type: String,
            default: null,
        },
        projectId: {
            type: String,
            default: null,
        },
        project: {
            type: Schema.Types.ObjectId,
            ref: 'project',
            default: null,
        },
        projectName: {
            type: String,
            default: null,
        },
        notes: {
            type: String,
            default: null,
        },
        status: {
            type: String,
            enum: {
                values: Object.values(EDonationStatus),
                message: 'Status must be either pending, approved, or rejected',
            },
            default: EDonationStatus.APPROVED,
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
