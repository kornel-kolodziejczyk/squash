import React, { useCallback, useEffect } from "react";

// Classes
import classes from "./UserList.module.css";

// Components
import Button from "../../_UI/Button/Button";
import Card from "../../_layout/Card/Card";
import LoadingBox from "../../_UI/LoadingBox/LoadingBox";
import MessageBox from "../../_UI/MessageBox/MessageBox";
import Table from "../../_UI/Table/Table";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { USER_LIST_RESET } from "../../../store/actionTypes/userActionTypes";
import { userListAction } from "../../../store/actions/userActions";

const UserList = (props) => {
  const dispatch = useDispatch();

  // Redux
  const userList = useSelector((state) => state.userList);
  const userInfo = useSelector((state) => state.signin.data);
  
  // Handlers
  const buttonClickHandler = (userId) => props.history.push(`/users/${userId}/update`);
  const resetUserListHandler = useCallback(() => dispatch({ type: USER_LIST_RESET }), [dispatch]);

  useEffect(() => {
    dispatch(userListAction());
    return resetUserListHandler;
  }, [dispatch, resetUserListHandler]);

  return (
    <>
      <LoadingBox loading={userList.loading} />
      <MessageBox message={userList.error} title={"Wczytywanie użytkowników"} onClick={resetUserListHandler} />
      {userList.data && (
        <Card>
          <div className={classes.userList}>
            <Table
              styles={{ gridTemplateColumns: `0.5fr 2.5fr 2fr${userInfo.isAdmin ? " 2fr 1fr" : ""}` }}
              header={["#", "Imię i nazwisko", "Numer telefonu", ...(userInfo.isAdmin ? ["Adres e-mail", "Akcja"] : [])]}
              body={userList.data.map((user, index) => [
                index + 1,
                user.name,
                <a href={`tel:${user.phone}`}>{user.phone}</a>,
                ...(userInfo.isAdmin ? [user.email, <Button onClick={() => buttonClickHandler(user._id)}>Edycja</Button>] : []),
              ])}
            />
          </div>
        </Card>
      )}
    </>
  );
};

export default UserList;
