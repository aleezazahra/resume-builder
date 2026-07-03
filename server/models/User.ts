import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Interface defining the User structure
interface IUser extends mongoose.Document {
    name: string;
    email: string;
    password?: string; // Optional to allow Google users
    googleId?: string; // Added to support Google auth
    comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },    
    email: { type: String, required: true, unique: true }, 
    // Password remains optional for accounts created via Google
    password: { type: String }, 
    googleId: { type: String }, 
}, { timestamps: true });

// Method to safely compare passwords
UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    // Return false if the user has no password (e.g., Google user)
    if (!this.password) return false;
    return bcrypt.compare(password, this.password);   
}

export default mongoose.model<IUser>("User", UserSchema);