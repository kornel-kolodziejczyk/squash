import React, { useCallback, useEffect, useRef, useState } from "react";

// Classes
import classes from "./GroupList.module.css";

// Components
import Button from "../../_UI/Button/Button";
import Card from "../../_layout/Card/Card";
import ConfirmBox from "../../_UI/ConfirmBox/ConfirmBox";
import Game from "../../_UI/Game/Game";
import LoadingBox from "../../_UI/LoadingBox/LoadingBox";
import MessageBox from "../../_UI/MessageBox/MessageBox";
import Table from "../../_UI/Table/Table";

// Libraries
import { useReactToPrint } from "react-to-print";

// Redux
import { GROUP_DELETE_RESET, GROUP_LIST_RESET } from "../../../store/actionTypes/groupActionTypes";
import { groupDeleteAction, groupListAction } from "../../../store/actions/groupActions";
import { useDispatch, useSelector } from "react-redux";

const GroupList = (props) => {
  const gamesRef = useRef();
  const dispatch = useDispatch();

  // Component State
  const [confirmMessage, setConfirmMessage] = useState(false);
  const [selectedData, setSelectedData] = useState(props.location.state || "");

  // Redux State
  const groupDelete = useSelector((state) => state.groupDelete);
  const groupList = useSelector((state) => state.groupList);
  const userInfo = useSelector((state) => state.signin.data);

  // Handlers
  const cancelHandler = () => setConfirmMessage(false);

  const confirmHandler = () => {
    setConfirmMessage(false);
    dispatch(groupDeleteAction(groupList.data._id));
  };

  const deleteGroupHandler = () => setConfirmMessage(`Jesteś pewny, że chcesz usunąć ${groupList.data.group}?`);

  const deletedGroupHandler = () => {
    setSelectedData({});
    resetGroupDeleteHandler();
  };

  const printHandler = useReactToPrint({ content: () => gamesRef.current });
  const resetGroupDeleteHandler = () => dispatch({ type: GROUP_DELETE_RESET });
  const resetGroupListHandler = useCallback(() => dispatch({ type: GROUP_LIST_RESET }), [dispatch]);

  useEffect(() => {
    dispatch(groupListAction(selectedData));
    return resetGroupListHandler;
  }, [dispatch, selectedData, resetGroupListHandler]);

  return (
    <>
      <LoadingBox loading={groupList.loading} />
      <MessageBox message={groupList.error} title="Wczytywanie grupy" onClick={resetGroupListHandler} />
      <MessageBox message={groupDelete.error} title={"Usuwanie grupy"} onClick={resetGroupDeleteHandler} />
      <MessageBox message={groupDelete.data} title={"Usuwanie grupy"} onClick={deletedGroupHandler} />
      <ConfirmBox message={confirmMessage} title={"Usuwanie grupy"} onCancel={cancelHandler} onConfirm={confirmHandler} />
      {groupList.data && (
        <Card>
          <div className={classes.groupList}>
            {groupList.data.seasons ? (
              <>
                <div className={classes.groupList__selects}>
                  <select className={classes.groupList__select} value={groupList.data.season} onChange={(e) => setSelectedData({ season: e.target.value })}>
                    {groupList.data.seasons.map((season) => (
                      <option key={season}>{season}</option>
                    ))}
                  </select>
                  <select
                    className={classes.groupList__select}
                    value={groupList.data.league}
                    onChange={(e) => setSelectedData({ season: groupList.data.season, league: e.target.value })}
                  >
                    {groupList.data.leagues.map((league) => (
                      <option key={league}>{league}</option>
                    ))}
                  </select>
                  <select
                    className={classes.groupList__select}
                    value={groupList.data.group}
                    onChange={(e) => setSelectedData({ season: groupList.data.season, league: groupList.data.league, group: e.target.value })}
                  >
                    {groupList.data.groups.map((group) => (
                      <option key={group}>{group}</option>
                    ))}
                  </select>
                </div>
                <div className={classes.groupList__header}>TABELA</div>
                <Table
                  styles={{ gridTemplateColumns: "1fr 4fr 2fr 2fr 2fr 2fr" }}
                  header={["#", "Imię i nazwisko", "Mecze", "Zwycięstwa", "Punkty", "Małe punkty"]}
                  body={groupList.data.table.map((user, index) => [index + 1, user.user.name, user.games, user.wins.length, user.points, user.smallPoints])}
                />
                <div className={classes.groupList__header}>
                  MECZE{" "}
                  <span className={classes.groupList__print} onClick={printHandler}>
                    (kliknij aby wydrukować)
                  </span>
                </div>
                <div ref={gamesRef}>
                  <Table styles={{ gridTemplateColumns: "1fr 5fr 5fr 2fr 2fr" }} header={["#", "Imię i nazwisko", "Sety", "Wynik", "Punkty"]} />
                  <div className={classes.groupList__games}>
                    {groupList.data.games.map((game, index) => (
                      <Game key={game._id} game={{ ...game, endDate: groupList.data.endDate, index: ++index }} />
                    ))}
                  </div>
                </div>
                {userInfo?.isAdmin && (
                  <div className={classes.groupList__actions}>
                    <Button onClick={deleteGroupHandler}>Usuń grupę</Button>
                  </div>
                )}
              </>
            ) : (
              <div>{groupList.data}</div>
            )}
          </div>
        </Card>
      )}
    </>
  );
};

export default GroupList;
