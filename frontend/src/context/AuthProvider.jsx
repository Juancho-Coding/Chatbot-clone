import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { loginUser } from "../api/authApi";

const AuthContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    // perform call to login api
    const login = async (email, password) => {
        try {
            const data = await loginUser(email, password);
            setUser({ email: data.email, name: data.name });
            setIsLoggedIn(true);
        } catch (error) {
            throw new Error("Cannot login");
        }
    };

    // TODO perform call to login api
    const signup = (name, email, password) => {};

    // TODO perform call to logout api
    const logout = () => {};

    const value = { user, isLoggedIn, login, logout, signup };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
