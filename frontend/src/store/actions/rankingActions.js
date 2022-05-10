import { RANKING_LIST_FAIL, RANKING_LIST_REQUEST, RANKING_LIST_SUCCESS } from "../actionTypes/rankingActionTypes";

import axios from "axios";

export const rankingListAction = (season) => async (dispatch) => {
  dispatch({ type: RANKING_LIST_REQUEST });
  try {
    const { data } = await axios.get("/api/rankings", { params: { season } });
    dispatch({ type: RANKING_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: RANKING_LIST_FAIL, payload: error.response.data?.message || error.message });
  }
};
