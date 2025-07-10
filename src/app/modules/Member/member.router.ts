import { Router } from 'express'
import MemberController from './member.controller'

const router = Router()
router.post('/add', MemberController.addMember)
router.get('/:id', MemberController.getMember)
router.get('/', MemberController.getMembers)
router.patch('/:memberId/make-admin', MemberController.createAdmin)
const MemberRoutes = router
export default MemberRoutes
