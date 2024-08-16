import express from "express";
import { logIn, logOut, register, updateProfile } from "../Controllers/userControllers.js";

import isAuthorized from "../Middleware/isAuthenticated.js";

const router = express.Router();


router.route("/register").post(register);
router.route("/logIn").post(logIn);
router.route("/logOut").get(logOut);
router.route("/profile/update").put(isAuthorized ,updateProfile);


export default router;