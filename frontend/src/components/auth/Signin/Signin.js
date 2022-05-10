import React, { useEffect, useState } from "react";

// Classes
import classes from "./Signin.module.css";

// Components
import Button from "../../_UI/Button/Button";
import Card from "../../_layout/Card/Card";
import Header from "../../_UI/Header/Header";
import LoadingBox from "../../_UI/LoadingBox/LoadingBox";
import MessageBox from "../../_UI/MessageBox/MessageBox";

// Redux
import { Link } from "react-router-dom";
import { SIGNIN_RESET } from "../../../store/actionTypes/authActionTypes";
import { signinAction } from "../../../store/actions/authActions";
import { useDispatch, useSelector } from "react-redux";

const Signin = (props) => {
  const dispatch = useDispatch();
  const redirect = props.location.search ? props.location.search.split("=")[1] : "/";

  // Component State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redux
  const signin = useSelector((state) => state.signin);

  // Handlers
  const resetErrorHandler = () => dispatch({ type: SIGNIN_RESET });
  const setEmailHandler = (e) => setEmail(e.target.value);
  const setPasswordHandler = (e) => setPassword(e.target.value);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signinAction(email, password));
  };

  useEffect(() => {
    if (signin.data) {
      props.history.push(redirect);
    }
  }, [signin.data, props.history, redirect]);

  return (
    <>
      <LoadingBox loading={signin.loading} />
      <MessageBox message={signin.error} title={"Logowanie"} onClick={resetErrorHandler} />
      <Card>
        <div className={classes.signin}>
          <form className={classes.signin__form} onSubmit={submitHandler}>
            <Header>Logowanie</Header>
            <input type="email" placeholder="Adres e-mail" required onChange={setEmailHandler}></input>
            <input type="password" placeholder="Hasło" required onChange={setPasswordHandler}></input>
            <Link className={classes.signin__forget} to="/forget-password">
              Przypomnij hasło
            </Link>
            <Button type="submit">Zaloguj się</Button>
          </form>
        </div>
      </Card>
    </>
  );
};

export default Signin;
