import { createContext } from "react";

const defaultContextData = {
    isLoggedIn: false,
    user: { name: "", email: "" },
    login: (email, password) => {},
    signup: (name, email, password) => {},
    logout: () => {},
};
export const AuthContext = createContext(defaultContextData);
