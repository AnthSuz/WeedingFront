import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import BackHome from "../containers/BackHome";
import YesOrNo from "../containers/YesOrNo";
import Input from "../containers/Input";
import ValidForm from "../containers/ValidForm";
import { Api } from "../containers/Global";
import * as inputParams from "../containers/inputParams";

function InvitWeeding() {
  const history = useHistory();
  const [presence, setPresence] = useState(null);
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [numberPhone, setNumberPhone] = useState("");
  const [nbOfAdult, setNbOfAdult] = useState("");
  const [nbOfChildren, setNbOfChildren] = useState("");
  const [childrenAllowed, setChildrenAllowed] = useState();
  const [childrenOk, setChildrenOk] = useState();
  const [responseError, setResponseError] = useState({
    status: false,
    message: ""
  });

  const createData = async () => {
    try {
      await axios.post(Api + "/guest/create", {
        presence: presence,
        name: name,
        firstname: firstname,
        numberPhone: numberPhone,
        numberAdult: nbOfAdult,
        numberChildren: nbOfChildren
      });
    } catch (error) {
      console.log("error");
    }
  };

  const childrenTrue = async () => {
    try {
      const responseChildren = await axios.get(Api + "/children/read");
      setChildrenOk(responseChildren.data);
    } catch (error) {
      console.log("error");
    }
  };

  let firstNameAllowedChildren = [];
  let nameAllowedChildren = [];

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
    }
  }

  function allowedChildren() {
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
  }

  function childrenAllowedOne() {
    if (numberPhone === "" || numberPhone.length < 10) {
      setResponseError({
        status: true,
        message: "Merci de renseigner votre numéro de téléphone"
      });
    } else if (nbOfAdult === "") {
      setResponseError({
        status: true,
        message: "Merci de renseigner le nombre d'adulte"
      });
    } else if (nbOfChildren === "") {
      setResponseError({
        status: true,
        message: "Merci de renseigner le nombre d'enfant"
      });
    } else {
      createData();
      history.push("/Valid_Invit");
      setPresence(null);
      setName("");
      setFirstname("");
      setNumberPhone("");
      setNbOfAdult("");
      setNbOfChildren("");
    }
  }

  function childrenAllowedTwo() {
    if (numberPhone === "" || numberPhone.length < 10) {
      setResponseError({
        status: true,
        message: "Merci de renseigner votre numéro de téléphone"
      });
    } else if (nbOfAdult === "") {
      setResponseError({
        status: true,
        message: "Merci de renseigner le nombre d'adulte"
      });
    } else {
      createData();
      history.push("/Valid_Invit");
      setPresence(null);
      setName("");
      setFirstname("");
      setNumberPhone("");
      setNbOfAdult("");
    }
  }

  function responseNo() {
    if (name.length < 2) {
      setResponseError({
        status: true,
        message: "Merci de renseigner votre nom"
      });
    } else if (firstname.length < 2) {
      setResponseError({
        status: true,
        message: "Merci de renseigner votre prénom"
      });
    } else {
      createData();
      history.push("/Valid_Invit");
      setName("");
      setFirstname("");
    }
  }

  useEffect(() => {
    allowedChildren();
    childrenTrue();
  }, [name, firstname]);

  return (
    <>
      <BackHome back="/Home" where="l'acceuil" />
      <div className="invitWeeding">
        <p className="titleInvitWeeding">
          Veuillez répondre ci-dessous à l'invitation au mariage
        </p>
        <YesOrNo
          onClick={childrenTrue}
          onChange={e => setPresence(e.target.value)}
          checked={presence}
        />
        {/* S'ils sont présent on affiche ceci  */}
        {presence === "Oui" ? (
          <>
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
            <Input
              inputParams={inputParams.Phone}
              value={numberPhone}
              onChange={e => setNumberPhone(e.target.value)}
            />
            {/* S'ils sont invités avec leur enfant on leur demande le nombre  */}
            {childrenAllowed === 1 ? (
              <>
                <Input
                  inputParams={inputParams.Adult}
                  value={nbOfAdult}
                  onChange={e => setNbOfAdult(e.target.value)}
                />
                <p>
                  NOMBRE ENFANT{" "}
                  <span className="condChildren">
                    (Enfant de moins de 13 ans)
                  </span>
                </p>
                <Input
                  inputParams={inputParams.Children}
                  value={nbOfChildren}
                  onChange={e => setNbOfChildren(e.target.value)}
                />
                <br />
                {responseError.status && (
                  <p className="responseError">{responseError.message}</p>
                )}
                <ValidForm onClick={childrenAllowedOne} />
              </>
            ) : // S'ils ne sont pas invités avec leur enfant on leur demande uniquement le nombre d'adulte
            childrenAllowed === 2 ? (
              <>
                <Input
                  inputParams={inputParams.Adult}
                  value={nbOfAdult}
                  onChange={e => setNbOfAdult(e.target.value)}
                />
                <br />
                {responseError.status && (
                  <p className="responseError">{responseError.message}</p>
                )}
                <ValidForm onClick={childrenAllowedTwo} />
              </>
            ) : // Si les champs sont vide, on leur propose rien
            null}
          </>
        ) : // S'il sont absent on leur affiche que ceci :
        presence === "Non" ? (
          <>
            <div className="responseNo">
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
              {responseError.status && (
                <p className="responseError">{responseError.message}</p>
              )}
              <ValidForm onClick={responseNo} />
            </div>
          </>
        ) : //S'ils répondent rien, alors on leur propose rien
        null}
      </div>
    </>
  );
}

export default InvitWeeding;
