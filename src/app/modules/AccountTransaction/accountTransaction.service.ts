import mongoose from 'mongoose'
import Member from '../Member/member.model'
import { IAccountTransition } from './accountTransaction.interface'
import httpStatus from 'http-status'
import ApiError from '../../helpers/ApiErrot'
import { EAccountTransactionType } from '../../enum'
import Accounts from '../Accounts/accounts.model'
import AccountTransaction from './accountTransaction.model'

const addTransaction = async (payload: Partial<IAccountTransition>) => {
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        if (!payload.amount || payload.amount <= 0) {
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                'Amount must be greater than 0'
            )
        }

        const admin = await Member.findOne({
            id: payload.adminId,
            role: 'admin',
        }).session(session)

        if (!admin) {
            throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized access')
        }

        const accounts = await Accounts.findOne({
            adminId: payload.adminId,
        }).session(session)

        if (!accounts) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Accounts not found')
        }

        const newTransaction = await AccountTransaction.create([payload], {
            session,
        })

        if (!newTransaction.length) {
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                'Failed to create transaction'
            )
        }

        const amount = newTransaction[0].amount

        if (payload.type === EAccountTransactionType.Income) {
            await Accounts.findOneAndUpdate(
                { id: accounts.id },
                {
                    $inc: {
                        totalBalance: amount,
                        totalEarning: amount,
                    },
                },
                { new: true, session }
            )
        } else if (payload.type === EAccountTransactionType.Expense) {
            if (accounts.totalBalance < amount) {
                throw new ApiError(
                    httpStatus.BAD_REQUEST,
                    'Insufficient balance'
                )
            }

            await Accounts.findOneAndUpdate(
                { id: accounts.id },
                {
                    $inc: {
                        totalBalance: -amount,
                        totalCost: amount,
                        totalCostEntry: 1,
                    },
                },
                { new: true, session }
            )
        } else {
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                'Invalid transaction type'
            )
        }

        await session.commitTransaction()
        return { message: 'Transaction added' }
    } catch (error: any) {
        await session.abortTransaction()
        throw new ApiError(
            httpStatus.BAD_REQUEST,
            error?.message || 'Something went wrong'
        )
    } finally {
        await session.endSession()
    }
}

const updateTransaction = async (
    transactionId: string,
    payload: Partial<IAccountTransition>
) => {
    delete payload.type // Don't allow changing type for now

    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        const transaction = await AccountTransaction.findOne({
            id: transactionId,
        }).session(session)

        if (!transaction) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Transaction not found')
        }

        const admin = await Member.findOne({
            id: payload.adminId,
            role: 'admin',
        }).session(session)

        if (!admin) {
            throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized access')
        }

        const accounts = await Accounts.findOne({
            adminId: payload.adminId,
        }).session(session)

        if (!accounts) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Accounts not found')
        }

        // Handle amount update
        if (payload.amount !== undefined) {
            const oldAmount = transaction.amount
            const newAmount = payload.amount
            const type = transaction.type
            const difference = newAmount - oldAmount

            if (difference !== 0) {
                const newTotalBalance =
                    type === EAccountTransactionType.Income
                        ? accounts.totalBalance + difference
                        : accounts.totalBalance - difference

                const newTotalEarning =
                    type === EAccountTransactionType.Income
                        ? accounts.totalEarning + difference
                        : accounts.totalEarning

                const newTotalCost =
                    type === EAccountTransactionType.Expense
                        ? accounts.totalCost + difference
                        : accounts.totalCost

                // ❌ Validate no negative values
                if (newTotalBalance < 0) {
                    throw new ApiError(
                        httpStatus.BAD_REQUEST,
                        'Transaction update failed: insufficient balance.'
                    )
                }

                if (
                    type === EAccountTransactionType.Income &&
                    newTotalEarning < 0
                ) {
                    throw new ApiError(
                        httpStatus.BAD_REQUEST,
                        'Transaction update failed: insufficient balance.'
                    )
                }

                if (
                    type === EAccountTransactionType.Expense &&
                    newTotalCost < 0
                ) {
                    throw new ApiError(
                        httpStatus.BAD_REQUEST,
                        'Transaction update failed: total cost cannot be negative.'
                    )
                }

                // ✅ Apply the update
                const updateFields: Record<string, number> = {}

                if (type === EAccountTransactionType.Income) {
                    updateFields.totalBalance = difference
                    updateFields.totalEarning = difference
                } else if (type === EAccountTransactionType.Expense) {
                    updateFields.totalBalance = -difference
                    updateFields.totalCost = difference
                }

                await Accounts.findOneAndUpdate(
                    { id: accounts.id },
                    { $inc: updateFields },
                    { new: true, session }
                )
            }

            // Update the transaction
            await AccountTransaction.findOneAndUpdate(
                { id: transactionId },
                payload,
                { new: true, session }
            )
        }

        await session.commitTransaction()
    } catch (error: any) {
        await session.abortTransaction()
        throw new ApiError(
            httpStatus.BAD_REQUEST,
            error?.message || 'Something went wrong during transaction update'
        )
    } finally {
        await session.endSession()
    }
}

const getTransactions = async () => {
    const transactions = await AccountTransaction.find()
    return transactions
}

const AccountTransactionServices = {
    addTransaction,
    getTransactions,
    updateTransaction,
}
export default AccountTransactionServices
