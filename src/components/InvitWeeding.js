import React, { useState, useEffect } from "react";
import axios from "axios";

import BackHome from "../containers/BackHome";

const InvitWeeding = () => {
  const [presence, setPresence] = useState(null);
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [numberPhone, setNumberPhone] = useState(undefined);
  const [nbOfAdult, setNbOfAdult] = useState(undefined);
  const [nbOfChildren, setNbOfChildren] = useState(undefined);
  const [guest, setGuest] = useState(undefined);
  const [childrenAllowed, setChildrenAllowed] = useState();
  const [childrenOk, setChildrenOk] = useState();

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

  const childrenTrue = async () => {
    try {
      const responseChildren = await axios.get(
        "http://localhost:3010/readlistchildren"
      );
      setChildrenOk(responseChildren.data);
      console.log("test 11", childrenOk);
      console.log("test 22", childrenOk[1].firstname);
      console.log("test 55", responseChildren.data[1].firstname);
    } catch (error) {
      console.log("error");
    }
  };

  let firstNameAllowedChildren = [];
  console.log("test1", firstNameAllowedChildren);

  let nameAllowedChildren = [];
  console.log("test2", nameAllowedChildren);
  if (childrenOk !== undefined) {
    for (let y = 0; y < childrenOk.length; y++) {
      if (
        firstNameAllowedChildren.indexOf(
          childrenOk[y].firstname.toUpperCase()
        ) === -1
      ) {
        firstNameAllowedChildren.push(childrenOk[y].firstname.toUpperCase());
      }

      if (
        nameAllowedChildren.indexOf(childrenOk[y].name.toUpperCase()) === -1
      ) {
        nameAllowedChildren.push(childrenOk[y].name.toUpperCase());
      }

      console.log("ici");
    }
  }

  console.log("11111", presence);
  console.log("22222", name.length);
  console.log("33333", firstname);
  console.log("44444", numberPhone);
  console.log("55555", nbOfAdult);
  console.log("66666", nbOfChildren);

  let nameAllowedChildrenDELETE = [
    "SUZANNE",
    "COHEN",
    "TOUATI",
    "CATTAN",
    "MAAREK",
    "LUGASSY",
    "ILLARDO",
    "DENIS",
    "SAKOUN",
    "PEYSKENS",
    "BILLON",
    "SAMAMA",
    "FITOUSSI"
  ];
  let firstNameAllowedChildrenDELETE = [
    "ANTHONY",
    "GUILA",
    "STEPHANE",
    "JONATHAN",
    "OLIVIA",
    "ISABELLE",
    "VIRGINIE",
    "RUDY",
    "LUCY",
    "KEVIN",
    "JEREMY",
    "MELANIE",
    "JULIE",
    "GILLES",
    "JENNIFER",
    "VIRGINIE",
    "DANIEL",
    "OLIVIER",
    "VANESSA",
    "SHIRLEY",
    "MICKAEL",
    "BRENDA",
    "DYLAN"
  ];
  const allowedChildren = () => {
    // Nom & Prénom des invités qui ont été invité avec leur enfant

    if (
      // Si ils sont dans le tableau on passe le state à 1 (Qui permettera de proposer le nombre d'adulte et nombre d'enfant)
      nameAllowedChildren.indexOf(name.toUpperCase()) !== -1 &&
      firstNameAllowedChildren.indexOf(firstname.toUpperCase()) !== -1
    ) {
      setChildrenAllowed(1);
    } else if (
      nameAllowedChildren.indexOf(name.toUpperCase()) !== -1 &&
      firstNameAllowedChildren.indexOf(firstname.toUpperCase()) === -1 &&
      firstname.length >= 3
    ) {
      setChildrenAllowed(2);
    } else if (
      // Si ils ne sont pas dans le tableau alors on passe le state à 2 (Qui permettera de proposer uniquement le nombre d'adulte)
      nameAllowedChildren.indexOf(name.toUpperCase()) === -1 &&
      firstNameAllowedChildren.indexOf(firstname.toUpperCase()) === -1 &&
      name.length !== 0 &&
      firstname.length >= 3
    ) {
      setChildrenAllowed(2);
    } else if (name.length === 0 || firstname.length === 0) {
      // Si les champs sont vite, on passe le state à 0 (Qui permettera d'obliger les utilisateurs à remplir les champs pour être attribuer au State 1 ou 2)
      setChildrenAllowed(0);
    }
  };

  useEffect(() => {
    {
      allowedChildren();
    }
    childrenTrue();
  }, [name, firstname]);

  console.log("children", childrenAllowed);
  return (
    <>
      <BackHome />
      <div className="invitWeeding">
        <p className="titleInvitWeeding">
          Veuillez répondre ci-dessous à l'invitation au mariage
        </p>
        <div className="yesorno">
          <div
            className="yes"
            onClick={() => {
              {
                childrenTrue();
              }
            }}
          >
            <label for="Oui">OUI</label>
            <input
              id="Oui"
              type="radio"
              name="Oui"
              value="Oui"
              onChange={presenceChange}
              checked={presence === "Oui" ? true : false}
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
              onChange={presenceChange}
              checked={presence === "Non" ? true : false}
              className="inputRadio"
            />
            <span className="radioButton2"></span>
          </div>
        </div>
        {/* S'ils sont présent on affiche ceci  */}
        {presence === "Oui" ? (
          <>
            <p>NOM</p>
            <input
              placeholder="Entrez votre nom"
              type="text"
              name="name"
              value={name}
              onChange={nameChange}
              className="inputTxt"
            />
            <p>PRENOM</p>
            <input
              placeholder="Entrez votre prénom"
              type="text"
              name="firstName"
              value={firstname}
              onChange={firstnameChange}
              className="inputTxt"
            />
            <p>NUMERO DE TELEPHONE</p>
            <input
              placeholder="Entrez votre numéro de téléphone"
              type="text"
              name="numberPhone"
              value={numberPhone}
              onChange={numberPhoneChange}
              className="inputTxt"
            />
            {/* S'ils sont invités avec leur enfant on leur demande le nombre  */}
            {childrenAllowed === 1 ? (
              <>
                <p>NOMBRE ADULTE</p>
                <input
                  placeholder="Nombre d'adulte"
                  type="number"
                  name="numberOfAdult"
                  value={nbOfAdult}
                  onChange={nbOfAdultChange}
                  className="inputTxt"
                />
                <p>
                  NOMBRE ENFANT{" "}
                  <span className="condChildren">
                    (Enfant de moins de 13 ans)
                  </span>
                </p>
                <input
                  placeholder="Nombre d'enfant"
                  type="number"
                  name="numberOfChildren"
                  value={nbOfChildren}
                  onChange={nbOfChildrenChange}
                  className="inputTxt"
                />
                <br />
                <button
                  className="inputValid"
                  onClick={() => {
                    fetchData();
                    alert("OOOK");
                    setPresence(null);
                    setName("");
                    setFirstname("");
                    setNumberPhone(undefined);
                    setNbOfAdult(undefined);
                    setNbOfChildren(undefined);
                  }}
                >
                  Valider
                </button>{" "}
              </>
            ) : // S'ils ne sont pas invités avec leur enfant on leur demande uniquement le nombre d'adulte
            childrenAllowed === 2 ? (
              <>
                <p>NOMBRE ADULTE</p>
                <input
                  placeholder="Nombre d'adulte"
                  type="number"
                  name="numberOfAdult"
                  value={nbOfAdult}
                  onChange={nbOfAdultChange}
                  className="inputTxt"
                />
                <br />
                <button
                  className="inputValid"
                  onClick={() => {
                    fetchData();
                    alert("OOOK");
                    setName("");
                  }}
                >
                  Valider
                </button>{" "}
              </>
            ) : // Si les champs sont vide, on leur propose rien
            null}
          </>
        ) : // S'il sont absent on leur affiche que ceci :
        presence === "Non" ? (
          <>
            <div className="responseNo">
              <p>NOM</p>
              <input
                placeholder="Entrez votre nom"
                type="text"
                name="name"
                value={name}
                onChange={nameChange}
                className="inputTxt"
              />
              <p>PRENOM</p>
              <input
                placeholder="Entrez votre prénom"
                type="text"
                name="firstName"
                value={firstname}
                onChange={firstnameChange}
                className="inputTxt"
              />
              <button
                className="inputValid"
                onClick={() => {
                  fetchData();
                  alert("OOOK");
                  setName("");
                }}
              >
                Valider
              </button>
            </div>
          </>
        ) : //S'ils répondent rien, alors on leur propose rien
        null}
      </div>
    </>
  );
};

export default InvitWeeding;
