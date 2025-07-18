import mongoose from 'mongoose'
import { Donation } from './donation.model'
import Project from '../Project/project.model'
import ApiError from '../../helpers/ApiErrot'
import httpsStatus from 'http-status'
import Accounts from '../Accounts/accounts.model'
import { IDonation } from './donation.interface'

const giveDonation = async (payload: Partial<IDonation>) => {
    const session = await mongoose.startSession()
    console.log(payload)
    session.startTransaction()
    try {
        const donationPayload = { ...payload }
        if (payload.projectId) {
            const project = await Project.findOne({
                id: payload.projectId,
            }).session(session)
            if (!project)
                throw new ApiError(httpsStatus.BAD_REQUEST, 'project not found')
            await Project.findOneAndUpdate(
                { id: project.id },
                { $inc: { currentAmount: payload.amount } },
                { new: true, session }
            )
            donationPayload.project = project._id
            donationPayload.projectName = project.projectName
        }

        await Donation.create([donationPayload], { session })
        const accounts = await Accounts.findOne().session(session)
        if (!accounts)
            throw new ApiError(httpsStatus.BAD_REQUEST, 'accounts not found')
        await Accounts.findByIdAndUpdate(
            accounts._id,
            {
                $inc: {
                    totalBalance: payload.amount,
                    totalEarning: payload.amount,
                },
            },
            { new: true, session }
        )
        await session.commitTransaction()
        return { message: 'thanks for donation' }
    } catch (error: any) {
        await session.abortTransaction()
        throw new ApiError(
            httpsStatus.BAD_REQUEST,
            error?.message || 'something went wrong'
        )
    } finally {
        await session.endSession()
    }
}

const getDonations = async () => {
    const donations = await Donation.find()
        .populate('project')
        .sort({ createdAt: -1 })
    return donations
}
const getDonation = async (id: string) => {
    const donation = await Donation.findOne({ id }).populate('project')
    return donation
}

const DonationServices = { giveDonation, getDonations, getDonation }
export default DonationServices
