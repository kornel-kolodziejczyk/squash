import React, { useCallback, useEffect, useState } from "react";

// Classes
import classes from "./TournamentCreate.module.css";

// Components
import Button from "../../_UI/Button/Button";
import Card from "../../_layout/Card/Card";
import Header from "../../_UI/Header/Header";
import LoadingBox from "../../_UI/LoadingBox/LoadingBox";
import MessageBox from "../../_UI/MessageBox/MessageBox";
import Users from "../../_UI/Users/Users";

// Redux
import { TOURNAMENT_CREATE_RESET } from "../../../store/actionTypes/tournamentActionTypes";
import { tournamentCreateAction } from "../../../store/actions/tournamentActions";
import { useDispatch, useSelector } from "react-redux";
import { USER_LIST_RESET } from "../../../store/actionTypes/userActionTypes";
import { userListAction } from "../../../store/actions/userActions";

const TournamentCreate = (props) => {
  const dispatch = useDispatch();

  // Component State
  const [season, setSeason] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [isRanking, setIsRanking] = useState(true);
  const [users, setUsers] = useState([]);

  // Redux State
  const tournamentCreate = useSelector((state) => state.tournamentCreate);
  const userList = useSelector((state) => state.userList);

  // Handlers
  const resetTournamentCreateHandler = useCallback(() => dispatch({ type: TOURNAMENT_CREATE_RESET }), [dispatch]);
  const resetUserListHandler = useCallback(() => dispatch({ type: USER_LIST_RESET }), [dispatch]);

  const addTournamentHandler = (e) => {
    e.preventDefault();
    dispatch(tournamentCreateAction({ season, name, date, isRanking, users }));
  };

  const tournamentCreatedHandler = () => {
    resetTournamentCreateHandler();
    props.history.push({ pathname: "/tournaments", state: { season, name } });
  };

  const addUserHandler = (userToAdd) => {
    if (!users.some((user) => user._id === userToAdd.current.value)) {
      setUsers((state) => [...state, userList.data[userToAdd.current.selectedIndex]]);
    }
  };

  const removeUserHandler = (userToRemove) => {
    setUsers((state) => state.filter((user) => user._id !== userToRemove._id));
  };

  const setSeasonHandler = (e) => setSeason(e.target.value);
  const setNameHandler = (e) => setName(e.target.value);
  const setDateHandler = (e) => setDate(e.target.value);
  const setIsRankingHandler = (e) => setIsRanking(e.target.value);

  useEffect(() => {
    dispatch(userListAction());
    return resetUserListHandler;
  }, [dispatch, resetUserListHandler]);

  return (
    <>
      <LoadingBox loading={tournamentCreate.loading || userList.loading} />
      <MessageBox message={userList.error} title={"Wczytywanie użytkowników"} onClick={resetUserListHandler} />
      <MessageBox message={tournamentCreate.error} title={"Dodawanie turnieju"} onClick={resetTournamentCreateHandler} />
      <MessageBox message={tournamentCreate.data} title={"Dodawanie turnieju"} onClick={tournamentCreatedHandler} />
      {userList.data && (
        <Card>
          <div className={classes.tournamentCreate}>
            <Header>Tworzenie turnieju</Header>
            <Users userList={userList.data} users={users} addUser={addUserHandler} removeUser={removeUserHandler} />
            <form className={classes.tournamentCreate__form} onSubmit={addTournamentHandler}>
              <input type="text" required placeholder="Nazwa sezonu" onChange={setSeasonHandler} />
              <input type="text" required placeholder="Nazwa turnieju" onChange={setNameHandler} />
              <input type="date" required onChange={setDateHandler} />
              <select value={isRanking} onChange={setIsRankingHandler}>
                <option value={true}>Rankingowy</option>
                <option value={false}>Nierankingowy</option>
              </select>
              <Button type="submit">Dodaj turniej</Button>
            </form>
          </div>
        </Card>
      )}
    </>
  );
};

export default TournamentCreate;
