//Backend/src/routes/user.routes.js
import { Router } from "express";
import {
    chnageCurrentPassword,
    getCurrentUser, 
    loginUser, 
    logoutUser, 
    refreshAccessToken, 
    registerUser, 
    updateAccountDetails, 
    updateUserAvatar 
} 
from "../controllers/user.controllers.js";
import { upload }  from "../middlewares/multer.middlewares.js"
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router()

router.route("/register").post(
    // upload.single('avatar'),
    upload.fields([{name: "avatar",
maxCount: 1}]),
    registerUser
    )

router.route("/login").post(loginUser)

//secured routes

router.route("/logout").post( verifyJWT, logoutUser)

router.route("/refresh-token").post(refreshAccessToken)

router.route("/change-password").post(verifyJWT, chnageCurrentPassword )

router.route("/current-user").get(verifyJWT, getCurrentUser)

router.route("/update-account").patch(verifyJWT, updateAccountDetails)

router.route("/update-avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)


export default router