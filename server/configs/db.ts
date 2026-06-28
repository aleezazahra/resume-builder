import mongoose from "mongoose";
import "dotenv/config";

let isConnected = false;

const connectDB = async () => {
    if (isConnected) return;
    
    const mongodbURI = process.env.MONGODB_URI;
    
    if (!mongodbURI) {
        throw new Error("MONGODB_URI env not set");
    }

    await mongoose.connect(`${mongodbURI}/resume-builder`);
    isConnected = true;
    console.log("DB connected");
};

export default connectDB;