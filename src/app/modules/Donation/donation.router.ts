import { Router } from 'express'
import DonationController from './donation.controller'

const router = Router()
router.post('/', DonationController.giveDonation)
router.get('/', DonationController.getDonations)
router.get('/:donationId', DonationController.getDonation)
router.post('/initiate', DonationController.initiateDonation)
router.post('/success/:tranId', DonationController.successPayment)
router.post('/fail/:tranId', DonationController.failPayment)
const DonationRouter = router
export default DonationRouter
