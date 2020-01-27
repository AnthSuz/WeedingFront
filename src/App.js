import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

// --- IMPORT DES CONTAINERS ---
import Header from "./containers/Header";

// --- IMPORT DES COMPONENTS ---
import Home from "./components/Home";
import InfoWeeding from "./components/InfoWeeding";
import InvitWeeding from "./components/InvitWeeding";
import AdminWeeding from "./components/Admin";

function App() {
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
          <Route path="/Admin_Weeding">
            <AdminWeeding />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
