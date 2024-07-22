import mongoose from "mongoose";

const Schema=mongoose.Schema;

const customerSchema=new Schema({
    customer_name:{
        type:String,
        required:true,
    },
    dob:{
        type:String,
        required:true,
    },
    income:{
        type:Number,
        required:true,
    }
},{timestamps:true})

export const Customer=mongoose.model("customer_details",customerSchema);
