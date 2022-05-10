import {
  GROUP_CREATE_FAIL,
  GROUP_CREATE_REQUEST,
  GROUP_CREATE_SUCCESS,
  GROUP_DELETE_FAIL,
  GROUP_DELETE_REQUEST,
  GROUP_DELETE_SUCCESS,
  GROUP_GAME_DETAILS_FAIL,
  GROUP_GAME_DETAILS_REQUEST,
  GROUP_GAME_DETAILS_SUCCESS,
  GROUP_GAME_LIST_FAIL,
  GROUP_GAME_LIST_REQUEST,
  GROUP_GAME_LIST_SUCCESS,
  GROUP_GAME_UPDATE_FAIL,
  GROUP_GAME_UPDATE_REQUEST,
  GROUP_GAME_UPDATE_SUCCESS,
  GROUP_LIST_FAIL,
  GROUP_LIST_REQUEST,
  GROUP_LIST_SUCCESS,
} from "../actionTypes/groupActionTypes";

import axios from "axios";

export const groupCreateAction = (group) => async (dispatch, getState) => {
  dispatch({ type: GROUP_CREATE_REQUEST });
  try {
    const { data } = await axios.post("/api/groups", group, { headers: { Authorization: `Bearer ${getState().signin.data?.token}` } });
    dispatch({ type: GROUP_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GROUP_CREATE_FAIL, payload: error.response.data?.message || error.message });
  }
};

export const groupDeleteAction = (id) => async (dispatch, getState) => {
  dispatch({ type: GROUP_DELETE_REQUEST });
  try {
    const { data } = await axios.delete(`/api/groups/${id}`, { headers: { Authorization: `Bearer ${getState().signin.data?.token}` } });
    dispatch({ type: GROUP_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GROUP_DELETE_FAIL, payload: error.response.data?.message || error.message });
  }
};

export const groupGameDetailsAction = (id) => async (dispatch, getState) => {
  dispatch({ type: GROUP_GAME_DETAILS_REQUEST });
  try {
    const { data } = await axios.get(`/api/groups/games/${id}`, { headers: { Authorization: `Bearer ${getState().signin.data?.token}` } });
    dispatch({ type: GROUP_GAME_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GROUP_GAME_DETAILS_FAIL, payload: error.response.data?.message || error.message });
  }
};

export const groupGameListAction = (id) => async (dispatch, getState) => {
  dispatch({ type: GROUP_GAME_LIST_REQUEST });
  try {
    const { data } = await axios.get(`/api/groups/games`, { params: { id }, headers: { Authorization: `Bearer ${getState().signin.data?.token}` } });
    dispatch({ type: GROUP_GAME_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GROUP_GAME_LIST_FAIL, payload: error.response.data?.message || error.message });
  }
};

export const groupGameUpdateAction = (game) => async (dispatch, getState) => {
  dispatch({ type: GROUP_GAME_UPDATE_REQUEST });
  try {
    const { data } = await axios.put("/api/groups/games", { game }, { headers: { Authorization: `Bearer ${getState().signin.data?.token}` } });
    dispatch({ type: GROUP_GAME_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GROUP_GAME_UPDATE_FAIL, payload: error.response.data?.message || error.message });
  }
};

export const groupListAction = (group) => async (dispatch) => {
  dispatch({ type: GROUP_LIST_REQUEST });
  try {
    const { data } = await axios.get("/api/groups", { params: group });
    dispatch({ type: GROUP_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GROUP_LIST_FAIL, payload: error.response.data?.message || error.message });
  }
};
