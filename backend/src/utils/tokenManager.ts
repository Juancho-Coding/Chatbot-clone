import jwt from "jsonwebtoken";

export function tokenGeneration(id: string, email: string, expiresIn: string): string {
    return jwt.sign({ id, email }, process.env.JWT_SECRET!, { expiresIn: "1h" });
}

export function tokenVerification(token: string): boolean {
    try {
        jwt.verify(token, process.env.JWT_SECRET!);
        return true;
    } catch (error) {
        return false;
    }
}
