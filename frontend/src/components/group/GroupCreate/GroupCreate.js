import React, { useCallback, useEffect, useState } from "react";

// Classes
import classes from "./GroupCreate.module.css";

// Components
import Button from "../../_UI/Button/Button";
import Card from "../../_layout/Card/Card";
import Header from "../../_UI/Header/Header";
import LoadingBox from "../../_UI/LoadingBox/LoadingBox";
import MessageBox from "../../_UI/MessageBox/MessageBox";
import Users from "../../_UI/Users/Users";

// Redux
import { GROUP_CREATE_RESET } from "../../../store/actionTypes/groupActionTypes";
import { groupCreateAction } from "../../../store/actions/groupActions";
import { useDispatch, useSelector } from "react-redux";
import { USER_LIST_RESET } from "../../../store/actionTypes/userActionTypes";
import { userListAction } from "../../../store/actions/userActions";

const GroupCreate = () => {
  const dispatch = useDispatch();

  // Component State
  const [endDate, setEndDate] = useState(new Date().toISOString().substring(0, 10));
  const [group, setGroup] = useState("");
  const [isRanking, setIsRanking] = useState(true);
  const [league, setLeague] = useState("");
  const [season, setSeason] = useState("");
  const [startDate, setStartDate] = useState(new Date().toISOString().substring(0, 10));
  const [users, setUsers] = useState([]);

  // Redux State
  const groupCreate = useSelector((state) => state.groupCreate);
  const userList = useSelector((state) => state.userList);

  // Handlers
  const addGroupHandler = (e) => {
    e.preventDefault();
    dispatch(groupCreateAction({ endDate, group, isRanking, league, season, startDate, users }));
  };

  const addUserHandler = (userToAdd) => {
    if (!users.some((user) => user._id === userToAdd.current.value)) {
      setUsers((state) => [...state, userList.data[userToAdd.current.selectedIndex]]);
    }
  };

  const removeUserHandler = (userToRemove) => setUsers((state) => state.filter((user) => user._id !== userToRemove._id));
  const resetGroupCreateHandler = () => dispatch({ type: GROUP_CREATE_RESET });
  const resetUserListHandler = useCallback(() => dispatch({ type: USER_LIST_RESET }), [dispatch]);
  const setEndDateHandler = (e) => setEndDate(e.target.value);
  const setGroupHandler = (e) => setGroup(e.target.value);
  const setIsRankingHandler = (e) => setIsRanking(e.target.value);
  const setLeagueHandler = (e) => setLeague(e.target.value);
  const setSeasonHandler = (e) => setSeason(e.target.value);
  const setStartDateHandler = (e) => setStartDate(e.target.value);

  useEffect(() => {
    dispatch(userListAction());
    return resetUserListHandler;
  }, [dispatch, resetUserListHandler]);

  return (
    <>
      <LoadingBox loading={userList.loading || groupCreate.loading}></LoadingBox>
      <MessageBox error={userList.error} title={"Wczytywanie użytkowników"} onClick={resetUserListHandler} />
      <MessageBox error={groupCreate.error} title={"Tworzenie grupy"} onClick={resetGroupCreateHandler} />
      <MessageBox error={groupCreate.data} title={"Tworzenie grupy"} onClick={resetGroupCreateHandler} />
      {userList.data && (
        <Card>
          <div className={classes.groupCreate}>
            <Header>Tworzenie grupy</Header>
            <Users userList={userList.data} users={users} addUser={addUserHandler} removeUser={removeUserHandler} />
            <form onSubmit={addGroupHandler} className={classes.groupCreate__form}>
              <input type="text" required placeholder="Nazwa sezonu" onChange={setSeasonHandler} />
              <input type="text" required placeholder="Nazwa ligi" onChange={setLeagueHandler} />
              <input type="text" required placeholder="Nazwa grupy" onChange={setGroupHandler} />
              <select value={isRanking} onChange={setIsRankingHandler}>
                <option value={true}>Rankingowa</option>
                <option value={false}>Nierankingowa</option>
              </select>
              <input type="date" value={startDate} required onChange={setStartDateHandler} />
              <input type="date" value={endDate} required onChange={setEndDateHandler} />
              <Button type="submit">Stwórz grupę</Button>
            </form>
          </div>
        </Card>
      )}
    </>
  );
};

export default GroupCreate;
