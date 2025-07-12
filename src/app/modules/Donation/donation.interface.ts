export interface IDonation {
    id: string
    name: string
    userId: string
    amount: number
    transactionId: string
    paymentMethod: string
    senderNumber: string
    status: string
    createdAt: Date
    updatedAt: Date
}
