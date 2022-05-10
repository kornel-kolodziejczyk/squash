import {
  TOURNAMENT_CREATE_FAIL,
  TOURNAMENT_CREATE_REQUEST,
  TOURNAMENT_CREATE_RESET,
  TOURNAMENT_CREATE_SUCCESS,
  TOURNAMENT_DELETE_FAIL,
  TOURNAMENT_DELETE_REQUEST,
  TOURNAMENT_DELETE_RESET,
  TOURNAMENT_DELETE_SUCCESS,
  TOURNAMENT_DETAILS_FAIL,
  TOURNAMENT_DETAILS_REQUEST,
  TOURNAMENT_DETAILS_RESET,
  TOURNAMENT_DETAILS_SUCCESS,
  TOURNAMENT_LIST_FAIL,
  TOURNAMENT_LIST_REQUEST,
  TOURNAMENT_LIST_RESET,
  TOURNAMENT_LIST_SUCCESS,
  TOURNAMENT_UPDATE_FAIL,
  TOURNAMENT_UPDATE_REQUEST,
  TOURNAMENT_UPDATE_RESET,
  TOURNAMENT_UPDATE_SUCCESS,
} from "../actionTypes/tournamentActionTypes";

export const tournamentCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TOURNAMENT_CREATE_FAIL:
      return { error: action.payload };
    case TOURNAMENT_CREATE_REQUEST:
      return { loading: true };
    case TOURNAMENT_CREATE_RESET:
      return {};
    case TOURNAMENT_CREATE_SUCCESS:
      return { data: action.payload };
    default:
      return state;
  }
};

export const tournamentDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TOURNAMENT_DELETE_FAIL:
      return { error: action.payload };
    case TOURNAMENT_DELETE_REQUEST:
      return { loading: true };
    case TOURNAMENT_DELETE_RESET:
      return {};
    case TOURNAMENT_DELETE_SUCCESS:
      return { data: action.payload };
    default:
      return state;
  }
};

export const tournamentDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case TOURNAMENT_DETAILS_FAIL:
      return { error: action.payload };
    case TOURNAMENT_DETAILS_REQUEST:
      return { loading: true };
    case TOURNAMENT_DETAILS_RESET:
      return {};
    case TOURNAMENT_DETAILS_SUCCESS:
      return { data: action.payload };
    default:
      return state;
  }
};

export const tournamentListReducer = (state = {}, action) => {
  switch (action.type) {
    case TOURNAMENT_LIST_FAIL:
      return { error: action.payload };
    case TOURNAMENT_LIST_REQUEST:
      return { loading: true };
    case TOURNAMENT_LIST_RESET:
      return {};
    case TOURNAMENT_LIST_SUCCESS:
      return { data: action.payload };
    default:
      return state;
  }
};

export const tournamentUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case TOURNAMENT_UPDATE_FAIL:
      return { error: action.payload };
    case TOURNAMENT_UPDATE_REQUEST:
      return { loading: true };
    case TOURNAMENT_UPDATE_RESET:
      return {};
    case TOURNAMENT_UPDATE_SUCCESS:
      return { data: action.payload };
    default:
      return state;
  }
};
