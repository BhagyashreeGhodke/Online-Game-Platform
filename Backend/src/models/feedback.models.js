import mongoose, { Schema } from "mongoose";

const feedbackSchema = new Schema(
    {
       content: {
        type: String
       },
       user: {
        type: Schema.Types.ObjectId,
        ref: "User" 
       } 
}, 
{timestamps: true})

export const FeedBack = mongoose.model("FeedBack", feedbackSchema)