import React from "react";
import { Box, Avatar, Typography, Button } from "@mui/material";

import assistant from "../assets/avatar.png";

const ChatItem = ({ content, role, userText }) => {
    return role === "User" ? (
        <Box sx={{ display: "flex", p: 2, bgcolor: "#004d5612", gap: 2, my: 2 }}>
            <Avatar sx={{ ml: "0", bgcolor: "black", color: "white" }}>{userText}</Avatar>
            <Box>
                <Typography fontSize={"20px"}>{content}</Typography>
            </Box>
        </Box>
    ) : (
        <Box sx={{ display: "flex", p: 2, bgcolor: "#004d56", gap: 2 }}>
            <Avatar sx={{ ml: "0", bgcolor: "black", color: "white" }}>
                <img src={assistant} alt="assistant" width={"30px"} />
            </Avatar>
            <Box>
                <Typography fontSize={"20px"}>{content}</Typography>
            </Box>
        </Box>
    );
};

export default ChatItem;
