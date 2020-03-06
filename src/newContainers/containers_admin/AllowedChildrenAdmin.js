import React, { useState, useEffect } from "react";
import axios from "axios";

import BackHome from "../../newComponents/BackHome";
import Input from "../../newComponents/Input";
import * as inputParams from "../../newComponents/inputParams";
import ValidForm from "../../newComponents/ValidForm";

function AllowedChildrenAdmin() {
  const [listChildrenAllowed, setListChildrenAllowed] = useState([]);
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [responseCreateChildren, setResponseCreateChildren] = useState({
    status: false,
    message: ""
  });

  const createData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3010/children/create",
        {
          firstname: firstname,
          name: name
        }
      );
      const id = response.data._id;
      const newListChildrenAllowed = [...listChildrenAllowed];
      newListChildrenAllowed.push({ _id: id, firstname, name });
      setListChildrenAllowed(newListChildrenAllowed);
    } catch (error) {
      console.log("error");
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3010/children/read");
      setListChildrenAllowed(response.data);
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

  // Function du boutton valider
  function createChildren() {
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
      createData();
      setName("");
      setFirstname("");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <BackHome back="/admin/home_admin" where="l'acceuil admin" />
      <div className="ChildrenAdmin">
        <p>Ajoutez içi les gens invité.e.s avec leurs enfants. </p>
        <Input
          inputParams={inputParams.Name}
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <Input
          inputParams={inputParams.Firstname}
          value={firstname}
          onChange={e => setFirstname(e.target.value)}
        />
        {responseCreateChildren.status && (
          <h4>{responseCreateChildren.message}</h4>
        )}
        <ValidForm onClick={createChildren} />
        <h4>Liste des personnes invitées avec leurs enfants</h4>
      </div>
      <div className="listChildren">
        {listChildrenAllowed.map((item, index) => {
          return (
            <div className="listChildrenInside" key={index}>
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
          );
        })}
      </div>
    </>
  );
}

export default AllowedChildrenAdmin;
