import { Request, Response, NextFunction } from "express";
import OpenAI from "openai";

import { checkValidationErrors } from "../validators/utilities";
import { User } from "../models/user";
import GenError from "../utils/generalError";

export async function newChatCompletion(req: Request, res: Response, next: NextFunction) {
    const message: string = req.body.message;
    const userId: string = res.locals.jwtData.id as string;
    // check for validation errors
    if (checkValidationErrors(req, res, 422)) return;
    // no error, continue adding new chat
    try {
        let foundUser = await User.findById(userId);
        if (!foundUser) {
            const error = new GenError("User not found", 401); // user not found
            throw error;
        }
        const chats = foundUser.chats.map((chat) => {
            return { role: chat.role, content: chat.content };
        }) as OpenAI.Chat.Completions.ChatCompletionMessageParam[];
        const newChat = { role: "user", content: message };
        chats.push(newChat as OpenAI.Chat.Completions.ChatCompletionUserMessageParam);
        foundUser.chats.push(newChat);

        const openai = new OpenAI({
            apiKey: process.env.OPEN_AI_SECRET,
            organization: process.env.OPENAI_ORGANIZATIONID,
        });
        const chatResponse = await openai.chat.completions.create({
            messages: chats,
            model: "gpt-3.5-turbo",
            max_tokens: 50,
        });
        foundUser.chats.push(chatResponse.choices[0].message);
        chats.push(chatResponse.choices[0].message);
        await foundUser.save();
        return res.status(200).json({ chatData: chats });
    } catch (err) {
        if (err instanceof GenError) {
            return next(err);
        }
        const error = err as openAIError;
        return next(new GenError(`An error ocurred: ${error.message}`, 500));
    }
}

type openAIError = { [key: string]: any; error: { [key: string]: any; message: string } };
