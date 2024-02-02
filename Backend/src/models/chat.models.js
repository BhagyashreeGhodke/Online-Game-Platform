import mongoose, { Schema } from "mongoose";

const chatSchema = new Schema(
    {
       content: {
        type: String
       },
       user: {
        type: Schema.Types.ObjectId,
        ref: "Admin" 
       } 
}, 
{timestamps: true})

export const Chat = mongoose.model("Chat", chatSchema)