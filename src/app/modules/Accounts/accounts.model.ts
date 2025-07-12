import { Schema, model } from 'mongoose'

const accountSchema = new Schema(
    {
        adminId: {
            type: String,
            required: [true, 'Admin ID is required'],
        },
        totalBalance: {
            type: Number,
            required: [true, 'Total balance is required'],
            default: 0,
        },
        totalCost: {
            type: Number,
            required: [true, 'Total cost is required'],
            default: 0,
        },
        totalEarning: {
            type: Number,
            required: [true, 'Total earning is required'],
            default: 0,
        },
        totalCostEntry: {
            type: Number,
            required: [true, 'Total cost entry is required'],
            default: 0,
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt automatically
    }
)

const Accounts = model('accounts', accountSchema)
export default Accounts
