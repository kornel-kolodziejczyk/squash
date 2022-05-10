import React, { useState } from "react";

// Classes
import classes from "./ResetPassword.module.css";

// Components
import Button from "../../_UI/Button/Button";
import Card from "../../_layout/Card/Card";
import LoadingBox from "../../_UI/LoadingBox/LoadingBox";
import MessageBox from "../../_UI/MessageBox/MessageBox";

// Redux
import { RESET_PASSWORD_RESET } from "../../../store/actionTypes/authActionTypes";
import { resetPasswordAction } from "../../../store/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../_UI/Header/Header";

const ResetPassword = (props) => {
  const dispatch = useDispatch();

  // Component State
  const [password, setPassword] = useState("");

  // Redux State
  const resetPassword = useSelector((state) => state.resetPassword);

  // Handlers
  const resetHandler = () => dispatch({ type: RESET_PASSWORD_RESET });

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(resetPasswordAction(props.location.pathname.split("/").pop(), password));
  };

  return (
    <>
      <LoadingBox loading={resetPassword.loading} />
      <MessageBox message={resetPassword.error} title={"Resetowanie hasła"} onClick={resetHandler} />
      <MessageBox message={resetPassword.data} title={"Resetowanie hasła"} onClick={resetHandler} />
      <Card>
        <div className={classes.resetPassword}>
          <form className={classes.resetPassword__form} onSubmit={submitHandler}>
            <Header>Ustawianie nowego hasła</Header>
            <input type="password" placeholder="Nowe hasło" required onChange={(e) => setPassword(e.target.value)}></input>
            <Button type="submit">Zmień hasło</Button>
          </form>
        </div>
      </Card>
    </>
  );
};

export default ResetPassword;
