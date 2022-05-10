import React, { useRef } from "react";

// Classes
import classes from "./Users.module.css";

// Components
import Button from "../Button/Button";

// Icons
import { FaWindowClose } from "react-icons/fa";

const Users = (props) => {
  const userToAdd = useRef();

  return (
    <div className={classes.users}>
      <form className={classes.users__form}>
        <select ref={userToAdd}>
          {props.userList.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>
        <Button onClick={() => props.addUser(userToAdd)}>
          Dodaj gracza
        </Button>
      </form>

      {props.users.length > 0 ? (
        <div className={classes.users__list}>
          {props.users.map((user) => (
            <div className={classes.users__user} key={user._id}>
              {user.name}
              <div className={classes.users__removeButton} onClick={() => props.removeUser(user)}>
                <FaWindowClose />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={classes.info}>Nie wybrano żadnego gracza.</div>
      )}
    </div>
  );
};

export default Users;
