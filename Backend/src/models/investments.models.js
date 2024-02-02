import mongoose, { Schema } from "mongoose";

const investmentSchema = new Schema(
    {
       currency: {
        type: Number
       },
       user: {
        type: Schema.Types.ObjectId,
        ref: "User" 
       } 
}, 
{timestamps: true})

export const Investment = mongoose.model("Investment", investmentSchema)