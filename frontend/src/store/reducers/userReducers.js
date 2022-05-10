import {
  USER_CREATE_FAIL,
  USER_CREATE_REQUEST,
  USER_CREATE_RESET,
  USER_CREATE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_RESET,
  USER_UPDATE_SUCCESS,
} from "../actionTypes/userActionTypes";

export const userCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_CREATE_FAIL:
      return { error: action.payload };
    case USER_CREATE_REQUEST:
      return { loading: true };
    case USER_CREATE_RESET:
      return {};
    case USER_CREATE_SUCCESS:
      return { data: action.payload };
    default:
      return state;
  }
};

export const userDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DETAILS_FAIL:
      return { error: action.payload };
    case USER_DETAILS_REQUEST:
      return { loading: true };
    case USER_DETAILS_RESET:
      return {};
    case USER_DETAILS_SUCCESS:
      return { data: action.payload };
    default:
      return state;
  }
};

export const userListReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LIST_FAIL:
      return { error: action.payload };
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_RESET:
      return {};
    case USER_LIST_SUCCESS:
      return { data: action.payload };
    default:
      return state;
  }
};

export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_FAIL:
      return { error: action.payload };
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_RESET:
      return {};
    case USER_UPDATE_SUCCESS:
      return { data: action.payload };
    default:
      return state;
  }
};
