import { body } from "express-validator";

export const newChatValidation = [body("message").notEmpty().withMessage("Message is required")];
