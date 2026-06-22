import mongoose from "mongoose";
const connectDB=async()=>{
    try{
        mongoose.connection.on("connected",()=>{console.log("db is connected")})
        const mongodbURI=process.env.MONGODB_URI

        const projectName="resume-builder"
        if(!mongodbURI){
            throw new Error("Mongodb uri env not set")

        }
        await mongoose.connect(`${mongodbURI}/${projectName}`)

    }catch(error){
        console.error("error connecting to data base",error)


    }
}
export default connectDB;