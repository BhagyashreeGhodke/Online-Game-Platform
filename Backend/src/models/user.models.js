import mongoose, {Schema} from "mongoose";

const userSchema = new Schema(
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
        admin: {
            type: Schema.Types.ObjectId,
            ref: "Admin"
        }
    },
    {timestamps: true}
)


export const User = mongoose.model("User", userSchema)