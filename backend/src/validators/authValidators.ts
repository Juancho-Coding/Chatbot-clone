import { NextFunction, Request, Response } from "express";

import { body } from "express-validator";
import { User } from "../models/user";
import { COOKIE_NAME } from "../utils/constants";
import { tokenVerification } from "../utils/tokenManager";

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

/**
 * Array with validation from login with email and password
 */
export const validateLogin = [
    body("email").trim().isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 4 }).withMessage("Invalid password"),
];

/**
 * Middleware to validate the token received on any api call
 * @param req Request
 * @param res Response
 * @param next Next function
 */
export function tokenValidation(req: Request, res: Response, next: NextFunction) {
    const cookies = req.cookies as TypeCookies;
    if (!cookies[COOKIE_NAME]) {
        return res.status(401).json({ msj: "Invalid or expired token" });
    }
    const foundCookie = cookies[COOKIE_NAME];
    const verificationResult = tokenVerification(foundCookie);
    if (verificationResult) {
        res.locals.jwtData = foundCookie;
        return next();
    }
    return res.status(401).json({ msj: "Invalid or expired token" });
}

type TypeCookies = { [key: string]: string };
