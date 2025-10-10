import mongoose from 'mongoose';
import UserSchema, { IUser } from '../schemas/user.schema';

// Create and export the User model
const User = mongoose.model<IUser>('User', UserSchema);

export default User;
export { IUser };
