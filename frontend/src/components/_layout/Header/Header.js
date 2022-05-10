import Container from "../../_UI/Container/Container";
import Logo from "../Logo/Logo";
import React from "react";
import UserPanel from "../UserPanel/UserPanel";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <div className={classes.header}>
      <Container>
        <div className={classes.header_content}>
          <Logo />
          <UserPanel />
        </div>
      </Container>
    </div>
  );
};

export default Header;
