import React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

function Home_Admin(props) {
  const history = useHistory();
  return (
    <div className="adminHome">
      <p>Page d'administration du mariage.</p>
      <p>Bonjour {props.username}</p>
      <Link to="/admin/response_list_weeding_admin">
        <p className="buttonAdminHome">Voir les réponses</p>
      </Link>
      <Link to="/admin/allowed_children_admin">
        <p className="buttonAdminHome">Gérer les invités avec enfant</p>
      </Link>
      <Link to="/">
        <p className="buttonAdminHome">Retourner sur le site</p>
      </Link>
      <button
        onClick={() => {
          Cookies.remove("token");
          history.push("/admin");
        }}
      >
        Se deconnecter
      </button>
    </div>
  );
}

export default Home_Admin;
