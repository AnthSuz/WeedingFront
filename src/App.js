import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

// --- IMPORT DES COMPONENTS ---
import Header from "./newComponents/Header";
import Footer from "./newComponents/Footer";

// --- IMPORT DES CONTAINERS ---
import Public from "./newContainers/Public";
import Admin from "./newContainers/Admin";

function App() {
  return (
    <Router>
      {/* HEADER */}
      <Header />
      {/* BODY */}
      <Route path="/">
        <Public />
      </Route>
      <Route path="/admin">
        <Admin />
      </Route>
      {/* FOOTER */}
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
