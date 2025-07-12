import { EProjectStatus, EProjectType } from '../../enum'

export interface IProject {
    id: string
    projectNumber: number
    projectType: EProjectType
    projectName: string
    targetAmount: number
    currentAmount: number
    status: EProjectStatus
    endDate: Date
    projectDescription: string
    createdAt: Date
    updatedAt: Date
}
