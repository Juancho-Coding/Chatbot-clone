import mongoose from "mongoose";
import crypto from "crypto";

/**
 * Model for a chat element
 */
export interface IChat {
    _id: mongoose.Types.ObjectId;
    id: string;
    role: string;
    content: string;
}

export const chatSchema = new mongoose.Schema<IChat>({
    id: { type: String, default: crypto.randomUUID() },
    role: { type: String, required: true },
    content: { type: String, required: true },
});

export const Chat = mongoose.Model<IChat> || mongoose.model<IChat>("User", chatSchema);
