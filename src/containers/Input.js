import React from "react";

function Input(props) {
  const params = props.inputParams;

  return (
    <>
      <p>{params.nom}</p>
      <input
        // className="inputTxt"
        className={params.className}
        placeholder={params.placeholder}
        type={params.type}
        name={params.name}
        value={props.value}
        onChange={props.onChange}
      />
    </>
  );
}

export default Input;
