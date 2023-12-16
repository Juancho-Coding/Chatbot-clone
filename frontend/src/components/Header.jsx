import React from "react";
import { useContext } from "react";
import { Toolbar, AppBar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import NavigationLink from "./NavigationLink";
import classes from "./Header.module.css";
import logo from "../assets/logo.svg";

const Header = () => {
    const context = useContext(AuthContext);
    return (
        <AppBar
            sx={{
                bgcolor: "transparent",
                position: "static",
                boxShadow: "none",
            }}
        >
            <Toolbar sx={{ display: "flex" }}>
                <div
                    style={{
                        display: "flex",
                        marginRight: "10px",
                        alignItems: "center",
                        gap: "8px",
                    }}
                >
                    <Link to="/">
                        <img
                            src={logo}
                            alt="Logo"
                            width={"30px"}
                            height={"30px"}
                            className={classes["image-inverted"]}
                        />
                    </Link>
                </div>
                <Typography
                    sx={{
                        md: "block",
                        sm: "none",
                        xs: "none",
                        marginRight: "auto",
                        fontWeight: "800",
                        textShadow: "2px 2px 20px #000",
                    }}
                >
                    <span style={{ fontSize: "20px" }}>MERN</span> News
                </Typography>

                {!context.isLoggedIn && (
                    <div style={{ display: "flex" }}>
                        <NavigationLink
                            to={"/login"}
                            text={"Login"}
                            bg="#00fffc"
                            textColor="black"
                        />
                        <NavigationLink
                            to={"/signup"}
                            text={"Signup"}
                            bg="#51538f"
                            textColor="white"
                        />
                    </div>
                )}
                {context.isLoggedIn && (
                    <div style={{ display: "flex" }}>
                        <NavigationLink
                            to={"/chat"}
                            text={"Go to Chat"}
                            bg="#00fffc"
                            textColor="black"
                        />
                        <NavigationLink
                            to={"/logout"}
                            text={"Logout"}
                            bg="#51538f"
                            textColor="white"
                        />
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
