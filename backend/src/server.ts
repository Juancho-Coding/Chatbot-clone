import express from "express";
import bodyParser from "body-parser";

import { router as mainRoutes } from "./routes/index";

/**
 * Creates an express app to start the server
 * @returns express application
 */
export default function createServer() {
    const app = express();
    app.use(bodyParser.json()); // parse incoming json data
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(mainRoutes);
    return app;
}
