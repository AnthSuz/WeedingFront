import React from "react";
import { Link } from "react-router-dom";

const BackHome = () => {
  return (
    <>
      <Link to="/Admin_Home">
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
    </>
  );
};

export default BackHome;
