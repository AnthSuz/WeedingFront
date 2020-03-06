import React from "react";
import "../../App.css";
import { Link } from "react-router-dom";

import RosesSvg from "../../newComponents/RosesSvg";

import Button from "../../newComponents/Button";

function Home() {
  return (
    <>
      <div className="container">
        <div className="button">
          <Link to="/public/info_weeding">
            <Button
              id="button1"
              className="button1-inside"
              textButton="Le Mariage"
            />
          </Link>
          <Link to="/public/invit_weeding">
            <Button
              id="button2"
              className="button2-inside"
              textButton="Répondre à l'invitation"
            />
          </Link>
        </div>
      </div>

      <div className="toto">
        <RosesSvg />
        <a href="/admin">
          <p>Acces Marié</p>
        </a>
        <RosesSvg transform="scale(-1 1)" />
      </div>
    </>
  );
}

export default Home;
