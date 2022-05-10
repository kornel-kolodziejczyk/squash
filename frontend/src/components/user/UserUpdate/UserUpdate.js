import React, { useCallback, useEffect, useState } from "react";

// Classes
import classes from "./UserUpdate.module.css";

// Components
import Button from "../../_UI/Button/Button";
import Card from "../../_layout/Card/Card";
import Header from "../../_UI/Header/Header";
import LoadingBox from "../../_UI/LoadingBox/LoadingBox";
import MessageBox from "../../_UI/MessageBox/MessageBox";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { USER_DETAILS_RESET, USER_UPDATE_RESET } from "../../../store/actionTypes/userActionTypes";
import { userDetailsAction, userUpdateAction } from "../../../store/actions/userActions";

const UserUpdate = (props) => {
  const dispatch = useDispatch();
  const id = props.match.params.id;

  // Component State
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // Redux
  const userDetails = useSelector((state) => state.userDetails);
  const userUpdate = useSelector((state) => state.userUpdate);

  // Handlers
  const redirectHandler = () => {
    resetUserUpdateHandler();
    props.history.push("/users");
  };

  const resetUserDetailsHandler = useCallback(() => dispatch({ type: USER_DETAILS_RESET }), [dispatch]);
  const resetUserUpdateHandler = () => dispatch({ type: USER_UPDATE_RESET });
  const setEmailHandler = (e) => setEmail(e.target.value);
  const setPhoneHandler = (e) => setPhone(e.target.value);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userUpdateAction({ id, phone, email }));
  };

  useEffect(() => {
    dispatch(userDetailsAction(id));
    return resetUserDetailsHandler;
  }, [dispatch, id, resetUserDetailsHandler]);

  useEffect(() => {
    if (userDetails.data) {
      setPhone(userDetails.data.phone || "");
      setEmail(userDetails.data.email || "");
    }
  }, [userDetails]);

  return (
    <>
      <LoadingBox loading={userDetails.loading || userUpdate.loading} />
      <MessageBox message={userDetails.error} title={"Wczytywanie użytkownika"} onClick={resetUserDetailsHandler} />
      <MessageBox message={userUpdate.error} title={"Aktualizowanie użytkownika"} onClick={resetUserUpdateHandler} />
      <MessageBox message={userUpdate.data} title={"Aktualizowanie użytkownika"} onClick={redirectHandler} />
      {userDetails.data && (
        <Card>
          <div className={classes.userUpdate}>
            <Header>Edycja użytkownika</Header>
            <form className={classes.userUpdate__form} onSubmit={submitHandler}>
              <input type="text" disabled value={userDetails.data.name} />
              <input type="text" value={phone} required placeholder="Numer telefonu" onChange={setPhoneHandler} />
              <input type="email" value={email} required placeholder="Adres e-mail" onChange={setEmailHandler} />
              <Button type="submit">Zapisz zmiany</Button>
            </form>
          </div>
        </Card>
      )}
    </>
  );
};

export default UserUpdate;
