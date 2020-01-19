import React from "react";
import { Link } from "react-router-dom";

import Button1 from "./Button1";
import Button2 from "./Button2";
const Body = () => {
  return (
    <>
      <div className="body">
        <div className="wrapper">
          <div className="button">
            <Link to="/Info_Weeding">
              <Button1 />
            </Link>
            <Link to="/Invit_Weeding">
              <Button2 />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Body;
