import React, { useState } from "react";
import axios from "axios";

const InvitWeeding = () => {
  const [presence, setPresence] = useState(null);
  const [name, setName] = useState();
  const [firstname, setFirstname] = useState();
  const [numberPhone, setNumberPhone] = useState();
  const [nbOfAdult, setNbOfAdult] = useState();
  const [nbOfChildren, setNbOfChildren] = useState();
  const [guest, setGuest] = useState();

  const presenceChange = event => {
    const value = event.target.value;
    setPresence(value);
  };

  const nameChange = event => {
    const value = event.target.value;
    setName(value);
  };

  const firstnameChange = event => {
    const value = event.target.value;
    setFirstname(value);
  };

  const numberPhoneChange = event => {
    const value = String(event.target.value);
    setNumberPhone(value);
  };

  const nbOfAdultChange = event => {
    const value = event.target.value;
    setNbOfAdult(value);
  };

  const nbOfChildrenChange = event => {
    const value = event.target.value;
    setNbOfChildren(value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.post("http://localhost:3010/createguest/", {
        presence: presence,
        name: name,
        firstname: firstname,
        numberPhone: numberPhone,
        numberAdult: nbOfAdult,
        numberChildren: nbOfChildren
      });
      setGuest(response.data);
      console.log("guest", guest);
    } catch (error) {
      console.log("error");
    }
  };

  console.log("11111", presence);
  console.log("22222", name);
  console.log("33333", firstname);
  console.log("44444", numberPhone);
  console.log("55555", nbOfAdult);
  console.log("66666", nbOfChildren);
  return (
    <>
      <div className="invitWeeding">
        <p>Invitation Weeding</p>
        <p>PRESENCE AU MARIAGE</p>
        <p>OUI</p>
        <input
          type="radio"
          name="Oui"
          value="Oui"
          onChange={presenceChange}
          checked={presence === "Oui" ? true : false}
        />
        <p>NON</p>
        <input
          type="radio"
          name="Non"
          value="Non"
          onChange={presenceChange}
          checked={presence === "Non" ? true : false}
        />
        {presence === "Oui" ? (
          <>
            <p>NOM</p>
            <input
              placeholder="Entrez votre nom"
              type="text"
              name="name"
              value={name}
              onChange={nameChange}
            />
            <p>PRENOM</p>
            <input
              placeholder="Entrez votre prénom"
              type="text"
              name="firstName"
              value={firstname}
              onChange={firstnameChange}
            />
            <p>NUMERO DE TELEPHONE</p>
            <input
              placeholder="Entrez votre numéro de téléphone"
              type="text"
              name="numberPhone"
              value={numberPhone}
              onChange={numberPhoneChange}
            />
            <p>NOMBRE ADULTE</p>
            <input
              placeholder="Nombre d'adulte"
              type="number"
              name="numberOfAdult"
              value={nbOfAdult}
              onChange={nbOfAdultChange}
            />
            <p>NOMBRE ENFANT</p>
            <input
              placeholder="Nombre d'enfant"
              type="number"
              name="numberOfChildren"
              value={nbOfChildren}
              onChange={nbOfChildrenChange}
            />
            <br />
            <button
              onClick={() => {
                fetchData();
                alert("OOOK");
                setName("");
              }}
            >
              Validé
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              fetchData();
              alert("OOOK");
            }}
          >
            Validé
          </button>
        )}
      </div>
    </>
  );
};

export default InvitWeeding;
