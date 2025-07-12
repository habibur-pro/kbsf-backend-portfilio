import { Router } from 'express'
import DonationController from './donation.controller'

const router = Router()
router.post('/', DonationController.giveDonation)
router.get('/', DonationController.getDonations)
router.get('/:donationId', DonationController.getDonation)
const DonationRouter = router
export default DonationRouter
