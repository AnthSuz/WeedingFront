import React, { useState, useEffect } from "react";
import axios from "axios";
import BackHome from "../containers/BackHome";

function AdminWeedingById(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [response, setResponse] = useState();
  const [presence, setPresence] = useState(null);
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [numberPhone, setNumberPhone] = useState(undefined);
  const [nbOfAdult, setNbOfAdult] = useState(undefined);
  const [nbOfChildren, setNbOfChildren] = useState(undefined);

  const id = props.match.params.id;

  console.log("props", props.match.params.id);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3010/readlistguest/" + id
      );
      setResponse(response.data);
      setPresence(response.data.presence);
      setName(response.data.name);
      setFirstname(response.data.firstname);
      setNumberPhone(response.data.numberPhone);
      setNbOfAdult(response.data.numberAdult);
      setNbOfChildren(response.data.numberChildren);

      setIsLoading(false);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateData = async () => {
    let body = {
      _id: id,
      presence: presence,
      name: name,
      firstname: firstname,
      numberPhone: numberPhone,
      numberAdult: nbOfAdult,
      numberChildren: nbOfChildren
    };
    try {
      if (presence === "Non") {
        body.numberPhone = undefined;
        body.numberAdult = undefined;
        body.numberChildren = undefined;
      }
      const response = await axios.post(
        "http://localhost:3010/listguest/update/",
        body
      );
    } catch (error) {
      console.log(error.message);
    }
  };

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

  console.log("state", response);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {isLoading === true ? (
        <p>Chargement</p>
      ) : (
        <>
          <BackHome back="/ListInvit_Admin" where="la liste des réponses" />
          <div className="adminWeedingById">
            <form>
              <p>NOM</p>
              <input
                type="text"
                name="name"
                value={name}
                onChange={nameChange}
              />
              <p>PRENOM</p>
              <input
                type="text"
                name="firstname"
                value={firstname}
                onChange={firstnameChange}
              />
              <p>PRESENCE</p>
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
                </div>
              </div>
              {presence === "Oui" ? (
                <>
                  <p>NUMERO TEL.</p>
                  <input
                    type="text"
                    name="numberPhone"
                    value={numberPhone}
                    onChange={numberPhoneChange}
                  />
                  <p>NOMBRE ADULTE</p>
                  <input
                    type="number"
                    name="numberAdult"
                    value={nbOfAdult}
                    onChange={nbOfAdultChange}
                  />
                  <p>NOMBRE ENFANT</p>
                  <input
                    type="number"
                    name="numberChildren"
                    value={nbOfChildren}
                    onChange={nbOfChildrenChange}
                  />
                  <br />
                  <div className="buttonValid">
                    <button
                      onClick={event => {
                        event.preventDefault();
                        updateData();
                      }}
                    >
                      VALIDER
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <button
                    onClick={event => {
                      event.preventDefault();
                      updateData();
                    }}
                  >
                    VALIDER
                  </button>
                </>
              )}
            </form>
          </div>
        </>
      )}
    </>
  );
}

export default AdminWeedingById;
