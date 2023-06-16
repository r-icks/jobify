import express from "express"
const router=express.Router();

import rateLimiter from "express-rate-limit"

const apiLimiter = rateLimiter({
    windowMs: 15*60*1000,
    max: 10,
    message: 'Too many requests from this IP, try again after 15 minutes'
})

import { getCurrentUser, login, logout, register, updateUser } from "../controllers/authController.js";
import authenticateUser from "../middleware/auth.js";
import testUser from "../middleware/testUser.js";

router.route("/register").post(apiLimiter,register)
router.route("/login").post(apiLimiter,login)
router.route("/updateUser").patch(authenticateUser,testUser,updateUser)
router.route("/getCurrentUser").get(authenticateUser, getCurrentUser);
router.route("/logout").get(logout)

export default router