import dotenv from "dotenv";
import createServer from "./server";
import chalk from "chalk";
import { connectToDatabase } from "./db/connection";
import log, { logOption } from "./utils/logUtility";

dotenv.config();
const app = createServer();
// load port from env variables or a default port
const PORT = parseInt(process.env.SERVER_PORT || "5000");

connectToDatabase()
    .then(() => {
        app.listen(PORT, () => {
            log(`Server listening on port ${PORT}`, logOption.SUCCESS);
        });
    })
    .catch((error) => {
        log(error, logOption.ERROR);
    });
