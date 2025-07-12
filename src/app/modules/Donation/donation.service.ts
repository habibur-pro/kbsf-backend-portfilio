import { IDonationPayload } from './donation.interface'
import { Donation } from './donation.model'

const giveDonation = async (payload: IDonationPayload) => {
    if (payload.prodjectId) {
        // const project = await
    }
    await Donation.create(payload)
    return { message: 'thanks for donation' }
}

const getDonations = async () => {
    const donations = await Donation.find()
    return donations
}
const getDonation = async (id: string) => {
    const donation = await Donation.findOne({ id })
    return donation
}

const DonationServices = { giveDonation, getDonations, getDonation }
export default DonationServices
