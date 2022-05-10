import React, { useEffect, useState } from "react";

// Classes
import classes from "./Profile.module.css";

// Components
import Button from "../../_UI/Button/Button";
import Card from "../../_layout/Card/Card";
import Header from "../../_UI/Header/Header";
import LoadingBox from "../../_UI/LoadingBox/LoadingBox";
import MessageBox from "../../_UI/MessageBox/MessageBox";

// Redux
import { PROFILE_UPDATE_RESET } from "../../../store/actionTypes/authActionTypes";
import { profileUpdateAction } from "../../../store/actions/authActions";
import { useDispatch, useSelector } from "react-redux";

const Profile = (props) => {
  const dispatch = useDispatch();

  // Component State
  const [alertMessage, setAlertMessage] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  // Redux
  const profileUpdate = useSelector((state) => state.profileUpdate);
  const userInfo = useSelector((state) => state.signin.data);

  // Handlers
  const resetAlertMessageHandler = () => setAlertMessage(false);
  const resetProfileUpdate = () => dispatch({ type: PROFILE_UPDATE_RESET });
  const setEmailHandler = (e) => setEmail(e.target.value);
  const setPasswordHandler = (e) => setPassword(e.target.value);
  const setConfirmPasswordHandler = (e) => setConfirmPassword(e.target.value);
  const setPhoneHandler = (e) => setPhone(e.target.value);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setAlertMessage("Wprowadzone hasła nie są identyczne");
    } else {
      dispatch(profileUpdateAction({ id: userInfo._id, email, password, phone }));
    }
  };

  useEffect(() => {
    setEmail(userInfo.email);
    if (userInfo.phone) {
      setPhone(userInfo.phone);
    }
  }, [dispatch, userInfo]);

  return (
    <>
      <LoadingBox loading={profileUpdate.loading} />
      <MessageBox message={profileUpdate.error} title={"Aktualizacja profilu"} onClick={resetProfileUpdate} />
      <MessageBox message={profileUpdate.data} title={"Aktualizacja profilu"} onClick={resetProfileUpdate} />
      <MessageBox message={alertMessage} title={"Aktualizacja profilu"} onClick={resetAlertMessageHandler} />
      <Card>
        <div className={classes.profile}>
          <form className={classes.profile__form} onSubmit={submitHandler}>
            <Header>Aktualizowanie profilu</Header>
            <input type="email" value={email} placeholder={"Email"} onChange={setEmailHandler}></input>
            <input type="password" value={password} placeholder={"Nowe hasło"} onChange={setPasswordHandler}></input>
            <input type="password" value={confirmPassword} placeholder={"Potwierdź nowe hasło"} onChange={setConfirmPasswordHandler}></input>
            <input type="text" value={phone} placeholder={"Numer telefonu"} onChange={setPhoneHandler}></input>
            <Button type="submit">Zaktualizuj</Button>
          </form>
        </div>
      </Card>
    </>
  );
};

export default Profile;
