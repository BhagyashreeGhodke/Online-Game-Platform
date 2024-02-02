import mongoose, { Schema } from "mongoose";

const adminSchema= new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullname: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String, //cloudinary url
            required: true
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            trim: true,
        },
        refreshToken: {
            type: String
        },
    
    },
    {timestamps: true}
)

export const Admin = mongoose.model("Admin", adminSchema)