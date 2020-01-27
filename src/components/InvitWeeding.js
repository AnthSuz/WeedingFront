import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const InvitWeeding = () => {
  const [presence, setPresence] = useState(null);
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [numberPhone, setNumberPhone] = useState(undefined);
  const [nbOfAdult, setNbOfAdult] = useState(undefined);
  const [nbOfChildren, setNbOfChildren] = useState(undefined);
  const [guest, setGuest] = useState(undefined);
  const [childrenAllowed, setChildrenAllowed] = useState();
  // const [test, setTest] = useState(0);

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
  console.log("22222", name.length);
  console.log("33333", firstname);
  console.log("44444", numberPhone);
  console.log("55555", nbOfAdult);
  console.log("66666", nbOfChildren);

  const allowedChildren = () => {
    let nameAllowedChildren = ["Suzanne"];
    let firstNameAllowedChildren = ["Anthony"];
    if (
      nameAllowedChildren.indexOf(name) !== -1 &&
      firstNameAllowedChildren.indexOf(firstname) !== -1
    ) {
      setChildrenAllowed(1);
    } else if (
      nameAllowedChildren.indexOf(name) === -1 &&
      firstNameAllowedChildren.indexOf(firstname) === -1 &&
      name.length !== 0 &&
      firstname.length >= 3
    ) {
      setChildrenAllowed(2);
    } else if (name.length === 0 || firstname.length === 0) {
      setChildrenAllowed(0);
    }
  };

  useEffect(() => {
    {
      allowedChildren();
    }
  }, [name, firstname]);
  console.log("children", childrenAllowed);
  return (
    <>
      {/* {test2()} */}
      {/* {test === 1 ? <div>je suis le plus fort</div> : <div>je suis pas la</div>} */}
      <Link to="/Home">
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
      <div className="invitWeeding">
        <p>Invitation Weeding</p>
        <p>PRESENCE AU MARIAGE</p>
        <div className="yesorno">
          <div className="yes">
            <label for="Oui">OUI</label>
            <input
              id="Oui"
              type="radio"
              name="Oui"
              value="Oui"
              onChange={presenceChange}
              checked={presence === "Oui" ? true : false}
            />
          </div>
          <div className="no">
            <label for="Non">NON</label>
            <input
              id="Non"
              type="radio"
              name="Non"
              value="Non"
              onChange={presenceChange}
              checked={presence === "Non" ? true : false}
            />
          </div>
        </div>
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
            {childrenAllowed === 1 ? (
              <>
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
                </button>{" "}
              </>
            ) : childrenAllowed === 2 ? (
              <>
                <p>NOMBRE ADULTE</p>
                <input
                  placeholder="Nombre d'adulte"
                  type="number"
                  name="numberOfAdult"
                  value={nbOfAdult}
                  onChange={nbOfAdultChange}
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
                </button>{" "}
              </>
            ) : null}
          </>
        ) : presence === "Non" ? (
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
        ) : null}
      </div>
    </>
  );
};

export default InvitWeeding;
