import React from "react";
import { Link } from "react-router-dom";

import classes from "./NavigationLink.module.css";

const NavigationLink = ({ to, bg, text, textColor, onClick }) => {
    return (
        <Link className={classes.navlink} to={to} style={{ background: bg, color: textColor }}>
            {text}
        </Link>
    );
};

export default NavigationLink;
