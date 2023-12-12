import { Schema, model, Types } from "mongoose";
import { IChat, chatSchema } from "./chat";

/**
 * model for am user account
 */
export interface IUser {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    chats: Types.DocumentArray<IChat>;
    resetToken: string | null;
    tokenExpiration: Date | null;
    updatedAt: Date;
    createdAt: Date;
}

const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        resetToken: { type: String, default: null },
        tokenExpiration: { type: Date, default: null },
        //chats: [{ identifier: String, role: String }],
        chats: [chatSchema],
    },
    { timestamps: true }
);

export const User = model<IUser>("User", userSchema);
