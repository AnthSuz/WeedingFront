import React, { useState, useEffect } from "react";
import axios from "axios";

import BackHome from "../containers/BackHome";
const Children_Admin = () => {
  const [listChildrenAllowed, setListChildrenAllowed] = useState([]);
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [responseCreateChildren, setResponseCreateChildren] = useState({
    status: false,
    message: ""
  });

  const nameChange = event => {
    const value = event.target.value;
    setName(value);
  };

  const firstnameChange = event => {
    const value = event.target.value;
    setFirstname(value);
  };

  const CreateChildrenData = async () => {
    try {
      await axios.post("http://localhost:3010/createchildren", {
        firstname: firstname,
        name: name
      });
      const newListChildrenAllowed = [...listChildrenAllowed];
      newListChildrenAllowed.push({ firstname, name });
      setListChildrenAllowed(newListChildrenAllowed);
    } catch (error) {
      console.log("error");
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3010/readlistchildren"
      );
      setListChildrenAllowed(response.data);
      console.log("fetchData", response.data);
    } catch (error) {
      console.log("error");
    }
  };

  const removeData = async id => {
    try {
      await axios.post("http://localhost:3010/children/delete/" + id);
    } catch (error) {
      console.log("error");
    }
  };

  function CreateChildren() {
    if (name.length <= 0) {
      setResponseCreateChildren({
        status: true,
        message: "Merci d'entrer un nom"
      });
    } else if (firstname.length <= 0) {
      setResponseCreateChildren({
        status: true,
        message: "Merci d'entrer un prénom"
      });
    } else {
      CreateChildrenData();
      setName("");
      setFirstname("");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <BackHome back="/Admin_Home" where="l'acceuil admin" />
      <div className="ChildrenAdmin">
        <p>Ajoutez içi les gens invité.e.s avec leurs enfants. </p>
        <p>NOM</p>
        <input name="name" value={name} onChange={nameChange} type="text" />
        <p>PRENOM</p>
        <input
          name="firstname"
          value={firstname}
          onChange={firstnameChange}
          type="text"
        />
        {responseCreateChildren.status && (
          <h4>{responseCreateChildren.message}</h4>
        )}
        <button
          onClick={() => {
            CreateChildren();
          }}
        >
          Valider
        </button>
        <h4>Liste des personnes invitées avec leurs enfants</h4>
      </div>
      <div className="listChildren">
        {listChildrenAllowed.map((item, index) => {
          return (
            <>
              <div className="listChildrenInside">
                <p>
                  {item.firstname} {item.name}{" "}
                </p>
                <button
                  onClick={() => {
                    removeData(item._id);
                    const newListTemp = [...listChildrenAllowed];
                    newListTemp.splice(index, 1);
                    setListChildrenAllowed(newListTemp);
                  }}
                >
                  X
                </button>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Children_Admin;
