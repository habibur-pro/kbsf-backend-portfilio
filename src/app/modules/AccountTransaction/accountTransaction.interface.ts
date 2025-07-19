import { EAccountTransactionType } from '../../enum'

export interface IAccountTransition {
    id: string
    category: string
    type: EAccountTransactionType
    description: string
    amount: number
    adminId: string
    reference: string
    createdAt: Date
    updatedAt: Date
}
