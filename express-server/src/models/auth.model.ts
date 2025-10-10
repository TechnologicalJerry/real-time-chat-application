import mongoose from 'mongoose';
import AuthTokenSchema, { IAuthToken } from '../schemas/auth.schema';

// Create and export the AuthToken model
const AuthToken = mongoose.model<IAuthToken>('AuthToken', AuthTokenSchema);

export default AuthToken;
export { IAuthToken };

