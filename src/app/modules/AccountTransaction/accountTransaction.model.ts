import { Document, Model, model, Schema } from 'mongoose'
import { IAccountTransition } from './accountTransaction.interface'
import { EAccountTransactionType } from '../../enum'
import idGenerator from '../../helpers/idGenerator'

const AccountTransactionSchema = new Schema<IAccountTransition>(
    {
        id: {
            type: String,
            required: [true, 'is is required'],
            unique: true,
        },
        category: {
            type: String,
            required: [true, 'Category is required'],
        },
        type: {
            type: String,
            enum: {
                values: Object.values(EAccountTransactionType),
                message: "Type must be either 'income' or 'expense'",
            },
            required: [true, 'Type is required'],
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
        },
        amount: {
            type: Number,
            required: [true, 'Amount is required'],
        },
        adminId: {
            type: String,
            required: [true, 'Admin ID is required'],
        },
        reference: {
            type: String,
            required: [true, 'Reference is required'],
        },
    },
    {
        timestamps: true,
    }
)
AccountTransactionSchema.pre<IAccountTransition>(
    'validate',
    async function (next) {
        if (!this.id) {
            this.id = await idGenerator(
                this.constructor as Model<Document & IAccountTransition>
            )
        }
        next()
    }
)
const AccountTransaction = model<IAccountTransition>(
    'accountTransaction',
    AccountTransactionSchema
)
export default AccountTransaction
