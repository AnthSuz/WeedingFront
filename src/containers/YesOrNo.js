import React from "react";

function YesOrNo(props) {
  return (
    <div className="yesorno">
      <div
        className="yes"
        onClick={() => {
          {
            props.onClick();
          }
        }}
      >
        <label for="Oui">OUI</label>
        <input
          id="Oui"
          type="radio"
          name="Oui"
          value="Oui"
          onChange={props.onChange}
          checked={props.checked === "Oui" ? true : false}
          className="inputRadio"
        />
      </div>
      <div className="no">
        <label for="Non">NON</label>
        <input
          id="Non"
          type="radio"
          name="Non"
          value="Non"
          onChange={props.onChange}
          checked={props.checked === "Non" ? true : false}
          className="inputRadio"
        />
        <span className="radioButton2"></span>
      </div>
    </div>
  );
}

export default YesOrNo;
