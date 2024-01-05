import { Router } from "express";

import { newChatValidation } from "../validators/chatValidators";
import { tokenValidation } from "../validators/authValidators";

import { newChatCompletion } from "../controllers/chat-controller";

export const chatRoutes = Router();

chatRoutes.post("/new", tokenValidation, newChatValidation, newChatCompletion);
