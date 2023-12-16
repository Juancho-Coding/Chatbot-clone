import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AuthContextProvider from "./context/AuthProvider";
import "./App.css";
import BasePage from "./pages/BasePage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";

const App = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <BasePage />,
            errorElement: <NotFound />,
            children: [
                { path: "", element: <Home /> },
                { path: "/login", element: <Login /> },
                { path: "/signup", element: <Signup /> },
                { path: "/chat", element: <Chat /> },
            ],
        },
    ]);
    return (
        <AuthContextProvider>
            <RouterProvider router={router} />
        </AuthContextProvider>
    );
};

export default App;
