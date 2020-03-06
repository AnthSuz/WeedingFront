import React, { useState } from "react";
import "../App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Cookies from "js-cookie";

import LoginAdmin from "./containers_admin/LoginAdmin";
import HomeAdmin from "./containers_admin/HomeAdmin";
import ResponseListWeeding from "./containers_admin/ResponseListAdmin";
import ResponseListByIdWeeding from "./containers_admin/ResponseListByIdAdmin";
import AllowedChildren from "./containers_admin/AllowedChildrenAdmin";

function Admin() {
  const [invite, setInvite] = useState([]);
  const [token, setToken] = useState(Cookies.get("token") || "");
  const [username, setUsername] = useState("");
  return (
    <Router>
      <Switch>
        <Route exact={true} path="/admin">
          <Redirect to="/admin/login_admin" />
        </Route>
        <Route exact={true} path="/admin/login_admin">
          <LoginAdmin setToken={setToken} setUsername={setUsername} />
        </Route>
        <Route exact={true} path="/admin/home_admin">
          {!token ? (
            <Redirect to="/admin" />
          ) : (
            <HomeAdmin username={username} />
          )}
        </Route>
        <Route exact={true} path="/admin/response_list_weeding_admin">
          {!token ? (
            <Redirect to="/admin" />
          ) : (
            <ResponseListWeeding invite={invite} setInvite={setInvite} />
          )}
        </Route>
        <Route exact={true} path="/admin/response_list_weeding_by_id_admin/:id">
          {!token ? (
            <Redirect to="/admin" />
          ) : (
            <ResponseListByIdWeeding invite={invite} setInvite={setInvite} />
          )}
        </Route>
        <Route exact={true} path="/admin/allowed_children_admin">
          {!token ? <Redirect to="/admin" /> : <AllowedChildren />}
        </Route>
      </Switch>
    </Router>
  );
}

export default Admin;
