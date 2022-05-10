import {
  USER_CREATE_FAIL,
  USER_CREATE_REQUEST,
  USER_CREATE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "../actionTypes/userActionTypes";

import axios from "axios";

export const userCreateAction = (user) => async (dispatch, getState) => {
  dispatch({ type: USER_CREATE_REQUEST });
  try {
    const { data } = await axios.post("/api/users", user, { headers: { Authorization: `Bearer ${getState().signin.data?.token}` } });
    dispatch({ type: USER_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_CREATE_FAIL, payload: error.response.data?.message || error.message });
  }
};

export const userDetailsAction = (id) => async (dispatch, getState) => {
  dispatch({ type: USER_DETAILS_REQUEST, payload: id });
  try {
    const { data } = await axios.get(`/api/users/${id}`, { headers: { Authorization: `Bearer ${getState().signin.data?.token}` } });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data?.message || error.message });
  }
};

export const userListAction = (user) => async (dispatch, getState) => {
  dispatch({ type: USER_LIST_REQUEST });
  try {
    const { data } = await axios.get("/api/users", { params: { user }, headers: { Authorization: `Bearer ${getState().signin.data?.token}` } });
    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_LIST_FAIL, payload: error.response.data?.message || error.message });
  }
};

export const userUpdateAction = (user) => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_REQUEST });
  try {
    const { data } = await axios.put("/api/users", user, { headers: { Authorization: `Bearer ${getState().signin.data?.token}` } });
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_UPDATE_FAIL, payload: error.response.data?.message || error.message });
  }
};
