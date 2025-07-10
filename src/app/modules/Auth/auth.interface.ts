export interface IAuth {
    id: string
    userId: string
    phone: string
    email: string
    role: string
    password: string
    createdAt: Date
    updatedAt: Date
    isVerified: boolean
}
