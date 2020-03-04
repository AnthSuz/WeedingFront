import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

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
  const [confirmDelete, setConfirmDelete] = useState(false);

  const params = useParams();
  const id = params.id;
  const history = useHistory();
  const invite = props.invite;
  const setInvite = props.setInvite;
  console.log("invite", props.invite);

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

  const removeData = async () => {
    try {
      await axios.post("http://localhost:3010/guest/delete/" + id);
    } catch (error) {
      console.log("error");
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
                    <button
                      onClick={event => {
                        event.preventDefault();
                        setConfirmDelete(true);
                      }}
                    >
                      SUPPRIMER
                    </button>
                    {confirmDelete && (
                      <>
                        <p>
                          Etes vous sur de vouloir supprimer cette reservation ?
                        </p>
                        <button
                          onClick={() => {
                            removeData();
                            const newListInvit = [...invite];
                            newListInvit.filter(item => item._id !== id);
                            setInvite(newListInvit);
                            history.push("/ListInvit_Admin");
                          }}
                        >
                          OUI
                        </button>
                        <button
                          onClick={() => {
                            setConfirmDelete(false);
                          }}
                        >
                          NON
                        </button>
                      </>
                    )}
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
                  <button
                    onClick={event => {
                      event.preventDefault();
                      setConfirmDelete(true);
                    }}
                  >
                    SUPPRIMER
                  </button>
                  {confirmDelete && (
                    <>
                      <p>
                        Etes vous sur de vouloir supprimer cette reservation ?
                      </p>
                      <button
                        onClick={() => {
                          removeData();
                          const newListInvit = [...invite];
                          newListInvit.filter(item => item._id !== id);
                          setInvite(newListInvit);

                          history.push("/ListInvit_Admin");
                        }}
                      >
                        OUI
                      </button>
                      <button
                        onClick={() => {
                          setConfirmDelete(false);
                        }}
                      >
                        NON
                      </button>
                    </>
                  )}
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
