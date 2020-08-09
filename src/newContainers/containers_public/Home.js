import React, { useState } from "react";
import "../../App.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Api } from "../../newComponents/Global";

import RosesSvg from "../../newComponents/RosesSvg";

import Button from "../../newComponents/Button";
import axios from "axios";

function Home() {
  const history = useHistory();
  const [error, setError] = useState(false);

  const onOff = async () => {
    try {
      await axios.get(Api + "/onoff");
      history.push("/public/invit_weeding");
    } catch (error) {
      setError(true);
      history.push("/public/error_weeding");
    }
  };

  return (
    <>
      <div className="container">
        <div style={{ textAlign: "center" }}>
          <div>
            <p>Mr et Mme Samama François et Jacqueline</p>
            <p>Mr et Mme Sakoun Stéphane et Véronique</p>
          </div>
          <div>
            <p>Mme Baranes Isabelle</p>
          </div>
        </div>
        <p style={{ textAlign: "center", padding: "0 10px" }}>
          Ont la joie de vous annoncer le mariage de leurs petits enfant et
          enfant
        </p>
        <p style={{ fontWeight: "600", textAlign: "center" }}>
          Leah et Donovan
        </p>
        <div className="button">
          <Link to="/public/info_weeding">
            <Button
              id="button1"
              className="button1-inside"
              textButton="Le Mariage"
            />
          </Link>
          <Link
          // to="/public/invit_weeding"
          // to={error ? "world" : "hello"}
          >
            <Button
              onClick={() => {
                onOff();
              }}
              id="button2"
              className="button2-inside"
              textButton="Répondre à l'invitation"
            />
          </Link>
        </div>
      </div>
      {error && <p>PROBLEME</p>}
      <div className="toto">
        <RosesSvg />
        <Link to="/admin/home_admin">
          <p>Acces Marié</p>
        </Link>
        <RosesSvg transform="scale(-1 1)" />
      </div>
    </>
  );
}

export default Home;
