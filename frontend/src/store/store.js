import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { articleDetailsReducer, articleCreateReducer, articleDeleteReducer, articleListReducer, articleUpdateReducer } from "./reducers/articleReducers";
import { checkTokenExpirationMiddleware } from "../utils";
import { forgetPasswordReducer, profileUpdateReducer, resetPasswordReducer, signinReducer } from "./reducers/authReducers";
import { groupCreateReducer, groupDeleteReducer, groupGameDetailsReducer, groupGameListReducer, groupGameUpdateReducer, groupListReducer } from "./reducers/groupReducers";
import { rankingListReducer } from "./reducers/rankingReducers";
import { tournamentCreateReducer, tournamentDeleteReducer, tournamentDetailsReducer, tournamentListReducer, tournamentUpdateReducer } from "./reducers/tournamentReducers";
import { userCreateReducer, userDetailsReducer, userListReducer, userUpdateReducer } from "./reducers/userReducers";

import thunk from "redux-thunk";

const initialState = {
  signin: { data: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null },
};

const reducer = combineReducers({
  // Article
  articleCreate: articleCreateReducer,
  articleDelete: articleDeleteReducer,
  articleDetails: articleDetailsReducer,
  articleList: articleListReducer,
  articleUpdate: articleUpdateReducer,

  // Auth
  forgetPassword: forgetPasswordReducer,
  profileUpdate: profileUpdateReducer,
  resetPassword: resetPasswordReducer,
  signin: signinReducer,

  // Group
  groupCreate: groupCreateReducer,
  groupDelete: groupDeleteReducer,
  groupGameDetails: groupGameDetailsReducer,
  groupGameList: groupGameListReducer,
  groupGameUpdate: groupGameUpdateReducer,
  groupList: groupListReducer,

  // Tournament
  tournamentCreate: tournamentCreateReducer,
  tournamentDelete: tournamentDeleteReducer,
  tournamentDetails: tournamentDetailsReducer,
  tournamentList: tournamentListReducer,
  tournamentUpdate: tournamentUpdateReducer,

  // Rankings
  rankingList: rankingListReducer,

  // User
  userCreate: userCreateReducer,
  userDetails: userDetailsReducer,
  userList: userListReducer,
  userUpdate: userUpdateReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk, checkTokenExpirationMiddleware)));

export default store;
