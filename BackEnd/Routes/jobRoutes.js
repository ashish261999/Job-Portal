import express from "express";
import { allJobs, allJobsAdmin, jobById, postJob } from "../Controllers/jobControllers.js";
import isAuthorized from "../Middleware/isAuthenticated.js";

const router = express.Router();

router.route("/register").post( isAuthorized ,postJob);
router.route("/all/jobs").get( isAuthorized , allJobs);
router.route("/jobs/:id").get( isAuthorized , jobById);
router.route("/all/admin/jobs").get( isAuthorized , allJobsAdmin);

export default router;