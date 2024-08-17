import { Job } from "../Models/jobModel.js";

export const postJob = async (req, res) => {
  try {
    const {
      title,
      descriprtion,
      requirement,
      salary,
      location,
      jobType,
      positon,
      experience,
      companyId,
    } = req.body;
    const userId = req.id;

    if (
      !title ||
      !descriprtion ||
      !requirement ||
      !salary ||
      !location ||
      !jobType ||
      !positon ||
      !experience ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Something is missing...",
        success: false,
      });
    }
    const job = await Job.create({
      title,
      descriprtion,
      requirement: requirement.split(","),
      salary: Number(salary),
      location,
      jobType,
      positon,
      experience: Number(experience),
      company: companyId,
      created_by: userId,
    });

    return res.status(201).json({
      message: "New job created successfully...",
      job,
      sucess: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const allJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { descriprtion: { $regex: keyword, $options: "i" } },
      ],
    };
    const job = await Job.find(query);

    if (!job) {
      return res.status(404).json({
        message: "Job not found ",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const jobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found ",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const allJobsAdmin = async (req, res) => {
  try {
    const adminId = req.id;
    const job = await Job.findById({ created_by: adminId });

    if (!job) {
      return res.status(404).json({
        message: "Job not found ",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
