import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/apiError.js";
import { User } from "../models/user.models.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async(userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken}

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating tokens") 
    }
}

const registerUser = asyncHandler( async (req, res) => {

    //user datails

    const {fullName, username, email, password}= req.body
    // console.log(`email: ${email}, username: ${username}`);
    // console.log(req.body);

    //validations
    
    //not empty
    if (
        [fullName, username, email, password].some( (field) => field.trim()=== "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    //user exists or not
    const existedUser = await User.findOne({
        $or: [ { email }, { username } ]
    })

    if (existedUser){
        throw new ApiError(409, "User with username or email already exists")
    }

    //check avatar

    const avatarLocalPath = await req.files?.avatar[0]?.path
    // const avatarLocalPath = req.files?.avatar[0]?.path;
    // console.log("req.files: ",req.files);

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    //upload avatar on cloudinary

    const avatar= await uploadOnCloudinary(avatarLocalPath)

    //check avatar is uploaded on cloudinary
    if (!avatar) {
        throw new ApiError(401, "Avatar file is required")
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

const loginUser = asyncHandler( async (req, res) => {
    
    // todo
    //req body -> data
    // username or email
    // find the user in db
    // if exists then password check
    //password correct -> access and refresh token
    // send cookies
    // send res

    const {email, username, password} = req.body
    // console.log(req.body);
    // console.log(username);
    // console.log(email);

    if (!(username || email)) {
        throw new ApiError(400, "Username or email is required")
    }

    const user= await User.findOne({
        $or: [{username}, {email}]
    } )

    if (!user) {
        throw new ApiError(404, "user does not exists ")
    }

    const isPasswordValid= await user.isPasswordCorrect(password)

    if(!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select(" -password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options )
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )

})

const logoutUser = asyncHandler(async (req, res) => {

   await  User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            },
        },
        {
           new: true 
        }
    )

    const options ={
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(200, {}, "User logged out")
    )
})

const refreshAccessToken = asyncHandler( async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request")
    }

    try {
        const decodedToken = jwt.verify( 
            incomingRefreshToken, 
            process.env.REFRESH_TOKEN_SECRET 
            )
    
       const user = await User.findById(decodedToken?._id)
    
       if (!user) {
        throw new ApiError(401, "Invalid refresh token")
       }
    
       if ( incomingRefreshToken !== user?.refreshToken) {
        throw new ApiError(401, "Refresh token is expired or used")
       }
    
       const options = {
        httpOnly: true,
        secure: true
       }
    
       const {accessToken, newRefreshToken} = await generateAccessAndRefreshTokens(user._id)
    
       return res
       .status(200)
       .cookie("accessToken", accessToken)
       .cookie("refreshToken", newRefreshToken)
       .json(
        new ApiResponse(
            200,
            {accessToken, refreshToken: newRefreshToken},
            "Access token refreshed successfully"
        )
       )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }


})

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken
}