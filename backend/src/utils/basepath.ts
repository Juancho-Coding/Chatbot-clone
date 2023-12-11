import path from "path";

export let pathbase: string;
if (require.main) {
    pathbase = path.dirname(require.main.filename);
}
