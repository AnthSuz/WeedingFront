import React from "react";

// IMPORT DES IMAGES
import Mairie from "../../images/mairie.jpg";
import Soiree from "../../images/factory.jpg";

import BackHome from "../../newComponents/BackHome";

function InfoWeeding() {
  return (
    <>
      <BackHome back="/public/home" where="l'acceuil" />
      <div className="infoWeeding">
        <div className="mairie">
          <p>
            Leah & Donovan <br /> se diront OUI sous vos yeux lors de leur union
            civile <br /> le Lundi 7 Septembre 2020 à 14H15 <br /> à la Mairie
            de Gambetta <br />6 Place Gambetta 75020 Paris
          </p>
          <img src={Mairie} alt="Marie du 20em arrondissement" />
        </div>
        <div className="party">
          <img src={Soiree} alt="Devanture Factory 58" className="img_soiree" />
          <p>
            Ils seront honorés de votre présence pour la Houppa le
            <br /> jeudi 10 septembre 2020 <br /> 21 Eloul 5780
            <br /> à 17H00 <br /> dans les jardins de la salle Factory 58 <br />{" "}
            12 rue Gutenberg 93000 Bobigny
            <br /> La cérémonie religieuse sera suivie de la réception...
          </p>
        </div>
      </div>
    </>
  );
}

export default InfoWeeding;
