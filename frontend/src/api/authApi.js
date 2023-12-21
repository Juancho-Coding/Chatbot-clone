import { baseUrl } from "./apiHelper";

export const loginUser = async (email, password) => {
    const response = await fetch(`${baseUrl}/user/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
        throw new Error("Unable to login");
    }
    const data = await response.json();
    return data;
};
