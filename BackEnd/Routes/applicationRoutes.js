import express, { Router } from "express";


import isAuthorized from "../Middleware/isAuthenticated.js";
import { applyJob, getApplicant, getAppliedJobs, jobStatus } from "../Controllers/applicationControllers.js";

const router = express.Router();


router.route("/apply/:id").get(isAuthorized ,applyJob);
router.route("/all/applied/jobs").get(isAuthorized ,getAppliedJobs);
router.route("all/applicant/:id").get( isAuthorized ,getApplicant);
router.route("/job/status/:id").post( isAuthorized ,jobStatus);


export default router;