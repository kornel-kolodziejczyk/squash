import React, { useState } from "react";

// Classes
import classes from "./UserCreate.module.css";

// Components
import Card from "../../_layout/Card/Card";
import Button from "../../_UI/Button/Button";
import Header from "../../_UI/Header/Header";
import LoadingBox from "../../_UI/LoadingBox/LoadingBox";
import MessageBox from "../../_UI/MessageBox/MessageBox";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { userCreateAction } from "../../../store/actions/userActions";
import { USER_CREATE_RESET } from "../../../store/actionTypes/userActionTypes";

const UserCreate = (props) => {
  const dispatch = useDispatch();

  // component State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Redux
  const userCreate = useSelector((state) => state.userCreate);

  // Handlers
  const redirectHandler = () => {
    resetErrorHandler();
    props.history.push("/users");
  };

  const resetErrorHandler = () => dispatch({ type: USER_CREATE_RESET });

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userCreateAction({ name, email, phone }));
  };

  return (
    <>
      <LoadingBox loading={userCreate.loading} />
      <MessageBox message={userCreate.error} title={"Dodawanie użytkownika"} onClick={resetErrorHandler} />
      <MessageBox message={userCreate.data} title={"Dodawanie użytkownika"} onClick={redirectHandler} />
      <Card>
        <div className={classes.userCreate}>
          <Header>Dodawanie użytkownika</Header>
          <form className={classes.userCreate__form} onSubmit={submitHandler}>
            <input type="text" required placeholder="Imię i nazwisko" onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Adres e-mail" onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder="Numer telefonu" onChange={(e) => setPhone(e.target.value)} />
            <Button type="submit">Dodaj użytkownika</Button>
          </form>
        </div>
      </Card>
    </>
  );
};

export default UserCreate;
