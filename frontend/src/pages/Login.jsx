import { Box, Typography, Button } from "@mui/material";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { IoMdLogIn } from "react-icons/io";
import Chritsmas from "../assets/Christmas.jpg";
import InputTextField from "../components/InputTextField";
import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../api/authApi";

const Login = () => {
    const [error, setError] = useState(false);
    const login = useContext(AuthContext).login;
    const navigate = useNavigate();

    const submitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");
        try {
            toast.loading("Loging in", { id: "login" });
            await login(email, password);
            toast.success("Login succesful", { id: "login" });
            setError(false);
        } catch (error) {
            console.log(error);
            toast.error("Bad credentials", { id: "login" });
            setError(true);
        }
    };

    return (
        <Box width={"100%"} height={"100%"} display={"flex"} flex={1}>
            <Box padding={8} mt={8} display={{ md: "flex", sm: "none", xs: "none" }}>
                <img src={Chritsmas} alt="christmas tree" style={{ width: "400px" }} />
            </Box>
            <Box
                display={"flex"}
                flex={{ xs: 1, md: 0.5 }}
                justifyContent={"center"}
                alignItems={"center"}
                padding={2}
                ml={"auto"}
                mt={16}
            >
                <form
                    onSubmit={submitHandler}
                    style={{
                        margin: "auto",
                        padding: "30px",
                        boxShadow: "10px 10px 20px #000",
                        borderRadius: "10px",
                        border: "none",
                    }}
                >
                    <Box
                        sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}
                    >
                        <Typography variant="h4" textAlign="center" padding={2} fontWeight={600}>
                            Login
                        </Typography>
                        <InputTextField
                            type="email"
                            name="email"
                            label="Email"
                            id="email"
                            error={error}
                        />
                        <InputTextField
                            type="password"
                            name="password"
                            label="Password"
                            id="password"
                            error={error}
                        />
                        <Button
                            type="submit"
                            sx={{
                                px: 2,
                                py: 1,
                                mt: 2,
                                width: "400px",
                                borderRadius: 2,
                                bgcolor: "#00fffc",
                                ":hover": {
                                    bgcolor: "white",
                                    color: "black",
                                },
                            }}
                            endIcon={<IoMdLogIn />}
                            variant="outlined"
                        >
                            Outlined
                        </Button>
                    </Box>
                </form>
            </Box>
        </Box>
    );
};

export default Login;
