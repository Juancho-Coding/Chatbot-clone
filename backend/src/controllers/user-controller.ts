import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import log, { logOption } from "../utils/logUtility";
import { User } from "../models/user";
import { IChat, Chat } from "../models/chat";
import GenError from "../utils/generalError";
import { COOKIE_NAME } from "../utils/constants";

/**
 * returns all the users
 */
export async function getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
        const users = await User.find().select(
            "-createdAt -updatedAt -resetToken -tokenExpiration -__v"
        );
        return res.status(200).json({ message: "OK", users });
    } catch (error) {
        let err = error as Error;
        next(new GenError(err.message, 500));
    }
}

/**
 * Check for user existence and for validation errors, if everything ok, saves the new user in DB
 */
export async function signupUser(req: Request, res: Response, next: NextFunction) {
    const name: string = req.body.name;
    const email: string = req.body.email;
    const password: string = req.body.password1;
    // check for validatio errors
    if (checkValidationErrors(req, res, 422)) return;
    // no error, continue save user
    try {
        const hashedPass = await bcrypt.hash(password, 10); // hashed password
        const newUser = new User({ name: name, email: email, password: hashedPass });
        await newUser.save();
        res.status(201).json({ msg: "User created", name: name, email: email });
    } catch (error) {
        next(error);
    }
}

/**
 * Check for user existence, makes login and returns token
 */
export async function loginUser(req: Request, res: Response, next: NextFunction) {
    const email: string = req.body.email;
    const password: string = req.body.password;
    // check for validation errors
    if (checkValidationErrors(req, res, 422)) return;
    // no error, continue login
    try {
        let foundUser = await User.findOne({ email: email });
        if (!foundUser) {
            const error = new GenError("email not found", 401); // user not found
            throw error;
        }
        let validPass = await bcrypt.compare(password, foundUser.password);
        if (!validPass) {
            const error = new GenError("Invalid credentials", 401); // incorrect password
            throw error;
        }
        // user can authenticate
        res.clearCookie(COOKIE_NAME); // clear previous cookies
        const token = jwt.sign(
            { id: foundUser._id.toHexString(), email },
            process.env.JWT_SECRET!,
            {
                expiresIn: "1h",
            }
        );
        // set a new cookie with the created token
        res.cookie(COOKIE_NAME, token, {
            httpOnly: true,
            domain: process.env.COOKIE_DOMAIN || "localhost",
            path: "/",
            signed: true,
            maxAge: 3600000,
        });
        return res.status(200).json({
            token: token,
            user: foundUser._id.toHexString(),
            name: foundUser.name,
            email: foundUser.email,
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Utility function to check for validation error
 * @param req request
 * @param res response
 * @param code in case of error, retruned code
 * @returns true if an error exists, false otherwise
 */
function checkValidationErrors(req: Request, res: Response, code: number): boolean {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        const error = validationErrors.array()[0]; // send only the first validation error
        const errorToSend = new GenError(error.msg, code);
        res.status(code).json(errorToSend);
        return true;
    }
    return false;
}
