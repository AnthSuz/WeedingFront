import React from "react";
import { Link } from "react-router-dom";

function ValidInvitWeeding() {
  return (
    <div className="validInvit">
      <p>Une erreur est survenue.</p>
      <p>Si vous avez rencontré un problème à nouveau, contactez</p>
      <p>
        Leah au <a href="tel:+33695853213">0695853213</a>{" "}
      </p>
      <p>ou</p>
      <p>
        Donovan au <a href="tel:+33659209796">0659209796</a>
      </p>
      <Link to="/public/home">
        <button>Retourner à l'accueil</button>
      </Link>
    </div>
  );
}

export default ValidInvitWeeding;
