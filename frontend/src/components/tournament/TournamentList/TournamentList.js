import React, { useCallback, useEffect, useState } from "react";

// Classes
import classes from "./TournamentList.module.css";

// Components
import Button from "../../_UI/Button/Button";
import Card from "../../_layout/Card/Card";
import ConfirmBox from "../../_UI/ConfirmBox/ConfirmBox";
import LoadingBox from "../../_UI/LoadingBox/LoadingBox";
import MessageBox from "../../_UI/MessageBox/MessageBox";
import Table from "../../_UI/Table/Table";

// Redux
import { TOURNAMENT_DELETE_RESET, TOURNAMENT_LIST_RESET } from "../../../store/actionTypes/tournamentActionTypes";
import { tournamentDeleteAction, tournamentListAction } from "../../../store/actions/tournamentActions";
import { useDispatch, useSelector } from "react-redux";

const TournamentList = (props) => {
  const dispatch = useDispatch();

  // Component State
  const [confirmMessage, setConfirmMessage] = useState(false);
  const [selectedData, setSelectedData] = useState(props.location.state || "");

  // Redux State
  const tournamentDelete = useSelector((state) => state.tournamentDelete);
  const tournamentList = useSelector((state) => state.tournamentList);
  const userInfo = useSelector((state) => state.signin.data);

  // Handlers
  const cancelHandler = () => setConfirmMessage(false);

  const confirmHandler = () => {
    setConfirmMessage(false);
    dispatch(tournamentDeleteAction(tournamentList.data._id));
  };
  const deleteTournamentHandler = () => setConfirmMessage(`Jesteś pewny, że chcesz usunąć turniej ${tournamentList.data.name}?`);

  const deletedTournamentHandler = () => {
    setSelectedData({});
    resetTournamentDeleteHandler();
  };

  const editTournamentHandler = () => props.history.push(`/tournaments/${tournamentList.data._id}/update`);

  const openLadderHandler = () => {
    const ladder = window.open(`/${tournamentList.data.png}`, "_blank");
    ladder.focus();
  };

  const resetTournamentDeleteHandler = () => dispatch({ type: TOURNAMENT_DELETE_RESET });
  const resetTournamentListHandler = useCallback(() => dispatch({ type: TOURNAMENT_LIST_RESET }), [dispatch]);

  useEffect(() => {
    dispatch(tournamentListAction(selectedData));
    return resetTournamentListHandler;
  }, [dispatch, selectedData, resetTournamentListHandler]);

  return (
    <>
      <LoadingBox loading={tournamentList.loading} />
      <MessageBox message={tournamentList.error} title={"Wczytywanie turnieju"} onClick={resetTournamentListHandler} />
      <MessageBox message={tournamentDelete.error} title={"Usuwanie turnieju"} onClick={resetTournamentDeleteHandler} />
      <MessageBox message={tournamentDelete.data} title={"Usuwanie turnieju"} onClick={deletedTournamentHandler} />
      <ConfirmBox message={confirmMessage} title={"Usuwanie turnieju"} onCancel={cancelHandler} onConfirm={confirmHandler} />
      {tournamentList.data && (
        <Card>
          <div className={classes.tournamentList}>
            {tournamentList.data.seasons ? (
              <>
                <div className={classes.tournamentList__selects}>
                  <select className={classes.tournamentList__select} value={tournamentList.data.season} onChange={(e) => setSelectedData({ season: e.target.value })}>
                    {tournamentList.data.seasons.map((season) => (
                      <option key={season}>{season}</option>
                    ))}
                  </select>
                  <select
                    className={classes.tournamentList__select}
                    value={tournamentList.data.name}
                    onChange={(e) => setSelectedData({ season: tournamentList.data.season, name: e.target.value })}
                  >
                    {tournamentList.data.names.map((name) => (
                      <option key={name}>{name}</option>
                    ))}
                  </select>
                </div>
                <Table
                  styles={{ gridTemplateColumns: "1fr 5fr 2fr" }}
                  header={["#", "Imię i nazwisko", "Punkty"]}
                  body={tournamentList.data.table.map((user, index) => [index + 1, user.user?.name || "-", user.points || "-"])}
                ></Table>
                <div className={classes.tournamentList__actions}>
                  {userInfo?.isAdmin && (
                    <>
                      <Button onClick={editTournamentHandler}>Edytuj</Button>
                      <Button onClick={deleteTournamentHandler}>Usuń</Button>
                    </>
                  )}
                  {tournamentList.data.png && <Button onClick={openLadderHandler}>Otwórz drabinkę turniejową</Button>}
                </div>
              </>
            ) : (
              <div>{tournamentList.data}</div>
            )}
          </div>
        </Card>
      )}
    </>
  );
};

export default TournamentList;
