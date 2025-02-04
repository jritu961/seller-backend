import User from "../model/signup.js"
 import bcrypt from "bcryptjs"

export const registerUser=async(req,res)=>{
 const {name,email,password,role}=req.body
 console.log("🚀 ~ registerUser ~ req.body:", req.body)

try{

    if(!name || !email ||! password){
        res.status(400).json({message:"All fields are required"})
     }
     const UserExit=await User.findOne({email})
     if(UserExit){
        return res.status(400).json({ message: 'User already exists' });
     }
     const userRole = role || 'user';

    const hashPassword=await bcrypt.hash(password,10)
    await User.create({
        name,email,password:hashPassword,role
    })
res.status(201).json({message:"User has been created"})
}
catch(e){
    console.log("error",e)
res.status(500).json({message:"Internal server error"})
}
}

//role