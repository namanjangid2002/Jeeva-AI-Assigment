import mongoose, { mongo } from "mongoose";

const schema=new mongoose.Schema({
    doctorName:{
        type:String,
        required:true,
    },
    patientName:{
        type:String,
        required:true,
    },
    patientAge:{
        type:Number,
        required:true,
    },
    recordingDate:{
        type:Date,
        default:Date.now,
    },
    soundFile:{
        data: Buffer,
        contentType: String,
    },
}) 

const Form=mongoose.model("FormData",schema);
export default Form;