import { Route, Switch } from "react-router-dom";
import React from "react";

// Auth
import Profile from "../auth/Profile/Profile";
import Signin from "../auth/Signin/Signin";
import ForgetPassword from "../auth/ForgetPassword/ForgetPassword";
import ResetPassword from "../auth/ResetPassword/ResetPassword";

// Article
import ArticleCreate from "../article/ArticleCreate/ArticleCreate";
import ArticleUpdate from "../article/ArticleUpdate/ArticleUpdate";
import ArticleList from "../article/ArticleList/ArticleList";

// Group
import GroupList from "../group/GroupList/GroupList";
import GroupGame from "../group/GroupGame/GroupGame";
import GroupCreate from "../group/GroupCreate/GroupCreate";

// Middlewares
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

// Tournament
import TournamentList from "../tournament/TournamentList/TournamentList";
import TournamentCreate from "../tournament/TournamentCreate/TournamentCreate";
import TournamentUpdate from "../tournament/TournamentUpdate/TournamentUpdate";

// User
import UserUpdate from "../user/UserUpdate/UserUpdate";
import UserCreate from "../user/UserCreate/UserCreate";
import UserList from "../user/UserList/UserList";

// Ranking
import Ranking from "../Ranking/Ranking";

// Regulations
import Regulations from "../Regulations/Regulations";

const Routes = () => {
  return (
    <Switch>
      {/* ARTICLES */}
      <AdminRoute path="/articles/create" component={ArticleCreate}></AdminRoute>
      <AdminRoute path="/articles/:id/update" component={ArticleUpdate}></AdminRoute>
      <Route path="/" component={ArticleList} exact></Route>

      {/* AUTH */}
      <Route path="/signin" component={Signin}></Route>
      <PrivateRoute path="/profile" component={Profile}></PrivateRoute>
      <Route path="/forget-password" component={ForgetPassword}></Route>
      <Route path="/reset-password" component={ResetPassword}></Route>

      {/* GROUPS */}
      <AdminRoute path="/groups/create" component={GroupCreate}></AdminRoute>
      <PrivateRoute path="/groups/games/:id/update" component={GroupGame}></PrivateRoute>
      <Route path="/groups" component={GroupList}></Route>

      {/* RANKING */}
      <Route path="/rankings" component={Ranking}></Route>

      {/* REGULATIONS */}
      <Route path="/regulations" component={Regulations}></Route>

      {/* TOURNAMENTS */}
      <AdminRoute path="/tournaments/create" component={TournamentCreate}></AdminRoute>
      <AdminRoute path="/tournaments/:id/update" component={TournamentUpdate}></AdminRoute>
      <Route path="/tournaments" component={TournamentList}></Route>

      {/* USERS */}
      <AdminRoute path="/users/:id/update" component={UserUpdate}></AdminRoute>
      <AdminRoute path="/users/create" component={UserCreate}></AdminRoute>
      <PrivateRoute path="/users" component={UserList}></PrivateRoute>
    </Switch>
  );
};

export default Routes;
