import { EMessageStatus } from '../../enum'
import { IMessage } from './message.interface'
import Message from './message.model'

const send = async (payload: Partial<IMessage>) => {
    await Message.create(payload)
    return { message: 'message sent' }
}
const getMessages = async () => {
    const messages = await Message.find()
    messages.sort((a, b) => {
        if (a.status === b.status) {
            return b.createdAt.getTime() - a.createdAt.getTime()
        }
        return a.status === 'unread' ? -1 : 1
    })
    return messages
}

const updateStatus = async (
    id: string,
    payload: { status: EMessageStatus }
) => {
    console.log(id)
    await Message.findOneAndUpdate({ id }, payload, { new: true })
    return { message: 'status updated' }
}

const MessageServices = { send, getMessages, updateStatus }
export default MessageServices
