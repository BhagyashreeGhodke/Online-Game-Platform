import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controllers.js";
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

export default router