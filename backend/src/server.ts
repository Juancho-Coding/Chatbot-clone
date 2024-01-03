import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import { router as mainRoutes } from "./routes/index";
import errorHandler from "./routes/errorHandler";

/**
 * Creates an express app to start the server
 * @returns express application
 */
export default function createServer() {
    const app = express();
    app.use(morgan("dev")); // request logging, remove in production
    app.use(cors()); // allow request from othe domains
    app.use(bodyParser.json()); // parse incoming json data
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser(process.env.COOKIE_SECRET)); // parse incoming cookies

    app.use("/api/v1", mainRoutes);
    app.use(errorHandler);

    return app;
}
