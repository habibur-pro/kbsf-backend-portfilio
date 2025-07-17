import ApiError from '../../helpers/ApiErrot'
import Member from '../Member/member.model'
import Auth from './auth.model'
import httpStatus from 'http-status'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../../config'

const verifyAdminLogin = async (payload: {
    phone: string
    password: string
}) => {
    console.log('payload', payload)
    const member = await Member.findOne({ phone: payload.phone, role: 'admin' })
    if (!member) throw new ApiError(httpStatus.BAD_REQUEST, 'user not found')
    const auth = await Auth.findOne({ phone: payload.phone, role: 'admin' })
    if (!auth) throw new ApiError(httpStatus.BAD_REQUEST, 'user not found')
    console.log('auth', auth)
    console.log('member', member)
    const compare = bcrypt.compare(payload.password, auth.password)
    if (!compare) throw new ApiError(httpStatus.BAD_REQUEST, 'wrong password')

    return { role: member.role }
}
const adminLogin = async (payload: { phone: string; password: string }) => {
    const member = await Member.findOne({ phone: payload.phone, role: 'admin' })
    if (!member) throw new ApiError(httpStatus.BAD_REQUEST, 'user not found')
    const auth = await Auth.findOne({ phone: payload.phone, role: 'admin' })
    if (!auth) throw new ApiError(httpStatus.BAD_REQUEST, 'user not found')
    const compare = bcrypt.compare(payload.password, auth.password)
    if (!compare) throw new ApiError(httpStatus.BAD_REQUEST, 'wrong password')
    const token = jwt.sign(
        { id: member.id, role: member.role },
        config.jwt_secret as string
    )
    const responseData = {
        id: member.id,
        name: member.name,
        role: member.role,
        email: member.email,
        photo: member.photo,
        phone: member.phone,
        accessToken: token,
    }
    return responseData
}

const AuthServices = {
    adminLogin,
    verifyAdminLogin,
}
export default AuthServices
