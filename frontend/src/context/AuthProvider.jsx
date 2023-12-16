import { useState } from "react";
import { AuthContext } from "./AuthContext";

const AuthContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    // TODO perform call to login api
    const login = (email, password) => {};

    // TODO perform call to login api
    const signup = (name, email, password) => {};

    // TODO perform call to logout api
    const logout = () => {};

    const value = { user, isLoggedIn, login, logout, signup };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
