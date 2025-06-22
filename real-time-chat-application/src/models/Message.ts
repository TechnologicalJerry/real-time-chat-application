import mongoose from 'mongoose';
export interface IMessage extends mongoose.Document {
    sender: mongoose.Types.ObjectId;
    text: string;
    timestamp: Date;
}
const MessageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});
export default mongoose.model<IMessage>('Message', MessageSchema);
