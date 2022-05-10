import {
  GROUP_CREATE_FAIL,
  GROUP_CREATE_REQUEST,
  GROUP_CREATE_RESET,
  GROUP_CREATE_SUCCESS,
  GROUP_DELETE_FAIL,
  GROUP_DELETE_REQUEST,
  GROUP_DELETE_RESET,
  GROUP_DELETE_SUCCESS,
  GROUP_GAME_DETAILS_FAIL,
  GROUP_GAME_DETAILS_REQUEST,
  GROUP_GAME_DETAILS_RESET,
  GROUP_GAME_DETAILS_SUCCESS,
  GROUP_GAME_LIST_FAIL,
  GROUP_GAME_LIST_REQUEST,
  GROUP_GAME_LIST_RESET,
  GROUP_GAME_LIST_SUCCESS,
  GROUP_GAME_UPDATE_FAIL,
  GROUP_GAME_UPDATE_REQUEST,
  GROUP_GAME_UPDATE_RESET,
  GROUP_GAME_UPDATE_SUCCESS,
  GROUP_LIST_FAIL,
  GROUP_LIST_REQUEST,
  GROUP_LIST_RESET,
  GROUP_LIST_SUCCESS,
} from "../actionTypes/groupActionTypes";

export const groupCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case GROUP_CREATE_FAIL:
      return { error: action.payload };
    case GROUP_CREATE_REQUEST:
      return { loading: true };
    case GROUP_CREATE_RESET:
      return {};
    case GROUP_CREATE_SUCCESS:
      return { data: action.payload };
    default:
      return state;
  }
};

export const groupDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case GROUP_DELETE_FAIL:
      return { error: action.payload };
    case GROUP_DELETE_REQUEST:
      return { loading: true };
    case GROUP_DELETE_RESET:
      return {};
    case GROUP_DELETE_SUCCESS:
      return { data: action.payload };
    default:
      return state;
  }
};

export const groupGameDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case GROUP_GAME_DETAILS_FAIL:
      return { error: action.payload };
    case GROUP_GAME_DETAILS_REQUEST:
      return { loading: true };
    case GROUP_GAME_DETAILS_RESET:
      return {};
    case GROUP_GAME_DETAILS_SUCCESS:
      return { data: action.payload };
    default:
      return state;
  }
};

export const groupGameListReducer = (state = {}, action) => {
  switch (action.type) {
    case GROUP_GAME_LIST_FAIL:
      return { error: action.payload };
    case GROUP_GAME_LIST_REQUEST:
      return { loading: true };
    case GROUP_GAME_LIST_RESET:
      return {};
    case GROUP_GAME_LIST_SUCCESS:
      return { data: action.payload };
    default:
      return state;
  }
};

export const groupGameUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case GROUP_GAME_UPDATE_FAIL:
      return { error: action.payload };
    case GROUP_GAME_UPDATE_REQUEST:
      return { loading: true };
    case GROUP_GAME_UPDATE_RESET:
      return {};
    case GROUP_GAME_UPDATE_SUCCESS:
      return { data: action.payload };
    default:
      return state;
  }
};

export const groupListReducer = (state = {}, action) => {
  switch (action.type) {
    case GROUP_LIST_FAIL:
      return { error: action.payload };
    case GROUP_LIST_REQUEST:
      return { loading: true };
    case GROUP_LIST_RESET:
      return {};
    case GROUP_LIST_SUCCESS:
      return { data: action.payload };
    default:
      return state;
  }
};
