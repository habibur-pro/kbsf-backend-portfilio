import { EProjectStatus } from '../../enum'
import { Donation } from '../Donation/donation.model'
import Member from '../Member/member.model'
import Project from '../Project/project.model'
import {
    startOfMonth,
    subMonths,
    endOfMonth,
    startOfDay,
    subDays,
    endOfDay,
} from 'date-fns'
const bengaliMonths = [
    'জানুয়ারি',
    'ফেব্রুয়ারি',
    'মার্চ',
    'এপ্রিল',
    'মে',
    'জুন',
    'জুলাই',
    'আগস্ট',
    'সেপ্টেম্বর',
    'অক্টোবর',
    'নভেম্বর',
    'ডিসেম্বর',
]

const bengaliWeekDays = [
    'রবিবার',
    'সোমবার',
    'মঙ্গলবার',
    'বুধবার',
    'বৃহস্পতিবার',
    'শুক্রবার',
    'শনিবার',
]
const getDashboardSummary = async () => {
    const now = new Date()

    // 1. Total donation amount & count
    const donationStats = await Donation.aggregate([
        { $match: { status: 'approved' } },
        {
            $group: {
                _id: null,
                totalAmount: { $sum: '$amount' },
                count: { $sum: 1 },
            },
        },
    ])
    const totalDonation = donationStats[0]?.totalAmount || 0
    const totalDonationCount = donationStats[0]?.count || 0

    // 2. Total members
    const totalMembers = await Member.countDocuments()

    // 3. Total active projects
    const totalActiveProjects = await Project.countDocuments({
        status: EProjectStatus.ACTIVE,
    })

    // 4. Last 6 months chart (only donation amount)
    const last6MonthsChart = await Promise.all(
        [...Array(6)].map(async (_, i) => {
            const date = subMonths(now, 5 - i)
            const label = bengaliMonths[date.getMonth()]
            const start = startOfMonth(date)
            const end = endOfMonth(date)

            const donation = await Donation.aggregate([
                {
                    $match: {
                        status: 'approved',
                        createdAt: { $gte: start, $lte: end },
                    },
                },
                {
                    $group: { _id: null, total: { $sum: '$amount' } },
                },
            ])

            return {
                label,
                amount: donation[0]?.total || 0,
            }
        })
    )

    // 5. Last 7 days chart (label, ডোনেশন, নতুন সদস্য)
    const startDate = startOfDay(subDays(now, 6))
    const endDate = endOfDay(now)

    const [dailyDonations, dailyUsers] = await Promise.all([
        Donation.aggregate([
            {
                $match: {
                    status: 'approved',
                    createdAt: { $gte: startDate, $lte: endDate },
                },
            },
            {
                $group: {
                    _id: {
                        year: { $year: '$createdAt' },
                        month: { $month: '$createdAt' },
                        day: { $dayOfMonth: '$createdAt' },
                    },
                    totalAmount: { $sum: '$amount' },
                },
            },
        ]),
        Member.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate, $lte: endDate },
                },
            },
            {
                $group: {
                    _id: {
                        year: { $year: '$createdAt' },
                        month: { $month: '$createdAt' },
                        day: { $dayOfMonth: '$createdAt' },
                    },
                    count: { $sum: 1 },
                },
            },
        ]),
    ])

    const last7DaysChart = [...Array(7)].map((_, i) => {
        const date = subDays(now, 6 - i)
        const y = date.getFullYear()
        const m = date.getMonth() + 1
        const d = date.getDate()
        const label = bengaliWeekDays[date.getDay()]

        const donationEntry = dailyDonations.find(
            (x) => x._id.year === y && x._id.month === m && x._id.day === d
        )
        const userEntry = dailyUsers.find(
            (x) => x._id.year === y && x._id.month === m && x._id.day === d
        )

        return {
            label,
            ডোনেশন: donationEntry?.totalAmount || 0,
            'নতুন সদস্য': userEntry?.count || 0,
        }
    })

    return {
        totalDonation,
        totalDonationCount,
        totalMembers,
        totalActiveProjects,
        last6MonthsChart,
        last7DaysChart,
    }
}

const DashboardServices = { getDashboardSummary }
export default DashboardServices
