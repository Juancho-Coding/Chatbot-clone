import React from "react";
import ReactDOM from "react-dom/client";
import { createTheme, ThemeProvider } from "@mui/material";
import { Toaster } from "react-hot-toast";

import App from "./App.jsx";
import "./index.css";

const theme = createTheme({
    typography: { fontFamily: "Roboto Slab, serif", allVariants: { color: "white" } },
});
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <Toaster position="top-center">
                <App />
            </Toaster>
        </ThemeProvider>
    </React.StrictMode>
);
