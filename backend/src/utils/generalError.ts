export default class GenError extends Error implements error {
    message: string;
    statusCode?: number | undefined;

    constructor(msg: string, statusCode?: number) {
        super();
        this.message = msg;
        if (statusCode) this.statusCode = statusCode;
    }
}

interface error {
    message: string;
    statusCode?: number;
}
