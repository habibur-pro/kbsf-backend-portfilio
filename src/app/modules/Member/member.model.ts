import { Document, Model, model, Schema } from 'mongoose'
import { EBloodGroup, EGender, EMaritalStatus } from '../../enum'
import { IMember } from './member.interface'
import idGenerator from '../../helpers/idGenerator'

const MemberSchema = new Schema<IMember>(
    {
        id: {
            type: String,
            required: [true, 'Id is required'],
            unique: true,
        },
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        phone: {
            type: String,
            required: [true, 'Phone number is required'],
            unique: true,
        },
        fatherName: {
            type: String,
            required: [true, "Father's name is required"],
        },
        profession: {
            type: String,
            required: [true, 'profession  is required'],
        },
        photo: {
            type: String,
            default: null,
        },
        gender: {
            type: String,
            enum: {
                values: Object.values(EGender),
                message: 'Gender must be one of male, female, or other',
            },
            required: [true, 'Gender is required'],
        },
        maritalStatus: {
            type: String,
            enum: {
                values: Object.values(EMaritalStatus),
                message: 'Invalid marital status',
            },
            required: [true, 'Marital status is required'],
        },
        village: {
            type: String,
            required: [true, 'Village is required'],
        },
        district: {
            type: String,
            required: [true, 'District is required'],
        },
        thana: {
            type: String,
            required: [true, 'Thana is required'],
        },
        postOffice: {
            type: String,
            required: [true, 'Post office is required'],
        },
        fullAddress: {
            type: String,
            required: [true, 'Full address is required'],
        },
        email: {
            type: String,
            default: null,
        },
        role: {
            type: String,
            default: 'user',
        },
        bloodGroup: {
            type: String,
            enum: {
                values: Object.values(EBloodGroup),
                message: 'Invalid blood group',
            },
            required: [true, 'Blood group is required'],
        },
        lastBloodDonationDate: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
)
MemberSchema.pre<IMember>('validate', async function (next) {
    if (!this.id) {
        this.id = await idGenerator(
            this.constructor as Model<Document & IMember>
        )
    }
    next()
})
const Member = model<IMember>('member', MemberSchema)
export default Member
