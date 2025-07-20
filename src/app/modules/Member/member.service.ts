import ApiError from '../../helpers/ApiErrot'
import { IMember } from './member.interface'
import Member from './member.model'
import httpStatus from 'http-status'
import bcrypt from 'bcrypt'
import Auth from '../Auth/auth.model'
import mongoose from 'mongoose'
import { IAuth } from '../Auth/auth.interface'
export interface IMemberPayload extends Partial<IMember> {
    password?: string
}
const addMember = async (payload: IMemberPayload) => {
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
        const isExist = await Member.findOne({
            $or: [
                { phone: payload.phone },
                { name: payload.name, fatherName: payload.fatherName },
            ],
        }).session(session)
        if (isExist) {
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                'phone, name or email already used'
            )
        }
        const newMember = await Member.create([payload], { session: session })

        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(
            payload?.password || 'kbsf.com',
            saltRounds
        )
        console.log(payload.password, hashedPassword)
        await Auth.create(
            [
                {
                    email: newMember[0].email,
                    userId: newMember[0].id,
                    phone: newMember[0].phone,
                    role: 'user',
                    password: hashedPassword,
                },
            ],
            { session: session }
        )

        await session.commitTransaction()
        return { message: 'member added' }
    } catch (error: any) {
        await session.abortTransaction()
        throw new ApiError(
            httpStatus.BAD_REQUEST,
            error?.message || 'something went wrong'
        )
    } finally {
        await session.endSession()
    }
}
const getMembers = async () => {
    const allMembers = await Member.find()
    return allMembers
}
const getMember = async (memberId: string) => {
    const member = await Member.findOne({ id: memberId })
    return member
}

const createAdmin = async (memberId: string) => {
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
        const member = await Member.findOne({ id: memberId }).session(session)
        if (!member) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'member not found')
        }

        await Member.findOneAndUpdate(
            { id: memberId },
            { role: 'admin' },
            { new: true, session }
        )

        await Auth.findOneAndUpdate(
            {
                userId: member.id,
            },
            { role: 'admin' },
            { new: true, session }
        )

        await session.commitTransaction()
        return { message: 'admin created' }
    } catch (error: any) {
        await session.abortTransaction()
        throw new ApiError(
            httpStatus.BAD_REQUEST,
            error?.message || 'something went wrong'
        )
    } finally {
        await session.endSession()
    }
}
interface IPayloadAddUser extends Partial<IMember> {
    password?: string
}
const updateMember = async (memberId: string, payload: IPayloadAddUser) => {
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
        const member = await Member.findOne({ id: memberId }).session(session)
        if (!member) throw new Error('Member not found')

        await Member.findOneAndUpdate({ id: memberId }, payload, {
            new: true,
            session,
        })

        const authUpdateFields: Partial<IAuth> = {}

        if (payload.phone) authUpdateFields.phone = payload.phone
        if (payload.email) authUpdateFields.email = payload.email
        if (payload.role) authUpdateFields.role = payload.role
        if (payload.password) authUpdateFields.role = payload.password

        if (Object.keys(authUpdateFields).length > 0) {
            await Auth.findOneAndUpdate(
                { userId: member.id },
                authUpdateFields,
                { new: true, session }
            )
        }
        await session.commitTransaction()
        return { message: 'updated' }
    } catch (error: any) {
        await session.abortTransaction()
        throw new ApiError(
            httpStatus.BAD_REQUEST,
            error?.message || 'something went wrong'
        )
    } finally {
        await session.endSession()
    }
}

const deleteMember = async (memberId: string) => {
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
        await Member.findOneAndDelete({ id: memberId }, { session })
        await Auth.findOneAndDelete({ userId: memberId }, { session })
        await session.commitTransaction()
        return { message: 'deleted' }
    } catch (error) {
        await session.abortTransaction()
        throw error // optionally rethrow or handle error
    } finally {
        session.endSession()
    }
}

const MemberServices = {
    addMember,
    getMembers,
    getMember,
    createAdmin,
    updateMember,
    deleteMember,
}
export default MemberServices
