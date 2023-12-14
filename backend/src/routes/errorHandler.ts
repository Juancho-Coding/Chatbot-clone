import { NextFunction, Request, Response } from "express";
import log, { logOption } from "../utils/logUtility";

export default function errorHandler(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    res.status(500).json(error);
    log(error, logOption.ERROR);
}
