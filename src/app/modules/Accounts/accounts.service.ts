import ApiError from '../../helpers/ApiErrot'
import Member from '../Member/member.model'
import Accounts from './accounts.model'
import httpsStatus from 'http-status'

const createAccounts = async (payload: { userId: string }) => {
    const member = await Member.findOne({ id: payload.userId, role: 'admin' })
    if (!member) {
        throw new ApiError(httpsStatus.UNAUTHORIZED, 'unauthorize access')
    }
    const existAccounts = await Accounts.findOne()
    if (!existAccounts) {
        await Accounts.deleteMany()
    }
    await Accounts.create({ adminId: member.id })
    return { message: 'accounts created' }
}

const AccountsServices = { createAccounts }
export default AccountsServices
