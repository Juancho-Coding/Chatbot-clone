import React, { useContext, useState, useRef, useEffect } from "react";
import { Box, Avatar, Typography, Button, IconButton } from "@mui/material";
import { red } from "@mui/material/colors";
import { IoMdSend } from "react-icons/io";
import { toast } from "react-hot-toast";

import { newChat } from "../api/chatApi";
import { AuthContext } from "../context/AuthContext";
import ChatItem from "../components/ChatItem";

const Chat = () => {
    const [chatMessages, setChatMessages] = useState([]);
    const [message, setMessage] = useState("");
    const context = useContext(AuthContext);
    const scrollRef = useRef(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (message.length > 0) {
                setChatMessages((prev) => {
                    return [...prev, { role: "user", content: message }];
                });
                const result = await newChat(message);
                setMessage("");
                setChatMessages([...result.chatData]);
            }
        } catch (error) {
            toast.error("An error ocurred");
        }
    };

    useEffect(() => {
        const lastChildElement = scrollRef.current.lastElementChild;
        lastChildElement.scrollIntoView({ behavior: "smooth" });
    }, [chatMessages]);

    return (
        <Box
            sx={{
                display: "flex",
                flex: 1,
                width: "100%",
                height: "100%",
                mt: 3,
                gap: 3,
            }}
        >
            <Box
                sx={{
                    display: { md: "flex", xs: "none", sm: "none" },
                    flex: 0.2,
                    flexDirection: "column",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        width: "100%",
                        height: "60vh",
                        bgcolor: "rgb(12,29,39)",
                        borderRadius: 5,
                        flexDirection: "column",
                        mx: 3,
                    }}
                >
                    <Avatar
                        sx={{
                            mx: "auto",
                            my: 2,
                            bgcolor: "white",
                            color: "black",
                            fontWeight: 700,
                        }}
                    >
                        {`${context.user.name[0]}${context.user.name.split(" ")[1][0]}`}
                    </Avatar>
                    <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
                        Talking to your assistant
                    </Typography>
                    <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3 }}>
                        You can add some questions related to Knowledge, Business, Advices,
                        Education, etc. But avoid sharing personal information
                    </Typography>
                    <Button
                        sx={{
                            width: "200px",
                            my: "auto",
                            color: "white",
                            fontWeight: "700",
                            borderRadius: 3,
                            mx: "auto",
                            bgcolor: red[300],
                            ":hover": { bgcolor: red.A400 },
                        }}
                    >
                        Clear Conversation
                    </Button>
                </Box>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flex: { md: 0.8, xs: 1, sm: 1 },
                    flexDirection: "column",
                    px: 3,
                }}
            >
                <Typography
                    sx={{
                        textAlign: "center",
                        fontSize: "40px",
                        color: "white",
                        mb: 2,
                        mx: "auto",
                    }}
                >
                    Model ChatGPT 3.5 Turbo
                </Typography>
                <Box
                    ref={scrollRef}
                    sx={{
                        width: "100%",
                        height: "60vh",
                        borderRadius: 3,
                        mx: "auto",
                        display: "flex",
                        flexDirection: "column",
                        overflow: "scroll",
                        overflowX: "hidden",
                        overflowY: "auto",
                        scrollBehavior: "smooth",
                    }}
                >
                    {chatMessages.map((element, index) => {
                        return (
                            <ChatItem
                                key={index}
                                content={element.content}
                                role={element.role}
                                userText={`${context.user.name[0]}${
                                    context.user.name.split(" ")[1][0]
                                }`}
                            ></ChatItem>
                        );
                    })}
                </Box>
                <form onSubmit={handleSubmit}>
                    <div
                        style={{
                            boxSizing: "border-box",
                            width: "100%",
                            padding: "20px",
                            borderRadius: 8,
                            backgroundColor: "rgb(17,27,39",
                            display: "flex",
                            margin: "auto",
                            marginTop: "10px",
                        }}
                    >
                        <input
                            type="text"
                            name="message"
                            placeholder="Ask something"
                            value={message}
                            onChange={(event) => {
                                setMessage(event.target.value);
                            }}
                            style={{
                                width: "100%",
                                backgroundColor: "transparent",
                                outline: "none",
                                color: "white",
                                fontSize: "20px",
                                border: "none",
                            }}
                        />
                        <IconButton type="submit" sx={{ ml: "auto", color: "white" }}>
                            <IoMdSend />
                        </IconButton>
                    </div>
                </form>
            </Box>
        </Box>
    );
};

export default Chat;
