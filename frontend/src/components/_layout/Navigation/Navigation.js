import Container from "../../_UI/Container/Container";
import { NavLink } from "react-router-dom";
import React from "react";
import classes from "./Navigation.module.css";

const Navigation = () => {
  return (
    <div className={classes.navigation}>
      <Container>
        <div className={classes.navigation_content}>
          <NavLink to="/" exact activeClassName={classes.active}>
            AKTUALNOŚCI
          </NavLink>
          <NavLink to="/groups" activeClassName={classes.active}>
            LIGA
          </NavLink>
          <NavLink to="/tournaments" activeClassName={classes.active}>
            TURNIEJE
          </NavLink>
          <NavLink to="/rankings" activeClassName={classes.active}>
            RANKING
          </NavLink>
        </div>
      </Container>
    </div>
  );
};

export default Navigation;
