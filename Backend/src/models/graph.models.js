import mongoose, { Schema } from "mongoose";

const graphSchema = new Schema(
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

export const Graph = mongoose.model("Graph", graphSchema)