import React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

function Home_Admin(props) {
  const history = useHistory();
  return (
    <>
      <p>Page d'administration du mariage.</p>
      <p>Bonjour {props.username}</p>
      <Link to="/ListInvit_Admin">
        <p>Voir les réponses</p>
      </Link>
      <Link to="/Admin_Children">
        <p>Gérer les invités avec enfant</p>
      </Link>
      <button
        onClick={() => {
          Cookies.remove("token");
          history.push("/Auth_Admin");
        }}
      >
        Se deconnecter
      </button>
    </>
  );
}

export default Home_Admin;
