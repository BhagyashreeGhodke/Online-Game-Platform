//Backend/src/routes/user.routes.js
import { Router } from "express";
import {
    chnageCurrentPassword,
    getAllUsers,
    getCurrentUser, 
    loginUser, 
    logoutUser, 
    refreshAccessToken, 
    registerUser, 
    updateAccountDetails, 
    updateUserAvatar 
} 
from "../controllers/user.controller.js";
import { upload }  from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { forgotPassword, resetPassword } from "../controllers/otp.controller.js";

const router = Router()

router.route("/register").post(
    // upload.single('avatar'),
    upload.fields([{name: "avatar",
maxCount: 1}]),
    registerUser
    )

router.route("/login").post(loginUser)

//otp

router.route("/forgot-password").post(forgotPassword)

router.route("/reset-password").post(resetPassword)

//secured routes

router.route("/logout").post( verifyJWT, logoutUser)

router.route("/refresh-token").post(refreshAccessToken)

router.route("/change-password").post(verifyJWT, chnageCurrentPassword )

router.route("/current-user").get(verifyJWT, getCurrentUser)

router.route("/update-account").patch(verifyJWT, updateAccountDetails)

router.route("/update-avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)

router.route("/all-users").get(verifyJWT, getAllUsers)




export default router