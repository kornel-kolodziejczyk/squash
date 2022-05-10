import React from "react";

// Classes
import classes from "./Header.module.css";

const Header = (props) => <div className={classes.header}>{props.children}</div>;

export default Header;
