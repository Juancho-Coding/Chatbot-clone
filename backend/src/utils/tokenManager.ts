import jwt from "jsonwebtoken";

export type tokenPayload = { id: string; email: string };

/**
 * Generates a jwt, the payload is the user id, email
 * @param id identification of the user
 * @param email email of the user
 * @param expiresIn expiration time
 * @returns json web token
 */
export function tokenGeneration(id: string, email: string, expiresIn: string): string {
    const payload: tokenPayload = { id, email };
    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: expiresIn });
}

/**
 * verifies the token received was generated from this server
 * @param token teken received
 * @returns token was verified?
 */
export function tokenVerification(token: string): boolean {
    try {
        jwt.verify(token, process.env.JWT_SECRET!);
        return true;
    } catch (error) {
        return false;
    }
}
