// import ApiError from '../../helpers/ApiErrot'
// import Member from '../Member/member.model'
// import Auth from './auth.model'
// import httpStatus from 'http-status'

// import mongoose from 'mongoose'

// const createAdmin = async (memberId: string) => {
//     const session = await mongoose.startSession()
//     session.startTransaction()
//     try {
//         const member = await Member.findOne({ id: memberId }).session(session)
//         if (!member) {
//             throw new ApiError(httpStatus.BAD_REQUEST, 'member not found')
//         }

//         await Member.findOneAndUpdate(
//             { id: memberId },
//             { role: 'admin' },
//             { new: true, session }
//         )

//         await Auth.findOneAndUpdate(
//             {
//                 userId: member.id,
//             },
//             { role: 'admin' },
//             { new: true, session }
//         )

//         await session.commitTransaction()
//         return { message: 'admin created' }
//     } catch (error: any) {
//         await session.abortTransaction()
//         throw new ApiError(
//             httpStatus.BAD_REQUEST,
//             error?.message || 'something went wrong'
//         )
//     } finally {
//         await session.endSession()
//     }
// }

// const AuthServices = {
//     createAdmin,
// }
// export default AuthServices
