import {
  FORGET_PASSWORD_FAIL,
  FORGET_PASSWORD_REQUEST,
  FORGET_PASSWORD_SUCCESS,
  PROFILE_UPDATE_FAIL,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  SIGNIN_FAIL,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNOUT,
} from "../actionTypes/authActionTypes";

import axios from "axios";

export const forgetPasswordAction = (email) => async (dispatch) => {
  dispatch({ type: FORGET_PASSWORD_REQUEST });
  try {
    const { data } = await axios.post("/api/forget-password", { email });
    dispatch({ type: FORGET_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FORGET_PASSWORD_FAIL, payload: error.response.data?.message || error.message });
  }
};

export const profileUpdateAction = (user) => async (dispatch, getState) => {
  dispatch({ type: PROFILE_UPDATE_REQUEST });
  try {
    const { data } = await axios.put(`/api/profile`, user, { headers: { Authorization: `Bearer ${getState().signin.data?.token}` } });
    dispatch({ type: PROFILE_UPDATE_SUCCESS, payload: data });
    dispatch({ type: SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: PROFILE_UPDATE_FAIL, payload: error.response.data?.message || error.message });
  }
};

export const resetPasswordAction = (resetLink, password) => async (dispatch) => {
  dispatch({ type: RESET_PASSWORD_REQUEST });
  try {
    const { data } = await axios.post("/api/reset-password", { password }, { headers: { authorization: `Bearer ${resetLink}` } });
    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: RESET_PASSWORD_FAIL, payload: error.response.data?.message || error.message });
  }
};

export const signinAction = (email, password) => async (dispatch) => {
  dispatch({ type: SIGNIN_REQUEST });
  try {
    const { data } = await axios.post("/api/signin", { email, password });
    dispatch({ type: SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: SIGNIN_FAIL, payload: error.response.data?.message || error.message });
  }
};

export const signoutAction = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: SIGNOUT });
};
