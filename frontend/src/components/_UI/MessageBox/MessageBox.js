import { createPortal } from "react-dom";
import React from "react";

// Classes
import classes from "./MessageBox.module.css";

// Components
import Button from "../Button/Button";
import Overlay from "../Overlay/Overlay";

const MessageBox = (props) =>
  props.message ? (
    <>
      {createPortal(
        <Overlay>
          <div className={classes.messageBox}>
            <div className={classes.messageBox__header}>{props.title}</div>
            <div className={classes.messageBox__content}>
              <div className={classes.messageBox__message}>{props.message}</div>
              <div className={classes.messageBox__buttons}>
                <Button onClick={props.onClick}>OK</Button>
              </div>
            </div>
          </div>
        </Overlay>,
        document.getElementById("overlay-root")
      )}
    </>
  ) : null;

export default MessageBox;
