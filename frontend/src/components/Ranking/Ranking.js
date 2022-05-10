import React, { useCallback, useEffect, useState } from "react";

// Classes
import classes from "./Ranking.module.css";

// Components
import Card from "../_layout/Card/Card";
import LoadingBox from "../_UI/LoadingBox/LoadingBox";
import MessageBox from "../_UI/MessageBox/MessageBox";
import Table from "../_UI/Table/Table";

// icons
import { FaSort } from "react-icons/fa";

// Redux
import { RANKING_LIST_RESET } from "../../store/actionTypes/rankingActionTypes";
import { rankingListAction } from "../../store/actions/rankingActions";
import { useDispatch, useSelector } from "react-redux";

const Ranking = () => {
  const dispatch = useDispatch();

  // Component State
  const [season, setSeason] = useState("");
  const [users, setUsers] = useState("");

  // Redux
  const rankingList = useSelector((state) => state.rankingList);

  // Handlers
  const resetRankingListHandler = useCallback(() => dispatch({ type: RANKING_LIST_RESET }), [dispatch]);
  const setSeasonHandler = (e) => setSeason(e.target.value);
  const sortByGroupPoints = () => setUsers(Object.values(rankingList.data.users).sort((a, b) => b.groupPoints - a.groupPoints));
  const sortByPoints = () => setUsers(Object.values(rankingList.data.users).sort((a, b) => b.points - a.points));
  const sortByTournamentPoints = () => setUsers(Object.values(rankingList.data.users).sort((a, b) => b.tournamentPoints - a.tournamentPoints));

  useEffect(() => {
    dispatch(rankingListAction(season));
    return resetRankingListHandler;
  }, [dispatch, season, resetRankingListHandler]);

  useEffect(() => {
    if (rankingList.data?.users) {
      setUsers(rankingList.data.users);
    }
  }, [rankingList]);

  return (
    <>
      <LoadingBox loading={rankingList.loading} />
      <MessageBox message={rankingList.error} title={"Wczytywanie rankingu"} onClick={resetRankingListHandler} />
      {rankingList.data && (
        <Card>
          <div className={classes.rankingList}>
            {rankingList.data.users ? (
              <>
                <select className={classes.rankingList__select} value={rankingList.data.season} onChange={setSeasonHandler}>
                  {rankingList.data.seasons.map((season) => (
                    <option key={season}>{season}</option>
                  ))}
                </select>
                {Object.values(users).length ? (
                  <Table
                    styles={{ gridTemplateColumns: "1fr 5fr 2fr 2.5fr 2fr" }}
                    header={[
                      "#",
                      "Imię i nazwisko",
                      <span className={classes.rankingList__sortable} onClick={sortByGroupPoints}>
                        Liga
                        <FaSort className={classes.rankingList__sortIcon} />
                      </span>,
                      <span className={classes.rankingList__sortable} onClick={sortByTournamentPoints}>
                        Turnieje
                        <FaSort className={classes.rankingList__sortIcon} />
                      </span>,
                      <span className={classes.rankingList__sortable} onClick={sortByPoints}>
                        Suma
                        <FaSort className={classes.rankingList__sortIcon} />
                      </span>,
                    ]}
                    body={Object.values(users).map((user, index) => [index + 1, user.name, user.groupPoints, user.tournamentPoints, user.points])}
                  />
                ) : (
                  <div className={classes.rankingList__info}>Niekompletne dane turniejowe.</div>
                )}
              </>
            ) : (
              <div>{rankingList.data}</div>
            )}
          </div>
        </Card>
      )}
    </>
  );
};

export default Ranking;
