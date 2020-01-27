import React from "react";
import { Link } from "react-router-dom";

import Mairie from "../images/mairie.jpg";
import Soiree from "../images/factory.jpg";

const InfoWeeding = () => {
  return (
    <>
      <Link to="/Home">
        <div className="backHome">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H6M12 5l-7 7 7 7" />
          </svg>
          <p className="backHome"> Retour à l'accueil </p>
        </div>
      </Link>
      <div className="infoWeeding">
        <div className="mairie">
          <p>
            Leah & Donovan <br /> se diront OUI sous vos yeux lors de leur union
            civile <br /> le Lundi 7 Septembre 2020 à 14H30 <br /> à la Mairie
            de Gambetta <br />6 Place Gambetta 75020 Paris
          </p>
          <img src={Mairie} alt="Marie du 20em arrondissement" />
        </div>
        <div className="party">
          <img src={Soiree} alt="Devanture Factory 58" className="img_soiree" />
          <p>
            Ils seront honorés de votre présence pour la Houppa <br /> le jeudi
            10 septembre 2020 - 21 Eloul 5780
            <br /> à 17H00 <br /> dans les jardins de la salle Factory 58 <br />{" "}
            12 rue Gutenberg 93000 Bobigny
            <br /> La cérémonie religieuse sera suivie de la réception...
          </p>
        </div>
      </div>
    </>
  );
};

export default InfoWeeding;
