import {
  ARTICLE_CREATE_FAIL,
  ARTICLE_CREATE_REQUEST,
  ARTICLE_CREATE_SUCCESS,
  ARTICLE_DELETE_FAIL,
  ARTICLE_DELETE_REQUEST,
  ARTICLE_DELETE_SUCCESS,
  ARTICLE_DETAILS_FAIL,
  ARTICLE_DETAILS_REQUEST,
  ARTICLE_DETAILS_SUCCESS,
  ARTICLE_LIST_FAIL,
  ARTICLE_LIST_REQUEST,
  ARTICLE_LIST_SUCCESS,
  ARTICLE_UPDATE_FAIL,
  ARTICLE_UPDATE_REQUEST,
  ARTICLE_UPDATE_SUCCESS,
} from "../actionTypes/articleActionTypes";

import axios from "axios";

export const articleCreateAction = (article) => async (dispatch, getState) => {
  dispatch({ type: ARTICLE_CREATE_REQUEST });
  try {
    const formData = new FormData();
    formData.append("title", article.title);
    formData.append("text", article.text);
    formData.append("date", article.date);
    formData.append("height", article.height);
    formData.append("image", article.image);
    const { data } = await axios.post("/api/articles", formData, { headers: { Authorization: `Bearer ${getState().signin.data?.token}` } });
    dispatch({ type: ARTICLE_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ARTICLE_CREATE_FAIL, payload: error.response.data?.message || error.message });
  }
};

export const articleDeleteAction = (id) => async (dispatch, getState) => {
  dispatch({ type: ARTICLE_DELETE_REQUEST });
  try {
    const { data } = await axios.delete(`/api/articles/${id}`, { headers: { Authorization: `Bearer ${getState().signin.data?.token}` } });
    dispatch({ type: ARTICLE_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ARTICLE_DELETE_FAIL, payload: error.response.data?.message || error.message });
  }
};

export const articleDetailsAction = (id) => async (dispatch) => {
  dispatch({ type: ARTICLE_DETAILS_REQUEST, payload: id });
  try {
    const { data } = await axios.get(`/api/articles/${id}`);
    dispatch({ type: ARTICLE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ARTICLE_DETAILS_FAIL, payload: error.response.data?.message || error.message });
  }
};

export const articleListAction = (page) => async (dispatch) => {
  dispatch({ type: ARTICLE_LIST_REQUEST });
  try {
    const { data } = await axios.get("/api/articles", { params: { page }});
    dispatch({ type: ARTICLE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ARTICLE_LIST_FAIL, payload: error.response.data?.message || error.message });
  }
};

export const articleUpdateAction = (article) => async (dispatch, getState) => {
  dispatch({ type: ARTICLE_UPDATE_REQUEST });
  try {
    const formData = new FormData();
    formData.append("id", article.id);
    formData.append("title", article.title);
    formData.append("text", article.text);
    formData.append("date", article.date);
    formData.append("height", article.height);
    formData.append("image", article.image);
    const { data } = await axios.put("/api/articles", formData, { headers: { Authorization: `Bearer ${getState().signin.data?.token}` } });
    dispatch({ type: ARTICLE_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ARTICLE_UPDATE_FAIL, payload: error.response.data?.message || error.message });
  }
};
