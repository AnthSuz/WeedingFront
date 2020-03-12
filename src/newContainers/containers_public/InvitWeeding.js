import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import BackHome from "../../newComponents/BackHome";
import YesOrNo from "../../newComponents/YesOrNo";
import Input from "../../newComponents/Input";
import ValidForm from "../../newComponents/ValidForm";
import { Api } from "../../newComponents/Global";
import * as inputParams from "../../newComponents/inputParams";

function InvitWeeding() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [presence, setPresence] = useState(null);
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [numberPhone, setNumberPhone] = useState("");
  const [nbOfAdult, setNbOfAdult] = useState("");
  const [nbOfChildren, setNbOfChildren] = useState("");
  const [childrenAllowed, setChildrenAllowed] = useState();
  const [childrenOk, setChildrenOk] = useState([]);
  const [responseError, setResponseError] = useState({
    status: false,
    message: ""
  });

  const createData = async () => {
    try {
      setIsLoading(true);
      await axios.post(Api + "/guest/create", {
        presence: presence,
        name: name,
        firstname: firstname,
        numberPhone: numberPhone,
        numberAdult: nbOfAdult,
        numberChildren: nbOfChildren
      });
      setIsLoading(false);
      console.log(1, isLoading);
    } catch (error) {
      setIsLoading(false);
      console.log("error");
    }
  };

  const childrenTrue = async () => {
    if (childrenOk.length === 0) {
      try {
        console.log("childrentruehere");
        setPresence("Oui");
        setIsLoading(true);

        const responseChildren = await axios.get(Api + "/children/read");
        setIsLoading(false);
        console.log(2, "false");
        setChildrenOk(responseChildren.data);
        console.log("childrenOK", childrenOk);
      } catch (error) {
        setIsLoading(false);
        console.log("error");
      }
    }
  };

  let firstNameAllowedChildren = [];
  let nameAllowedChildren = [];

  if (childrenOk !== undefined) {
    //On boucle sur le contenu de l'api children et on push les informations dans les tableaux correspondant
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
      // Si les champs sont vide, on passe le state à 0 (Qui permettera d'obliger les utilisateurs à remplir les champs pour être attribuer au State 1 ou 2)
      setChildrenAllowed(0);
    }
  }

  // Function du boutton validé si la réponse est OUI - AVEC nombre d'enfant
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
      setIsLoading(true);
      console.log(3, isLoading);
      createData();
      history.push("/public/confirm_invit_weeding");
      setPresence(null);
      setName("");
      setFirstname("");
      setNumberPhone("");
      setNbOfAdult("");
      setNbOfChildren("");
    }
  }

  // Function du boutton validé si la réponse est NON - SANS nombre d'enfant
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
      setIsLoading(true);
      console.log(4, isLoading);
      createData();
      history.push("/public/confirm_invit_weeding");
      setPresence(null);
      setName("");
      setFirstname("");
      setNumberPhone("");
      setNbOfAdult("");
    }
  }

  // Function du boutton validé si la réponse est NON
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
      setIsLoading(true);
      console.log(5, isLoading);
      createData();
      history.push("/public/confirm_invit_weeding");
      setName("");
      setFirstname("");
    }
  }

  useEffect(() => {
    if (name.length >= 3 && firstname.length >= 3) {
      console.log("useEffect name firstname", { name }, { firstname });
      allowedChildren();
      childrenTrue();
    } else {
      allowedChildren();
    }
  }, [name, firstname]);
  console.log("presence", presence);

  return (
    <>
      {console.log(7, isLoading)}
      {isLoading === false ? (
        <>
          <BackHome back="/public/home" where="l'acceuil" />
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
          </div>{" "}
        </>
      ) : (
        <p>Chargement</p>
      )}
    </>
  );
}

export default InvitWeeding;
