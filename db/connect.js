import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
const url=process.env.DATABASE_SELLER_URL
const connectDb=async ()=>{
  await mongoose.connect(url)
  console.log("Database connected")
}

export default connectDb