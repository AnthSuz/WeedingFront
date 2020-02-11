import React from "react";
import { Link } from "react-router-dom";

const Home_Admin = () => {
  return (
    <>
      <p>Page d'administration du mariage.</p>
      <Link to="/Admin_Weeding">
        <p>Voir les réponses</p>
      </Link>
      <Link to="/Admin_Children">
        <p>Gérer les invités avec enfant</p>
      </Link>
    </>
  );
};

export default Home_Admin;
