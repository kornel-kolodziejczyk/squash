import { Link } from "react-router-dom";
import React from "react";

// Classes
import classes from "./Logo.module.css";

// Images
import logo from "../../../Images/logo.png";

const Logo = () => {
  return (
    <Link to="/" className={classes.logo}>
      <img className={classes.logo__image} src={logo} alt="Logo" />
    </Link>
  );
};

export default Logo;
