import mongoose from "mongoose";
import { IChat, chatSchema } from "./chat";

/**
 * model for am user account
 */
export interface IUser {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    password: string;
    chats: mongoose.Types.DocumentArray<IChat>;
    resetToken: string | null;
    tokenExpiration: Date | null;
    updatedAt: Date;
    createdAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        resetToken: { type: String, default: null },
        tokenExpiration: { type: Date, default: null },
        chats: [{ type: chatSchema }],
    },
    { timestamps: true }
);

export const User =
    (mongoose.models["User"] as mongoose.Model<IUser>) || mongoose.model<IUser>("User", userSchema);
//export const User = mongoose.model<IUser>("User", userSchema);
