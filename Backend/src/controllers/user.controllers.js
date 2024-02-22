//Backend/src/controllers/user.controllers.js
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
            $unset: {
                refreshToken: 1
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

const chnageCurrentPassword = asyncHandler( async (req, res) => {
    const { oldPassword, newPassword, confirmPassword} = req.body

    const user = await User.findById(req.user?._id)

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid password")
    }

    if(newPassword !== confirmPassword) {
        throw new ApiError(400, "Password does not match")
    }

    user.password = newPassword
    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully" ))

})

const getCurrentUser = asyncHandler ( async (req, res) => {
    return res
    .status(200)
    .json(
        new ApiResponse(200, req.user, "Current user fetched successfully")
    )
})

const updateAccountDetails = asyncHandler( async (req, res) => {
    const { fullName, email } = req.body

    if (!(fullName || email)) {
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullName,
                email
            }
        },
        { new: true}

    ).select(
        " -password "
    )

    return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"))
})

const updateUserAvatar = asyncHandler( async (req, res) => {
    const avatarLocalPath = req.file?.path

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is missing")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Error while uploading avatar")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                avatar: avatar.url
            }
        },
        {new: true}
    ).select("-password")

    return res
    .status(200)
    .json(
        new ApiResponse(200, user, "Avatar updated successfully")
    )

})

const getUserProfile = asyncHandler( async (req, res) => {
    const { username } = req.params

    if (!username?.trim()) {
        throw new ApiError(400, "Username is missing")
    }

    //update for dummy currency

    // const userProfile =  await User.aggregate(
    //     [

    //     ]
    // )
})




// {
// // Store email verification tokens and their associated email addresses
// const emailVerificationTokens = {};

// // Endpoint to register a new user and send verification email
// app.post('/api/register', (req, res) => {
//   const { username, email } = req.body;

//   // Generate a random verification token
//   const verificationToken = Math.random().toString(36).substring(7);

//   // Store the token with the associated email
//   emailVerificationTokens[verificationToken] = email;

//   // Send the verification email to the user's email address
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'your-email@gmail.com',
//       pass: 'your-email-password'
//     }
//   });

//   const mailOptions = {
//     from: 'your-email@gmail.com',
//     to: email,
//     subject: 'Email Verification',
//     text: `Thank you for registering! Please click the following link to verify your email: http://localhost:8000/api/verify-email/${verificationToken}`
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log('Error sending email:', error);
//       res.status(500).json({ message: 'Failed to send verification email. Please try again.' });
//     } else {
//       console.log('Email sent:', info.response);
//       res.status(200).json({ message: 'Verification email sent successfully. Please check your email.' });
//     }
//   });
// });

// // Endpoint to verify email
// app.get('/api/verify-email/:token', (req, res) => {
//   const token = req.params.token;

//   // Check if token exists in emailVerificationTokens
//   if (emailVerificationTokens[token]) {
//     // Implement your own logic to verify the email (e.g., update database)
//     const email = emailVerificationTokens[token];
//     console.log(`Email ${email} verified successfully.`);

//     // Remove the token from emailVerificationTokens
//     delete emailVerificationTokens[token];

//     res.status(200).send('Email verified successfully.');
//   } else {
//     res.status(400).send('Invalid verification token.');
//   }
// });



// app.listen(8000, () => {
//   console.log('Server is running on port 8000');
// });
// }

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    chnageCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar
}