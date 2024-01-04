import { Request, Response } from "express";
import { validationResult } from "express-validator";
import GenError from "../utils/generalError";

/**
 * Utility function to check for validation error
 * @param req request
 * @param res response
 * @param code in case of error, retruned code
 * @returns true if an error exists, false otherwise
 */
export function checkValidationErrors(req: Request, res: Response, code: number): boolean {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        const error = validationErrors.array()[0]; // send only the first validation error
        const errorToSend = new GenError(error.msg, code);
        res.status(code).json(errorToSend);
        return true;
    }
    return false;
}
