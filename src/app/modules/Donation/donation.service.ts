import mongoose from 'mongoose'
import { Donation } from './donation.model'
import Project from '../Project/project.model'
import ApiError from '../../helpers/ApiErrot'
import httpsStatus from 'http-status'
import Accounts from '../Accounts/accounts.model'
import { IDonation } from './donation.interface'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import SSLCommerzPayment from 'sslcommerz-lts'
import config from '../../config'
import { Request, Response } from 'express'
import { EDonationStatus, EPaymentMethod } from '../../enum'
import { IProject } from '../Project/project.interface'
const initiateDonation = async (req: Request) => {
    const payload = req.body
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
        console.log('payload', payload)
        const store_id = config.ssl_store_id as string
        const store_passwd = config.ssl_store_pass as string
        const is_live = false
        const baseUrl = `${req.protocol}://${req.get('host')}/api/v1/donations`
        const tranId = `TXN-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`
        let searchProject: IProject | null = null

        if (payload.projectId) {
            searchProject = await Project.findOne({
                id: payload.projectId,
            })
                .session(session)
                .lean<IProject>()
        }

        const data = {
            total_amount: payload.amount,
            currency: 'BDT',
            tran_id: tranId, // use unique tran_id for each api call
            success_url: `${baseUrl}/success/${tranId}`,
            fail_url: `${baseUrl}/fail/${tranId}`,
            cancel_url: `${baseUrl}/fail/${tranId}`,
            ipn_url: `${baseUrl}/ipn`,
            shipping_method: 'Courier',
            product_name: searchProject?.projectName || 'Donation.',
            product_category: 'Donation',
            product_profile: 'general',
            cus_name: payload.name,
            cus_email: payload.email || '',
            cus_add1: 'f',
            cus_add2: 'f',
            cus_city: 'f',
            cus_state: 'f',
            cus_postcode: 'f',
            cus_country: 'Bangladesh',
            cus_phone: payload.phone,
            cus_fax: 'f',
            ship_name: 'f',
            ship_add1: 'f',
            ship_add2: 'f',
            ship_city: 'f',
            ship_state: 'f',
            ship_postcode: 1000,
            ship_country: 'Bangladesh',
        }
        // console.log({ store_id, store_passwd })
        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
        const apiResponse = await sslcz.init(data)
        const GatewayPageURL = apiResponse?.GatewayPageURL
        if (GatewayPageURL) {
            await Donation.create(
                [
                    {
                        name: payload?.name || null,
                        amount: payload.amount,
                        senderNumber: payload?.phone || null,
                        paymentMethod: EPaymentMethod.SSl,
                        projectId: searchProject?.id || null,
                        status: EDonationStatus.PENDING,
                        transactionId: tranId,
                        notes: payload?.message || null,
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        project: searchProject?._id || null,
                    },
                ],
                { session }
            )

            await session.commitTransaction() // Don't forget to commit
            return { url: GatewayPageURL }
        } else {
            throw new ApiError(httpsStatus.BAD_REQUEST, 'payment init failed')
        }
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
const successPayment = async (req: Request, res: Response) => {
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
        const tranId = req.params.tranId
        console.log({ tranId })

        const updatedDonation = await Donation.findOneAndUpdate(
            { transactionId: tranId },
            { status: EDonationStatus.APPROVED },
            { new: true, session }
        )
        if (!updatedDonation) {
            throw new ApiError(httpsStatus.BAD_REQUEST, 'payment failed')
        }

        if (updatedDonation?.projectId) {
            await Project.findOneAndUpdate(
                { id: updatedDonation.projectId },
                { $inc: { currentAmount: updatedDonation?.amount || 0 } },
                { new: true, session }
            )
        }
        await Accounts.findOneAndUpdate(
            {},
            {
                $inc: {
                    totalBalance: updatedDonation?.amount || 0,
                    totalEarning: updatedDonation?.amount || 0,
                },
            },
            { new: true, session }
        )
        const url = `${config.frontend_url}/donation/success`
        await session.commitTransaction()
        console.log({ url })
        res.redirect(url)
    } catch (error) {
        console.error('Payment success handling failed:', error)
        res.redirect(`${config.frontend_url}/donation/fail`)
    }
}
const failedPayment = async (req: Request, res: Response) => {
    try {
        const tranId = req.params.tranId
        console.log({ tranId })

        await Donation.findOneAndUpdate(
            { transactionId: tranId },
            { status: EDonationStatus.REJECTED },
            { new: true }
        )

        const url = `${config.frontend_url}/donation/fail`
        console.log({ url })
        res.redirect(url)
    } catch (error) {
        console.error('Payment success handling failed:', error)
        res.redirect(`${config.frontend_url}/donation/fail`)
    }
}

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

const DonationServices = {
    giveDonation,
    getDonations,
    getDonation,
    initiateDonation,
    successPayment,
    failedPayment,
}
export default DonationServices
