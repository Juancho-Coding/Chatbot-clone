import mongoose, { mongo } from "mongoose";
import chalk from "chalk";
import log, { logOption } from "../utils/logUtility";

export async function connectToDatabase() {
    // validate mongodb connection string exists
    if (!process.env.MONGODB_URL) {
        log("mongodb url connection not present", logOption.ERROR);
        throw new Error("mongodb url connection not present");
    }
    try {
        await mongoose.connect(process.env.MONGODB_URL);
    } catch (error) {
        log(error, logOption.ERROR);
        throw new Error("Could not connect to mongodb");
    }
}

export async function disconnectFromDatabase() {
    try {
        await mongoose.disconnect();
    } catch (error) {
        log(error, logOption.ERROR);
        throw new Error("Could not disconnect to mongodb");
    }
}
