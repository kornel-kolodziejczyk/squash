import React from "react";

// Icons
import { FaSpinner } from "react-icons/fa";

// Classes
import classes from "./LoadingBox.module.css";

const LoadingBox = (props) =>
  props.loading ? (
    <div className={classes.loadingBox}>
      <div className={classes.loadingBox__spinner}>
        <FaSpinner />
      </div>
    </div>
  ) : null;

export default LoadingBox;
