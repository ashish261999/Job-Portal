import express, { Router } from "express";

import { registerCompany ,getCompany,updateConmay,getCompanyById} from "../Controllers/companyControllers.js";
import isAuthorized from "../Middleware/isAuthenticated.js";

const router = express.Router();


router.route("/register").post(isAuthorized ,registerCompany);
router.route("/all/company").get(isAuthorized ,getCompany);
router.route("update/:id").put( isAuthorized ,updateConmay);
router.route("company/:id").get( isAuthorized ,getCompanyById);


export default router;