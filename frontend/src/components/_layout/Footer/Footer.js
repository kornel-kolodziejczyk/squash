import Contact from "../Contact/Contact";
import Container from "../../_UI/Container/Container";
import { Link } from "react-router-dom";
import React from "react";
import classes from "./Footer.module.css";

// Classes

// Components

const Footer = () => {
  return (
    <div className={classes.footer}>
      <Container>
        <Contact />
        <div className={classes.footer__line}></div>
        <div className={classes.footer__copyright}>&copy; 2020 Kornel Kołodziejczyk</div>
        <div className={classes.footer__regulations}>
          <Link to="/regulations">Regulamin</Link>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
