import React, { useState, useEffect } from "react";
import axios from "axios";

const Children_Admin = () => {
  const [children, setChildren] = useState(undefined);
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");

  const nameChange = event => {
    const value = event.target.value;
    setName(value);
  };

  const firstnameChange = event => {
    const value = event.target.value;
    setFirstname(value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3010/createchildren",
        {
          firstname: firstname,
          name: name
        }
      );
      setChildren(response.data);
      console.log("children", children);
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <>
      <div className="ChildrenAdmin">
        <p>Ajoutez içi les gens invité.e.s avec leur enfants. </p>
        <p>NOM</p>
        <input name="name" value={name} onChange={nameChange} type="text" />
        <p>PRENOM</p>
        <input
          name="firstname"
          value={firstname}
          onChange={firstnameChange}
          type="text"
        />
        <p> </p>
        <button
          onClick={() => {
            fetchData();
            alert("Autorisation ajoutée.");
            setName("");
            setFirstname("");
          }}
        >
          Valider
        </button>
      </div>
    </>
  );
};

export default Children_Admin;
