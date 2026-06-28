import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

interface IUser extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema({
    name:     { type: String, required: true },    
    email:    { type: String, required: true, unique: true }, 
    password: { type: String, required: true },     
}, { timestamps: true });

UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);   
}

export default mongoose.model<IUser>("User", UserSchema);