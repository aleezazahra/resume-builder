import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    name:     { type: String, required: true },       // Fixed: added type: String
    email:    { type: String, required: true, unique: true }, 
    password: { type: String, required: true },     
}, { timestamps: true });

UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);   
}

export default mongoose.model("User", UserSchema);