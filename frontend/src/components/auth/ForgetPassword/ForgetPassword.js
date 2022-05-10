import React, { useState } from "react";

// Classes
import classes from "./ForgetPassword.module.css";

// Components
import Button from "../../_UI/Button/Button";
import Card from "../../_layout/Card/Card";
import Header from "../../_UI/Header/Header";
import LoadingBox from "../../_UI/LoadingBox/LoadingBox";
import MessageBox from "../../_UI/MessageBox/MessageBox";

// Redux
import { FORGET_PASSWORD_RESET } from "../../../store/actionTypes/authActionTypes";
import { forgetPasswordAction } from "../../../store/actions/authActions";
import { useDispatch, useSelector } from "react-redux";

const ForgetPassword = () => {
  const dispatch = useDispatch();

  // Component State
  const [email, setEmail] = useState("");

  // Redux State
  const forgetPassword = useSelector((state) => state.forgetPassword);

  // Handlers
  const resetHandler = () => dispatch({ type: FORGET_PASSWORD_RESET });
  const setEmailHandler = (e) => setEmail(e.target.value);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(forgetPasswordAction(email));
  };

  return (
    <>
      <LoadingBox loading={forgetPassword.loading} />
      <MessageBox message={forgetPassword.error} title={"Przypominanie hasła"} onClick={resetHandler} />
      <MessageBox message={forgetPassword.data} title={"Przypominanie hasła"} onClick={resetHandler} />
      <Card>
        <div className={classes.forgetPassword}>
          <form className={classes.forgetPassword__form} onSubmit={submitHandler}>
            <Header>Przypominanie hasła</Header>
            <input type="email" placeholder="Adres e-mail" required onChange={setEmailHandler}></input>
            <Button type="submit">Przypomnij hasło</Button>
          </form>
        </div>
      </Card>
    </>
  );
};

export default ForgetPassword;
