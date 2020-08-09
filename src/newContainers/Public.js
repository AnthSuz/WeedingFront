import React from "react";
import "../App.css";
import { Switch, Route, Redirect } from "react-router-dom";

import Home from "./containers_public/Home";
import InfoWeeding from "./containers_public/InfoWeeding";
import InvitWeeding from "./containers_public/InvitWeeding";
import ValidInvitWeeding from "./containers_public/ValidInvitWeeding";
import ErrorWeeding from "./containers_public/ErrorWeeding";

function Public() {
  return (
    <>
      <Switch>
        <Route exact={true} path="/">
          <Redirect to="/public/home" />
        </Route>
        <Route exact={true} path="/public/home">
          <Home />
        </Route>
        <Route exact={true} path="/public/info_weeding">
          <InfoWeeding />
        </Route>
        <Route exact={true} path="/public/invit_weeding">
          <InvitWeeding />
        </Route>
        <Route exact={true} path="/public/confirm_invit_weeding">
          <ValidInvitWeeding />
        </Route>
        <Route exact={true} path="/public/error_weeding">
          <ErrorWeeding />
        </Route>
      </Switch>
    </>
  );
}

export default Public;
