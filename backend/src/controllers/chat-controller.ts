import { Request, Response, NextFunction } from "express";
import OpenAI from "openai";

import { checkValidationErrors } from "../validators/utilities";
import { User } from "../models/user";
import GenError from "../utils/generalError";

/**
 * Create a new mwssage, communicate with openai, save the messages and return new message
 */
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
        // format the stored chats to send them to openai
        const chats = foundUser.chats.map((chat) => {
            return { role: chat.role, content: chat.content };
        }) as OpenAI.Chat.Completions.ChatCompletionMessageParam[];
        const newChat = { role: "user", content: message };
        // add new message to existing ones to be sent to openai
        chats.push(newChat as OpenAI.Chat.Completions.ChatCompletionUserMessageParam);
        foundUser.chats.push(newChat);

        // create object to communicate with openai
        const openai = new OpenAI({
            apiKey: process.env.OPEN_AI_SECRET,
            organization: process.env.OPENAI_ORGANIZATIONID,
        });
        // Send the messages to openai and wait response of the new message
        const chatResponse = await openai.chat.completions.create({
            messages: chats,
            model: "gpt-3.5-turbo",
        });
        // Get the response and store it
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

/**
 * Return the messages of the user
 */
export async function getChatMessages(req: Request, res: Response, next: NextFunction) {
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
        // get the chats and format the messages to be sent
        const chats = foundUser.chats.map((chat) => {
            return { role: chat.role, content: chat.content };
        }) as OpenAI.Chat.Completions.ChatCompletionMessageParam[];
        return res.status(200).json({ chatData: chats });
    } catch (err) {
        if (err instanceof GenError) {
            return next(err);
        }
        const error = err as openAIError;
        return next(new GenError(`An error ocurred: ${error.message}`, 500));
    }
}

/**
 * Clear the chats of the user
 */
export async function clearChatCompletion(req: Request, res: Response, next: NextFunction) {
    const userId: string = res.locals.jwtData.id as string;
    // check for validation errors
    if (checkValidationErrors(req, res, 422)) return;
    // no error, continue clearing chat
    try {
        let foundUser = await User.findById(userId);
        if (!foundUser) {
            const error = new GenError("User not found", 401); // user not found
            throw error;
        }
        // update the user by removing the chats from the db
        await User.findOneAndUpdate({ _id: userId }, { $set: { chats: [] } });
        return res.status(200).json({ message: "ok" });
    } catch (err) {
        if (err instanceof GenError) {
            return next(err);
        }
        const error = err as openAIError;
        return next(new GenError(`An error ocurred: ${error.message}`, 500));
    }
}

type openAIError = { [key: string]: any; error: { [key: string]: any; message: string } };
