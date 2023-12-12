import chalk from "chalk";

export enum logOption {
    SUCCESS = "SUCCESS",
    ERROR = "ERROR",
    OTHER = "OTHER",
}

/**
 * Wrapper to log with colors
 * @param data any value
 * @param option enum option
 */
export default function conLog(data: any, option: logOption = logOption.OTHER) {
    switch (option) {
        case logOption.SUCCESS:
            console.log(chalk.green(data));
            break;
        case logOption.ERROR:
            console.log(chalk.red(data));
            break;
        default:
            console.log(data);
            break;
    }
}
