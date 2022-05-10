import {
  TOURNAMENT_CREATE_FAIL,
  TOURNAMENT_CREATE_REQUEST,
  TOURNAMENT_CREATE_SUCCESS,
  TOURNAMENT_DELETE_FAIL,
  TOURNAMENT_DELETE_REQUEST,
  TOURNAMENT_DELETE_SUCCESS,
  TOURNAMENT_DETAILS_FAIL,
  TOURNAMENT_DETAILS_REQUEST,
  TOURNAMENT_DETAILS_SUCCESS,
  TOURNAMENT_LIST_FAIL,
  TOURNAMENT_LIST_REQUEST,
  TOURNAMENT_LIST_SUCCESS,
  TOURNAMENT_UPDATE_FAIL,
  TOURNAMENT_UPDATE_REQUEST,
  TOURNAMENT_UPDATE_SUCCESS,
} from "../actionTypes/tournamentActionTypes";

import axios from "axios";

export const tournamentCreateAction = (tournament) => async (dispatch, getState) => {
  dispatch({ type: TOURNAMENT_CREATE_REQUEST });
  try {
    const { data } = await axios.post("/api/tournaments", tournament, { headers: { Authorization: `Bearer ${getState().signin.data?.token}` } });
    dispatch({ type: TOURNAMENT_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: TOURNAMENT_CREATE_FAIL, payload: error.response.data?.message || error.message });
  }
};

export const tournamentDeleteAction = (id) => async (dispatch, getState) => {
  dispatch({ type: TOURNAMENT_DELETE_REQUEST });
  try {
    const { data } = await axios.delete(`/api/tournaments/${id}`, { headers: { Authorization: `Bearer ${getState().signin.data?.token}` } });
    dispatch({ type: TOURNAMENT_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: TOURNAMENT_DELETE_FAIL, payload: error.response.data?.message || error.message });
  }
};

export const tournamentDetailsAction = (id) => async (dispatch, getState) => {
  dispatch({ type: TOURNAMENT_DETAILS_REQUEST });
  try {
    const { data } = await axios.get(`/api/tournaments/${id}`, { headers: { Authorization: `Bearer ${getState().signin.data?.token}` } });
    dispatch({ type: TOURNAMENT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: TOURNAMENT_DETAILS_FAIL, payload: error.response.data?.message || error.message });
  }
};

export const tournamentListAction = (tournament) => async (dispatch) => {
  dispatch({ type: TOURNAMENT_LIST_REQUEST });
  try {
    const { data } = await axios.get("/api/tournaments", { params: tournament });
    dispatch({ type: TOURNAMENT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: TOURNAMENT_LIST_FAIL, payload: error.response.data?.message || error.message });
  }
};

export const tournamentUpdateAction = (tournament) => async (dispatch, getState) => {
  dispatch({ type: TOURNAMENT_UPDATE_REQUEST });
  try {
    const formData = new FormData();
    formData.append("id", tournament.id);
    formData.append("date", tournament.date);
    formData.append("pdf", tournament.pdf);
    formData.append("name", tournament.name);
    formData.append("users", JSON.stringify(tournament.users));
    formData.append("season", tournament.season);
    formData.append("isRanking", tournament.isRanking);
    const { data } = await axios.put("/api/tournaments", formData, { headers: { Authorization: `Bearer ${getState().signin.data?.token}` } });
    dispatch({ type: TOURNAMENT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: TOURNAMENT_UPDATE_FAIL, payload: error.response.data?.message || error.message });
  }
};
