import React from "react";
import { Link } from "react-router-dom";

function ValidInvit() {
  return (
    <div className="validInvit">
      <p>Merci pour votre réponse !</p>
      <p>A bientôt on espère.</p>
      <p>
        Si vous avez rencontré un problème lors de votre réponse, n'hésitez pas
        à nous contacter.
      </p>
      <p>Leah au XXXXXXXXXX </p>
      <p>ou</p>
      <p>Donovan au XXXXXXXXXX</p>
      <Link to="/">
        <button>Retourner à l'accueil</button>
      </Link>
    </div>
  );
}

export default ValidInvit;
