import React from "react";

// Classes
import classes from "./Backdrop.module.css";

const Backdrop = (props) => {
  // Handlers
  const cancelHandler = () => props.onCancel;

  return <div className={classes.backdrop} onClick={cancelHandler}></div>;
};

export default Backdrop;
