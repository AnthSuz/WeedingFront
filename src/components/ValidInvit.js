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
      <p>
        Leah au <a href="tel:+33695853213">0695853213</a>{" "}
      </p>
      <p>ou</p>
      <p>
        Donovan au <a href="tel:+33659209796">0659209796</a>
      </p>
      <Link to="/">
        <button>Retourner à l'accueil</button>
      </Link>
    </div>
  );
}

export default ValidInvit;
