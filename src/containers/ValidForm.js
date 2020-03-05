import React from "react";

function ValidForm(props) {
  return (
    <button
      className="inputValid"
      onClick={() => {
        props.onClick();
      }}
    >
      Valider
    </button>
  );
}

export default ValidForm;
