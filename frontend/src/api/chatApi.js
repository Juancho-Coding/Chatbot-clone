import { baseUrl } from "./apiHelper";

export const newChat = async (message) => {
    const response = await fetch(`${baseUrl}/chat/new`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ message }),
    });
    if (!response.ok) {
        throw new Error("Unable to login");
    }
    const data = await response.json();
    return data;
};
