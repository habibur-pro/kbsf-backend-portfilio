import { EBloodGroup, EGender, EMaritalStatus } from '../../enum'

export interface IMember {
    id: string
    name: string
    phone: string
    fatherName: string
    profession: string
    photo: string
    gender: EGender
    maritalStatus: EMaritalStatus
    village: string
    district: string
    thana: string
    postOffice: string
    fullAddress: string
    email: string
    role: string
    bloodGroup: EBloodGroup
    lastBloodDonationDate: Date
    createdAt: Date
    updatedAt: Date
}
