import React from "react";
import { Link } from "react-router-dom";

import Button from "../containers/Button";

function Body() {
  return (
    <div className="body">
      <div className="wrapper">
        <div className="button">
          <Link to="/Info_Weeding">
            <Button
              id="button1"
              className="button1-inside"
              textButton="Le Mariage"
            />
          </Link>
          <Link to="/Invit_Weeding">
            <Button
              id="button2"
              className="button2-inside"
              textButton="Répondre à l'invitation"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Body;
