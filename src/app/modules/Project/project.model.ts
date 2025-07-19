import { Model, Schema, model } from 'mongoose'
import { EProjectStatus, EProjectType } from '../../enum'
import { IProject } from './project.interface'
import idGenerator from '../../helpers/idGenerator'
import { Document } from 'mongoose'

const ProjectSchema = new Schema(
    {
        id: {
            type: String,
            required: [true, 'id is required'],
            unique: true,
        },
        projectNumber: {
            type: String,
            required: [true, 'Project number is required'],
            unique: true,
        },
        projectType: {
            type: String,
            enum: {
                values: Object.values(EProjectType),
                message: 'Invalid project type',
            },
            required: [true, 'Project type is required'],
        },
        image: {
            type: String,
            required: [true, 'image  is required'],
        },
        projectName: {
            type: String,
            required: [true, 'Project name is required'],
            trim: true,
        },
        targetAmount: {
            type: Number,
            default: 0,
        },
        currentAmount: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
            enum: {
                values: Object.values(EProjectStatus),
                message: 'Invalid project status',
            },
            default: EProjectStatus.ACTIVE,
        },
        endDate: {
            type: Date,
            default: null,
        },
        projectDescription: {
            type: String,
            required: [true, 'Project description is required'],
        },
    },
    {
        timestamps: true,
    }
)

ProjectSchema.pre<IProject>('validate', async function (next) {
    if (!this.id) {
        this.id = await idGenerator(
            this.constructor as Model<Document & IProject>
        )
    }
    next()
})

const Project = model('project', ProjectSchema)
export default Project
