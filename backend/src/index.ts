import dotenv from "dotenv";
import createServer from "./server";
import chalk from "chalk";

dotenv.config();
const app = createServer();
const port = parseInt(process.env.SERVER_PORT || "5000");

app.listen(port, () => {
    console.log(chalk.green(`Server listening on port ${port}`));
});
