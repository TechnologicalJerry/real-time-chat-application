import mongoose from 'mongoose';
import SessionSchema, { ISession } from '../schemas/session.schema';

// Create and export the Session model
const Session = mongoose.model<ISession>('Session', SessionSchema);

export default Session;
export { ISession };

