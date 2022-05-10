import React from "react";

// Classes
import classes from "./Overlay.module.css";

const Overlay = (props) => <div className={classes.overlay}>{props.children}</div>;

export default Overlay;
