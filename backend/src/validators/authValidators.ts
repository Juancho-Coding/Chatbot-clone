import { NextFunction } from "express";
import { body } from "express-validator";
import { User } from "../models/user";

/**
 * Array with validation for user name, email, passwords
 */
export const validateSignup = [
    body("name").trim().notEmpty().isLength({ min: 6 }).withMessage("Invalid name length"),
    body("email").trim().isEmail().withMessage("Invalid email"),
    body("password1").isLength({ min: 4 }).withMessage("Invalid password"),
    body("password2", "The passwords don't match").custom((value: string, { req }) => {
        return value === req.body.password1;
    }),
    body("email").custom(async (value) => {
        const user = await User.findOne({ email: value });
        if (user) {
            throw new Error("email already in use");
        }
        return true;
    }),
];

export const validateLogin = [
    body("email").trim().isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 4 }).withMessage("Invalid password"),
];
