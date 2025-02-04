import mongoose, { Schema } from "mongoose";

const UserModel=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user' 
    },
    created_at:{
        type:Date,
        default:Date.now()
    }
})

const User=mongoose.model("USER",UserModel)

export default User