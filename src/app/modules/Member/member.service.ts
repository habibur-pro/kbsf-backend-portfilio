import ApiError from '../../helpers/ApiErrot'
import { IMember } from './member.interface'
import Member from './member.model'
import httpStatus from 'http-status'
import bcrypt from 'bcrypt'
import Auth from '../Auth/auth.model'
import mongoose from 'mongoose'
const addMember = async (payload: Partial<IMember>) => {
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
        const hashedPassword = await bcrypt.hash('kbsf.com', saltRounds)
        Auth.create({
            email: newMember[0].email,
            userId: newMember[0].id,
            phone: newMember[0].phone,
            role: 'user',
            password: hashedPassword,
        })
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

const MemberServices = {
    addMember,
    getMembers,
    getMember,
    createAdmin,
}
export default MemberServices
