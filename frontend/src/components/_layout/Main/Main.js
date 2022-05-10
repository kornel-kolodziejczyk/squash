import Container from "../../_UI/Container/Container";
import React from "react";
import classes from "./Main.module.css";

const Main = (props) => (
  <Container>
    <div className={classes.main}>{props.children}</div>
  </Container>
);

export default Main;
