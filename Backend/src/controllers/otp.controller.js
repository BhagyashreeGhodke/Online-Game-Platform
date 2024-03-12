//otp.controller.js

import {asyncHandler} from '../utils/asyncHandler.js';
import nodemailer from 'nodemailer';
import {User} from '../models/user.model.js';
import OTP from '../models/otp.model.js';
import {ApiError} from '../utils/apiError.js';
import {ApiResponse} from '../utils/apiResponse.js';

// Create a transporter with your SMTP settings
const myEmail = process.env.Email;
const myEmailPass = process.env.Password
// console.log("myEmail and password: ", myEmail, myEmailPass);

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: myEmail,
    pass: myEmailPass,
  },
});

// Function to generate OTP
function generateOTP(length = 6) {
  const characters = '0123456789';
  let otp = '';

  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * characters.length);
    otp += characters[index];
  }

  return otp;
}

// Function to send OTP via email
async function sendOTP(email, otp) {
  try {
    console.log("otp in senOTP(): ", otp);
    console.log("email in sendOTP(): ", email);
    // Send mail with defined transport object
    await transporter.sendMail({
      from: myEmail,
      to: email,
      subject: 'OTP for Password Reset',
      text: `Your OTP for password reset is: ${otp}`,
    });

    console.log('OTP email sent successfully');
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw new Error('Failed to send OTP email');
  }
}

// Endpoint for initiating password reset and sending OTP
const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
  console.log("**************************************\nemail in forgot password: ", email);
    // Check if the user exists with the provided email
    const user = await User.findOne({ email });
  
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
  
    // Generate OTP
    const otp = generateOTP();
  
    // Save OTP to the database
    await OTP.create({ email, otp });
  
    // Send OTP to the user (via email, SMS, etc.)
    await sendOTP(email, otp);
  
    return res.status(200).json(new ApiResponse(200, {}, 'OTP sent successfully'));
  }) 

// Endpoint for validating OTP and resetting password

const resetPassword = asyncHandler(async (req, res) => {
    const { email, otp, newPassword, confirmPassword } = req.body;
    console.log("otp in reset password: ", otp);
    console.log("email in reset password: ", email);
  
    // Find the OTP associated with the provided email
    const otpEntry = await OTP.findOne({ email, otp });
    console.log("otpEntry: ", otpEntry);
    if (!otpEntry) {
      throw new ApiError(400, 'Invalid OTP');
    }
  
    // Find the user by email
    const user = await User.findOne({ email });
  
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
  
    // Validate if newPassword matches confirmPassword
    if (newPassword !== confirmPassword) {
      throw new ApiError(400, 'Passwords do not match');
    }
  
    // Update user's password
    user.password = newPassword;
    await user.save();
  
    // Delete the OTP entry after successful password reset
    // await otpEntry.remove();
  
    return res.status(200).json(new ApiResponse(200, {}, 'Password reset successfully'));
  })



export {
    forgotPassword,
    resetPassword
}
