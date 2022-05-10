import React from "react";

// Classes
import classes from "./Button.module.css";

const Button = (props) => (
  <button type={props.type || "button"} className={classes.button} disabled={props.disabled} onClick={props.onClick}>
    {props.children}
  </button>
);
export default Button;
