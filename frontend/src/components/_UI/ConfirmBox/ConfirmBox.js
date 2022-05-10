import { createPortal } from "react-dom";
import React from "react";

// Classes
import classes from "./ConfirmBox.module.css";

// Components
import Button from "../Button/Button";
import Overlay from "../Overlay/Overlay";

const ConfirmBox = (props) =>
  props.message ? (
    <>
      {createPortal(
        <Overlay>
          <div className={classes.confirmBox}>
            <div className={classes.confirmBox__header}>{props.title}</div>
            <div className={classes.confirmBox__content}>
              <div className={classes.confirmBox__message}>{props.message}</div>
              <div className={classes.confirmBox__buttons}>
                <Button onClick={props.onConfirm}>OK</Button>
                <Button onClick={props.onCancel}>Anuluj</Button>
              </div>
            </div>
          </div>
        </Overlay>,
        document.getElementById("overlay-root")
      )}
    </>
  ) : null;

export default ConfirmBox;
