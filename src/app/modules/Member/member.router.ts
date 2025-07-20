import { Router } from 'express'
import MemberController from './member.controller'

const router = Router()
router.post('/add', MemberController.addMember)
router.get('/:id', MemberController.getMember)
router.get('/', MemberController.getMembers)
router.patch('/:memberId/make-admin', MemberController.createAdmin)
router.patch('/:memberId/update', MemberController.updateMember)
router.delete('/:memberId/delete', MemberController.deleteMember)
const MemberRoutes = router
export default MemberRoutes
