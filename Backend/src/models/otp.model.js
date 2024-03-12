import mongoose, {Schema} from 'mongoose';

const otpSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, // TTL (Time To Live) in seconds - OTP expires after 5 minutes
  },
},
{timestamps: true}
);

const OTP = mongoose.model('OTP', otpSchema);

export default OTP;
