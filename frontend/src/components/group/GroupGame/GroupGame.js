import React, { useCallback, useEffect, useState } from "react";

// Classes
import classes from "./GroupGame.module.css";

// Components
import Button from "../../_UI/Button/Button";
import Game from "../../_UI/Game/Game";
import LoadingBox from "../../_UI/LoadingBox/LoadingBox";
import MessageBox from "../../_UI/MessageBox/MessageBox";
import Table from "../../_UI/Table/Table";

// Redux
import { GROUP_GAME_DETAILS_RESET, GROUP_GAME_UPDATE_RESET } from "../../../store/actionTypes/groupActionTypes";
import { groupGameDetailsAction, groupGameUpdateAction } from "../../../store/actions/groupActions";
import { useDispatch, useSelector } from "react-redux";

// Utils
import { countGame, validateGame } from "../../../utils";
import Card from "../../_layout/Card/Card";

const GroupGame = (props) => {
  const dispatch = useDispatch();
  const id = props.id || props.match.params.id;

  // Component State
  const [game, setGame] = useState();

  // Redux State
  const groupGameDetails = useSelector((state) => state.groupGameDetails);
  const groupGameUpdate = useSelector((state) => state.groupGameUpdate);

  // Handlers
  const changeSetHandler = (set, index) =>
    setGame((state) => {
      let sets = [...state.sets];
      sets[index] = set;
      return { ...state, sets, ...countGame(sets) };
    });

  const redirectHandler = () => {
    props.history.push({
      pathname: `/groups`,
      state: { season: groupGameDetails.data.group.season, league: groupGameDetails.data.group.league, group: groupGameDetails.data.group.group },
    });
    resetGameUpdateHandler();
  };

  const resetGameDetailsHandler = useCallback(() => dispatch({ type: GROUP_GAME_DETAILS_RESET }), [dispatch]);
  const resetGameHandler = () => {
    setGame((state) => {
      let sets = Array(10).fill(null);
      let scores = [null, null];
      let points = [null, null];
      let walkowers = [false, false];
      let unmatched = false;
      return { ...state, sets, scores, points, walkowers, unmatched };
    });
  };

  const resetGameUpdateHandler = () => dispatch({ type: GROUP_GAME_UPDATE_RESET });

  const setUnmatchedHandler = () => {
    setGame((state) => {
      let sets = Array(10).fill(null);
      let scores = [null, null];
      let points = [null, null];
      let walkowers = [false, false];
      let unmatched = true;
      return { ...state, sets, scores, points, walkowers, unmatched };
    });
  };

  const setWalkowerHandler = () => {
    setGame((state) => {
      let sets = Array(10).fill(null);
      let scores = [null, null];
      let points = state.points[0] === 5 ? [0, 5] : [5, 0];
      let walkowers = state.walkowers[0] ? [false, true] : [true, false];
      let unmatched = false;
      return { ...state, sets, scores, points, walkowers, unmatched };
    });
  };

  const updateHandler = () => {
    dispatch(groupGameUpdateAction(game));
  };

  useEffect(() => {
    dispatch(groupGameDetailsAction(id));
    return resetGameDetailsHandler;
  }, [dispatch, id, resetGameDetailsHandler]);

  useEffect(() => {
    if (groupGameDetails.data) {
      setGame(groupGameDetails.data);
    }
  }, [groupGameDetails]);

  return (
    <>
      <LoadingBox loading={groupGameDetails.loading} />
      <MessageBox message={groupGameDetails.error} title={"Wczytywanie meczu"} onClick={resetGameDetailsHandler} />
      <MessageBox message={groupGameUpdate.error} title={"Aktualizowanie meczu"} onClick={resetGameUpdateHandler} />
      <MessageBox message={groupGameUpdate.data} title={"Aktualizowanie meczu"} onClick={redirectHandler} />
      {groupGameDetails.data && game && (
        <Card>
          <div className={classes.groupGame}>
            <Table styles={{ gridTemplateColumns: "1fr 5fr 5fr 2fr 2fr" }} header={["#", "Imię i nazwisko", "Sety", "Wynik", "Punkty"]} />
            <div className={classes.groupGame__game}>
              <Game game={game} edit={true} onSetChange={(set, index) => changeSetHandler(set, index)} />
            </div>
            <div className={classes.groupGame__actions}>
              <Button onClick={setWalkowerHandler}>Walkower</Button>
              <Button onClick={setUnmatchedHandler}>Nierozegrany</Button>
              <Button onClick={resetGameHandler}>Reset</Button>
              <Button onClick={updateHandler} disabled={validateGame(game)}>
                Zapisz
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default GroupGame;
