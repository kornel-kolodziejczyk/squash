import React from "react";

// Redux
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AdminRoute({ component: Component, ...rest }) {
  // Redux State
  const { data } = useSelector((state) => state.signin);

  return <Route {...rest} render={(props) => (data && data.isAdmin ? <Component {...props}></Component> : <Redirect to="/signin" />)}></Route>;
}
