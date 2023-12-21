import React from "react";
import { TextField } from "@mui/material";

const InputTextField = ({ name, type, label, error }) => {
    return (
        <TextField
            error={error ? "error" : ""}
            type={type}
            name={name}
            label={label}
            id={name}
            variant="outlined"
            margin="normal"
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{
                style: {
                    color: "white",
                    width: "400px",
                    borderRadius: 10,
                    fontSize: 20,
                    borderColor: "white",
                },
            }}
        />
    );
};

export default InputTextField;
