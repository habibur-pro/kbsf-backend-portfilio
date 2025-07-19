import { Router } from 'express'
import MessageController from './message.controller'

const router = Router()
router.get('/', MessageController.getMessages)
router.post('/send', MessageController.send)
router.patch('/:messageId/update', MessageController.updateStatus)
router.delete('/:messageId/delete', MessageController.deleteMessage)
const MessageRoutes = router
export default MessageRoutes
