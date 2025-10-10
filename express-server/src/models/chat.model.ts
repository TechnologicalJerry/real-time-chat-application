import mongoose from 'mongoose';
import ChatSchema, { IMessage } from '../schemas/chat.schema';

// Create and export the Chat (Message) model
const Chat = mongoose.model<IMessage>('Message', ChatSchema);

export default Chat;
export { IMessage };
