import { Document, Schema, model } from 'mongoose'
import idGenerator from '../../helpers/idGenerator'
import { IAccounts } from './accounts.interface'
import { Model } from 'mongoose'
const accountSchema = new Schema<IAccounts>(
    {
        id: {
            type: String,
            required: [true, ' ID is required'],
            unique: true,
        },
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
accountSchema.pre<IAccounts>('validate', async function (next) {
    if (!this.id) {
        this.id = await idGenerator(
            this.constructor as Model<Document & IAccounts>
        )
    }
    next()
})
const Accounts = model('accounts', accountSchema)
export default Accounts
