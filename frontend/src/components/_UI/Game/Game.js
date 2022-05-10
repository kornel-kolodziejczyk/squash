import { Link } from "react-router-dom";
import React from "react";

// Classes
import classes from "./Game.module.css";

// Icons
import { TiEdit } from "react-icons/ti";

// Redux
import { useSelector } from "react-redux";

const Game = (props) => {
  // Redux State
  const userInfo = useSelector((state) => state.signin.data);
  const isEditable = props.game.index && userInfo && (userInfo.isAdmin || props.game.users.some((user) => user._id === userInfo._id)) ? true : false;

  return (
    <div className={classes.game}>
      <div>
        <div className={[classes.game__cell, ...(props.game.index % 2 ? [] : [classes["game__cell--dark"]])].join(" ")}>
          {props.game.index || "-"}
          {isEditable && (
            <Link className={classes.game__link} to={`/groups/games/${props.game._id}/update`}>
              <TiEdit />
            </Link>
          )}
        </div>
      </div>

      <div className={classes.game__users}>
        {props.game.users.map((user) => (
          <div key={user._id} className={[classes.game__cell, ...(props.game.index % 2 ? [] : [classes["game__cell--dark"]])].join(" ")}>
            <span className={classes.game__item}>{user.name}</span>
          </div>
        ))}
      </div>

      {props.game.unmatched ? (
        <div className={classes.game__unmatched}>
          <div className={[classes.game__cell, ...(props.game.index % 2 ? [] : [classes["game__cell--dark"]])].join(" ")}>
            <span className={classes.game__item}>NIEROZEGRANY</span>
          </div>
        </div>
      ) : props.game.walkowers?.includes(true) ? (
        <div className={classes.game__walkowers}>
          <div className={[classes.game__cell, ...(props.game.index % 2 ? [] : [classes["game__cell--dark"]])].join(" ")}>
            <span className={classes.game__item}>{props.game.walkowers[0] ? "WALKOWER" : "-"}</span>
          </div>
          <div className={[classes.game__cell, ...(props.game.index % 2 ? [] : [classes["game__cell--dark"]])].join(" ")}>
            <span className={classes.game__item}>{props.game.walkowers[1] ? "WALKOWER" : "-"}</span>
          </div>
        </div>
      ) : (
        <div className={classes.game__sets}>
          {props.game.sets.map((set, index) =>
            props.edit ? (
              <input
                key={index}
                className={[classes.game__item, ...(props.game.index % 2 ? [] : [classes["game__cell--dark"]])].join(" ")}
                placeholder="-"
                type="number"
                value={set === null ? "" : set}
                onChange={(e) => props.onSetChange(e.target.value, index)}
              />
            ) : (
              <div key={index} className={[classes.game__cell, ...(props.game.index % 2 ? [] : [classes["game__cell--dark"]])].join(" ")}>
                <span className={classes.game__item}>{set}</span>
              </div>
            )
          )}
        </div>
      )}
      <div className={classes.game__scores}>
        {props.game.scores.map((score, index) => (
          <div key={index} className={[classes.game__cell, ...(props.game.index % 2 ? [] : [classes["game__cell--dark"]])].join(" ")}>
            <span className={classes.game__item}>{score}</span>
          </div>
        ))}
      </div>
      <div className={classes.game__points}>
        {props.game.points.map((point, index) => (
          <div key={index} className={[classes.game__cell, ...(props.game.index % 2 ? [] : [classes["game__cell--dark"]])].join(" ")}>
            <span className={classes.game__item}>{point}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game;
