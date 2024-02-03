import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/apiError.js";
import { User } from "../models/user.models.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler( async (req, res) => {
    //user datails

    const {fullName, username, email, password}= req.body
    console.log(`email: ${email}, username: ${username}`);

    //validations
    
    //not empty
    if (
        [fullName, username, email, password].some( (field) => field.trim()=== "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    //user exists or not
    const existedUser = User.findOne({
        $or: [ { email }, { username } ]
    })

    if (existedUser){
        throw new ApiError(409, "User with username or email already exists")
    }

    //check avatar

    const avatarLoacalPath = req.files?.avatar[0]?.path
    console.log("req.files: ",req.files);

    if (!avatarLoacalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    //upload avatar on cloudinary

    const avatar= await uploadOnCloudinary(avatarLoacalPath)

    //check avatar is uploaded on cloudinary
    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }

    //create user obj: create user entry in db

    const user = await User.create({
        username: username.toLowerCase(),
        fullName,
        email,
        password,
        avatar: avatar.url
    })

    //check where user created or not

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser) {
        throw new ApiError(500, "User not registered, Try again" )
    }

    //return response to user

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully")
    )

} )

export {registerUser}