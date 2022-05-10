import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import React, { useState } from "react";

// Classes
import classes from "./UserPanel.module.css";

// Components
import Backdrop from "../../_UI/Backdrop/Backdrop";

// Icons
import { GiHamburgerMenu } from "react-icons/gi";
import { RiLoginBoxLine } from "react-icons/ri";

// Redux
import { signoutAction } from "../../../store/actions/authActions";
import { useDispatch, useSelector } from "react-redux";

const UserPanel = () => {
  const dispatch = useDispatch();

  // Component State
  const [isMenuVisible, setIsMenuVisible] = useState(false);


  // Redux State
  const userInfo = useSelector((state) => state.signin.data);

  // Handlers
  const setIsMenuVisibleHandler = () => {
    setIsMenuVisible((state) => !state);
  };
  const signoutHandler = () => dispatch(signoutAction());

  return (
    <div className={classes.userPanel}>
      {userInfo ? (
        <div className={classes.userPanel__dropdown}>
          <div className={classes.userPanel__icon} onClick={setIsMenuVisibleHandler}>
            <GiHamburgerMenu />
          </div>
          {isMenuVisible && (
            <div className={classes.userPanel__content} onClick={setIsMenuVisibleHandler}>
              {createPortal(<Backdrop onCancel={setIsMenuVisibleHandler} />, document.getElementById("backdrop-root"))}
              <Link className={classes.userPanel__link} to="/profile">
                Profil
              </Link>
              <Link className={classes.userPanel__link} to="/users">
                Ligowcy
              </Link>

              {userInfo?.isAdmin && (
                <div className={classes.userPanel__adminContent}>
                  <Link className={classes.userPanel__link} to="/users/create">
                    Dodaj użytkownika
                  </Link>
                  <Link className={classes.userPanel__link} to="/articles/create">
                    Dodaj artykuł
                  </Link>
                  <Link className={classes.userPanel__link} to="/groups/create">
                    Stwórz grupę
                  </Link>
                  <Link className={classes.userPanel__link} to="/tournaments/create">
                    Stwórz turniej
                  </Link>
                </div>
              )}

              <Link className={classes.userPanel__link} to="#" onClick={signoutHandler}>
                Wyloguj
              </Link>
            </div>
          )}
        </div>
      ) : (
        <Link className={classes.userPanel__icon} to="/signin">
          <RiLoginBoxLine />
        </Link>
      )}
    </div>
  );
};

export default UserPanel;
