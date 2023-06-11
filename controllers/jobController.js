import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../Errors/index.js"
import { checkPermission } from "../utils/checkPermissions.js";

const createJob = async (req, res) => {
    const {position, company } = req.body
    if(!position || !company){
        throw new BadRequestError("Please Provide all values")
    }
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
}

const deleteJob = async (req, res) => {
    const {id: jobId} = req.params
    const job = await Job.findOne({_id:jobId})
    if(!job){
        throw new NotFoundError(`No Job with id ${jobId}`)
    }
    checkPermission(req.user, job.createdBy)

    await job.deleteOne()
    res.status(StatusCodes.OK).json({msg: "Sucess! Job Removed"})
}

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy : req.user.userId })
    res.status(StatusCodes.OK)
    .json({jobs, totalJobs: jobs.length, numOfPages: 1})
}

const updateJob = async (req, res) => {
    const { id : jobId } = req.params

    const {position, company} = req.body

    if(!position || !company){
        throw new BadRequestError("Please Provide all values")
    }

    const job = await Job.findOne({_id: jobId})

    if(!job){
        throw new NotFoundError(`No Job with id ${jobId}`)
    }

    checkPermission(req.user, job.createdBy)

    const updateJob = await Job.findOneAndUpdate({_id: jobId}, req.body,{
        new: true,
        runValidators: true,
    })

    res.status(StatusCodes.OK).json({updateJob})
}

const showStats = async (req, res) => {
    res.send("stats dikhao");
}

export {createJob, deleteJob, getAllJobs, updateJob, showStats}