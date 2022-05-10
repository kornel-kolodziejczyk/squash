import { RANKING_LIST_FAIL, RANKING_LIST_REQUEST, RANKING_LIST_RESET, RANKING_LIST_SUCCESS } from "../actionTypes/rankingActionTypes";

export const rankingListReducer = (state = {}, action) => {
  switch (action.type) {
    case RANKING_LIST_FAIL:
      return { error: action.payload };
    case RANKING_LIST_REQUEST:
      return { loading: true };
    case RANKING_LIST_RESET:
      return {};
    case RANKING_LIST_SUCCESS:
      return { data: action.payload };
    default:
      return state;
  }
};
