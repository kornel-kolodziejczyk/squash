import React, { useCallback, useEffect, useState } from "react";

// Classes
import classes from "./TournamentUpdate.module.css";

// Redux
import { TOURNAMENT_DETAILS_RESET, TOURNAMENT_UPDATE_RESET } from "../../../store/actionTypes/tournamentActionTypes";
import { tournamentDetailsAction, tournamentUpdateAction } from "../../../store/actions/tournamentActions";
import { useDispatch, useSelector } from "react-redux";

// Component
import Button from "../../_UI/Button/Button";
import Card from "../../_layout/Card/Card";
import LoadingBox from "../../_UI/LoadingBox/LoadingBox";
import MessageBox from "../../_UI/MessageBox/MessageBox";
import Table from "../../_UI/Table/Table";

const TournamentUpdate = (props) => {
  const dispatch = useDispatch();
  const id = props.match.params.id;

  // Component State
  const [date, setDate] = useState("");
  const [isRanking, setIsRanking] = useState("");
  const [name, setName] = useState("");
  const [pdf, setPdf] = useState("");
  const [season, setSeason] = useState("");
  const [users, setUsers] = useState([]);

  // Redux State
  const tournamentDetails = useSelector((state) => state.tournamentDetails);
  const tournamentUpdate = useSelector((state) => state.tournamentUpdate);

  // Handlers
  const changeUserHandler = (e, index) => {
    const newIndex = users.findIndex((user) => user._id === e.target.value);

    setUsers((state) => {
      const newState = [...state];
      [newState[index], newState[newIndex]] = [newState[newIndex], newState[index]];
      return newState;
    });
  };

  const resetTournamentUpdateHandler = () => dispatch({ type: TOURNAMENT_UPDATE_RESET });
  const resetTournamentDetailsHandler = useCallback(() => dispatch({ type: TOURNAMENT_DETAILS_RESET }), [dispatch]);
  const setDateHandler = (e) => setDate(e.target.value);
  const setIsRankingHandler = (e) => setIsRanking(e.target.value);
  const setNameHandler = (e) => setName(e.target.value);

  const setPdfHandler = (e) => {
    if (e.target.files && e.target.files.length === 1) {
      const reader = new FileReader();
      reader.onloadend = () => setPdf(e.target.files[0]);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const setSeasonHandler = (e) => setSeason(e.target.value);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(tournamentUpdateAction({ date, id, isRanking, name, pdf, season, users }));
  };

  const redirectHandler = () => {
    resetTournamentUpdateHandler();
    props.history.push({ pathname: "/tournaments", state: { season, name } });
  };

  useEffect(() => {
    dispatch(tournamentDetailsAction(id));
    return resetTournamentDetailsHandler;
  }, [dispatch, id, resetTournamentDetailsHandler]);

  useEffect(() => {
    if (tournamentDetails.data) {
      setDate(tournamentDetails.data.date.substring(0, 10));
      setIsRanking(tournamentDetails.data.isRanking);
      setName(tournamentDetails.data.name);
      setSeason(tournamentDetails.data.season);
      setUsers(tournamentDetails.data.table);
    }
  }, [dispatch, tournamentDetails]);

  return (
    <>
      <LoadingBox loading={tournamentDetails.loading} />
      <MessageBox message={tournamentDetails.error} title={"Wczytywanie turnieju"} onClick={resetTournamentDetailsHandler} />
      <MessageBox message={tournamentUpdate.error} title={"Aktualizowanie turnieju"} onClick={resetTournamentUpdateHandler} />
      <MessageBox message={tournamentUpdate.data} title={"Aktualizowanie turnieju"} onClick={redirectHandler} />
      {tournamentDetails.data && (
        <Card>
          <div className={classes.tournamentUpdate}>
            <Table
              styles={{ gridTemplateColumns: "1fr 5fr 2fr" }}
              header={["#", "Imię i nazwisko", "Punkty"]}
              body={users.map((user, index) => [
                index + 1,
                <select value={user._id} onChange={(e) => changeUserHandler(e, index)}>
                  {tournamentDetails.data.table.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.user.name}
                    </option>
                  ))}
                </select>,
                user.points || "-",
              ])}
            ></Table>
            <form className={classes.tournamentUpdate__form} onSubmit={submitHandler}>
              <input type="text" value={season} required placeholder="Sezon" onChange={setSeasonHandler} />
              <input type="text" value={name} required placeholder="Nazwa turnieju" onChange={setNameHandler} />
              <input type="date" value={date} required onChange={setDateHandler} />
              <input type="file" accept=".pdf" onChange={setPdfHandler} />
              <select value={isRanking} onChange={setIsRankingHandler}>
                <option value={true}>Rankingowy</option>
                <option value={false}>Nierankingowy</option>
              </select>
              <Button type="submit">Zapisz zmiany</Button>
            </form>
          </div>
        </Card>
      )}
    </>
  );
};

export default TournamentUpdate;
