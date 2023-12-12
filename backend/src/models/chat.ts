import { Types, Schema, model } from "mongoose";
import crypto from "crypto";

/**
 * Model for a chat element
 */
export interface IChat {
    _id: Types.ObjectId;
    id: string;
    role: string;
    content: string;
}

export const chatSchema = new Schema<IChat>({
    id: { type: String, default: crypto.randomUUID() },
    role: { type: String, required: true },
    content: { type: String, required: true },
});

export const Chat = model<IChat>("User", chatSchema);
