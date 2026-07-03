import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';


interface IUser extends mongoose.Document {
    name: string;
    email: string;
    password?: string; 
    googleId?: string; 
    comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },    
    email: { type: String, required: true, unique: true }, 

    password: { type: String }, 
    googleId: { type: String }, 
}, { timestamps: true });


UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {

    if (!this.password) return false;
    return bcrypt.compare(password, this.password);   
}

export default mongoose.model<IUser>("User", UserSchema);