import React, { useContext } from "react";
import { Box, Avatar, Typography, Button, IconButton } from "@mui/material";
import { red } from "@mui/material/colors";
import { IoMdSend } from "react-icons/io";

import { AuthContext } from "../context/AuthContext";
import ChatItem from "../components/ChatItem";

const Chat = () => {
    const chatMessages = [
        { role: "User", content: "Hello, AI Assistant!" },
        { role: "Assistant", content: "Hi there! How can I assist you today?" },
        { role: "User", content: "I have a question about programming." },
        { role: "Assistant", content: "Sure, go ahead and ask. I'm here to help!" },
        { role: "User", content: "What programming languages do you support?" },
        {
            role: "Assistant",
            content:
                "I can assist with a wide range of programming languages, including JavaScript, Python, Java, and more.",
        },
        { role: "User", content: "That's great! How can I improve my coding skills?" },
        {
            role: "Assistant",
            content:
                "To improve your coding skills, practice regularly, work on projects, and seek feedback from others. Additionally, consider learning new technologies and exploring different areas of programming.",
        },
        { role: "User", content: "Which IDEs do you recommend for web development?" },
        {
            role: "Assistant",
            content:
                "Popular IDEs for web development include Visual Studio Code, Sublime Text, Atom, and JetBrains WebStorm. It depends on your preferences and the technologies you are using.",
        },
        {
            role: "User",
            content: "Thanks for the suggestions! Do you have any tips for efficient debugging?",
        },
        {
            role: "Assistant",
            content:
                "Absolutely! Use console.log statements, leverage breakpoints, and make use of browser developer tools. Additionally, consider using debugging features provided by your IDE.",
        },
        { role: "User", content: "How can I stay updated with the latest programming trends?" },
        {
            role: "Assistant",
            content:
                "Follow tech blogs, subscribe to newsletters, join online communities, and attend conferences or meetups. Also, keep an eye on popular repositories on platforms like GitHub.",
        },
        { role: "User", content: "What's your favorite programming language?" },
        {
            role: "Assistant",
            content:
                "I don't have personal preferences, but I can assist you with a variety of programming languages. What language are you interested in?",
        },
        {
            role: "User",
            content: "I'm interested in learning Python. Any resources you recommend?",
        },
        {
            role: "Assistant",
            content:
                "For Python, you can start with the official Python documentation, online tutorials, and interactive platforms like Codecademy or PyBites. Practice is key!",
        },
        { role: "User", content: "Great advice! How can I contribute to open source projects?" },
        {
            role: "Assistant",
            content:
                "Start by finding projects you're interested in on platforms like GitHub. Read their contribution guidelines, fix bugs, and gradually make larger contributions. It's a rewarding way to improve your skills!",
        },
    ];

    const context = useContext(AuthContext);

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
                        style={{
                            width: "100%",
                            backgroundColor: "transparent",
                            outline: "none",
                            color: "white",
                            fontSize: "20px",
                            border: "none",
                        }}
                    />
                    <IconButton sx={{ ml: "auto", color: "white" }}>
                        <IoMdSend />
                    </IconButton>
                </div>
            </Box>
        </Box>
    );
};

export default Chat;
