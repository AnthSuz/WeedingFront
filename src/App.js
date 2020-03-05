import React, { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Cookies from "js-cookie";

// --- IMPORT DES CONTAINERS ---
import Header from "./containers/Header";

// --- IMPORT DES COMPONENTS ---
import Home from "./components/Home";
import InfoWeeding from "./components/InfoWeeding";
import InvitWeeding from "./components/InvitWeeding";
import AdminWeeding from "./components/ListInvit_Admin";
import HomeAdminWeeding from "./components/Home_Admin";
import AddChildrenAllowed from "./components/Children_Admin";
import ValidInvit from "./components/ValidInvit";
import AdminWeedingById from "./components/AdminWeedingById";
import LoginAdmin from "./components/LoginAdmin";

function App() {
  const [invite, setInvite] = useState([]);
  // const [filterInvite, setFilterInvite] = useState([]);

  const [token, setToken] = useState(Cookies.get("token") || "");
  const [username, setUsername] = useState("");

  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact={true} path="/">
            <Redirect to="/Home" />
          </Route>
          <Route path="/Home">
            <Home />
          </Route>
          <Route path="/Info_Weeding">
            <InfoWeeding />
          </Route>
          <Route path="/Invit_Weeding">
            <InvitWeeding />
          </Route>
          <Route path="/Valid_Invit">
            <ValidInvit />
          </Route>
          <Route path="/Auth_Admin">
            <LoginAdmin setToken={setToken} setUsername={setUsername} />
          </Route>
          <Route path="/ListInvit_Admin">
            {!token ? (
              <Redirect to="/Auth_Admin" />
            ) : (
              <AdminWeeding
                invite={invite}
                setInvite={setInvite}
                // filterInvite={filterInvite}
                // setFilterInvite={setFilterInvite}
              />
            )}
          </Route>
          <Route path="/ListInvit/:id">
            <AdminWeedingById
              invite={invite}
              setInvite={setInvite}
              // filterInvite={filterInvite}
              // setFilterInvite={setFilterInvite}
            />
          </Route>
          <Route path="/Admin_Home">
            {!token ? (
              <Redirect to="/Auth_Admin" />
            ) : (
              <HomeAdminWeeding username={username} />
            )}
          </Route>
          <Route path="/Admin_Children">
            {!token ? <Redirect to="/Auth_Admin" /> : <AddChildrenAllowed />}
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
