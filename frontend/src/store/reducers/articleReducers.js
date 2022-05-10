import {
  ARTICLE_CREATE_FAIL,
  ARTICLE_CREATE_REQUEST,
  ARTICLE_CREATE_RESET,
  ARTICLE_CREATE_SUCCESS,
  ARTICLE_DELETE_FAIL,
  ARTICLE_DELETE_REQUEST,
  ARTICLE_DELETE_RESET,
  ARTICLE_DELETE_SUCCESS,
  ARTICLE_DETAILS_FAIL,
  ARTICLE_DETAILS_REQUEST,
  ARTICLE_DETAILS_RESET,
  ARTICLE_DETAILS_SUCCESS,
  ARTICLE_LIST_FAIL,
  ARTICLE_LIST_REQUEST,
  ARTICLE_LIST_RESET,
  ARTICLE_LIST_SUCCESS,
  ARTICLE_UPDATE_FAIL,
  ARTICLE_UPDATE_REQUEST,
  ARTICLE_UPDATE_RESET,
  ARTICLE_UPDATE_SUCCESS,
} from "../actionTypes/articleActionTypes";

export const articleCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ARTICLE_CREATE_FAIL:
      return { error: action.payload };
    case ARTICLE_CREATE_REQUEST:
      return { loading: true };
    case ARTICLE_CREATE_RESET:
      return {};
    case ARTICLE_CREATE_SUCCESS:
      return { data: action.payload };
    default:
      return state;
  }
};

export const articleDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ARTICLE_DELETE_FAIL:
      return { error: action.payload };
    case ARTICLE_DELETE_REQUEST:
      return { loading: true };
    case ARTICLE_DELETE_RESET:
      return {};
    case ARTICLE_DELETE_SUCCESS:
      return { data: action.payload };
    default:
      return state;
  }
};

export const articleDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case ARTICLE_DETAILS_FAIL:
      return { error: action.payload };
    case ARTICLE_DETAILS_REQUEST:
      return { loading: true };
    case ARTICLE_DETAILS_RESET:
      return {};
    case ARTICLE_DETAILS_SUCCESS:
      return { data: action.payload };
    default:
      return state;
  }
};

export const articleListReducer = (state = {}, action) => {
  switch (action.type) {
    case ARTICLE_LIST_FAIL:
      return { error: action.payload };
    case ARTICLE_LIST_REQUEST:
      return { loading: true };
    case ARTICLE_LIST_RESET:
      return {};
    case ARTICLE_LIST_SUCCESS:
      return { data: action.payload };
    default:
      return state;
  }
};

export const articleUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case ARTICLE_UPDATE_FAIL:
      return { error: action.payload };
    case ARTICLE_UPDATE_REQUEST:
      return { loading: true };
    case ARTICLE_UPDATE_RESET:
      return {};
    case ARTICLE_UPDATE_SUCCESS:
      return { data: action.payload };
    default:
      return state;
  }
};
