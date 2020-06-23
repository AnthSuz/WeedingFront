import React from "react";

function Button(props) {
  return (
    <div id={props.id} onClick={props.onClick}>
      <div className={props.className}>
        <p>{props.textButton}</p>
      </div>
    </div>
  );
}

export default Button;
