import {
  FORGET_PASSWORD_FAIL,
  FORGET_PASSWORD_REQUEST,
  FORGET_PASSWORD_RESET,
  FORGET_PASSWORD_SUCCESS,
  PROFILE_UPDATE_FAIL,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_RESET,
  PROFILE_UPDATE_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_RESET,
  RESET_PASSWORD_SUCCESS,
  SIGNIN_FAIL,
  SIGNIN_REQUEST,
  SIGNIN_RESET,
  SIGNIN_SUCCESS,
  SIGNOUT,
} from "../actionTypes/authActionTypes";

export const forgetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGET_PASSWORD_FAIL:
      return { error: action.payload };
    case FORGET_PASSWORD_REQUEST:
      return { loading: true };
    case FORGET_PASSWORD_RESET:
      return {};
    case FORGET_PASSWORD_SUCCESS:
      return { data: action.payload };
    default:
      return state;
  }
};

export const profileUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFILE_UPDATE_FAIL:
      return { error: action.payload };
    case PROFILE_UPDATE_REQUEST:
      return { loading: true };
    case PROFILE_UPDATE_RESET:
      return {};
    case PROFILE_UPDATE_SUCCESS:
      return { data: action.payload };
    default:
      return state;
  }
};

export const resetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case RESET_PASSWORD_FAIL:
      return { error: action.payload };
    case RESET_PASSWORD_REQUEST:
      return { loading: true };
    case RESET_PASSWORD_RESET:
      return {};
    case RESET_PASSWORD_SUCCESS:
      return { data: action.payload };
    default:
      return state;
  }
};

export const signinReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGNIN_FAIL:
      return { error: action.payload };
    case SIGNIN_REQUEST:
      return { loading: true };
    case SIGNIN_RESET:
      return {};
    case SIGNIN_SUCCESS:
      return { data: action.payload };
    case SIGNOUT:
      return {};
    default:
      return state;
  }
};
