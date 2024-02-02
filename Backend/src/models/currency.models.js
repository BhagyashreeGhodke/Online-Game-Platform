import mongoose, { Schema } from "mongoose";

const currencySchema = new Schema(
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

export const Currency = mongoose.model("Currency", currencySchema)