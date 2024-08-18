import { Application } from "../Models/applicationModel.js";
import { Job } from "../Models/jobModel.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(400).json({
        message: "Job Id is requied...",
        success: false,
      });
    }

    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication) {
      return res.status(400).json({
        message: "You have allready applied for this job...",
        success: false,
      });
    }
    const jobs = await Job.findById(jobId);
    if (!jobs) {
      return res.status(404).json({
        message: "Job not found...",
        success: false,
      });
    }
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });
    jobs.application.push(newApplication);
    await jobs.save();
    return res.status(201).json({
      message: "Job applied successfully...",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId }).sort({
      createdAt: -1,
    });

    if (!application) {
      return res.status(404).json({
        message: "No Application found...",
        success: false,
      });
    }
    return res.status(201).json({
      application,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getApplicant = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "No job  found...",
        success: false,
      });
    }
    return res.status(404).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const jobStatus = async (req, res) =>{
    try {
        const status= req.body;
        const applicationId = req.params.id;

        if (!status) {
            return res.status(400).json({
              message: "Status is required...",
              success: false,
            });
          };

          const application = await Application.findOne({_id:applicationId});

          if (!application) {
            return res.status(404).json({
              message: "Application not found...",
              success: false,
            });
          };
           application = status.toLowerCase();
           await application.save();
           return res.status(200).json({
            message: "Status is Updated sucessfully...",
            success: true,
          });

    } catch (error) {
        console.log(error);
    }
};