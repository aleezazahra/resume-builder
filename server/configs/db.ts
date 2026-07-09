import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
    if (mongoose.connection.readyState === 1) return; 

    const mongodbURI = process.env.MONGODB_URI;

    if (!mongodbURI) {
        throw new Error("MONGODB_URI env not set");
    }

    await mongoose.connect(`${mongodbURI}/resume-builder`, {
    serverSelectionTimeoutMS: 10000,
    bufferCommands: false, 
});

    console.log("DB connected");
};

export default connectDB;