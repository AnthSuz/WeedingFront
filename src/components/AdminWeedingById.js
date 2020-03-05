import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import BackHome from "../containers/BackHome";
import Input from "../containers/Input";

import * as inputParams from "../containers/inputParams";

function AdminWeedingById(props) {
  const params = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [screen, setScreen] = useState(false);
  const [editResponse, setEditResponse] = useState(false);
  const [presence, setPresence] = useState();
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [numberPhone, setNumberPhone] = useState("");
  const [nbOfAdult, setNbOfAdult] = useState("");
  const [nbOfChildren, setNbOfChildren] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const id = params.id;
  const invite = props.invite;
  const setInvite = props.setInvite;

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
        body.numberPhone = "";
        body.numberAdult = "";
        body.numberChildren = "";
      }
      await axios.post("http://localhost:3010/guest/update/", body);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3010/guest/read/" + id
        );
        setPresence(response.data.presence);
        setName(response.data.name);
        setFirstname(response.data.firstname);
        setNumberPhone(response.data.numberPhone);
        setNbOfAdult(
          response.data.numberAdult === null ? "" : response.data.numberAdult
        );
        setNbOfChildren(
          response.data.numberChildren === null
            ? ""
            : response.data.numberChildren
        );
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      {isLoading === true ? (
        <p>Chargement</p>
      ) : (
        <>
          <BackHome back="/ListInvit_Admin" where="la liste des réponses" />
          {screen === false ? (
            <div className="adminWeedingById">
              {editResponse === true && <p>Reservation modifié</p>}
              <div className="updateGuest">
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
                <p>PRESENCE</p>
                <div className="yesorno">
                  <div className="yes">
                    <label htmlFor="Oui">OUI</label>
                    <input
                      id="Oui"
                      type="radio"
                      name="Oui"
                      value="Oui"
                      onChange={e => setPresence(e.target.value)}
                      checked={presence === "Oui" ? true : false}
                      className="inputRadio"
                    />
                  </div>
                  <div className="no">
                    <label htmlFor="Non">NON</label>
                    <input
                      id="Non"
                      type="radio"
                      name="Non"
                      value="Non"
                      onChange={e => setPresence(e.target.value)}
                      checked={presence === "Non" ? true : false}
                      className="inputRadio"
                    />
                  </div>
                </div>
                {presence === "Oui" && (
                  <>
                    <Input
                      inputParams={inputParams.Phone}
                      value={numberPhone}
                      onChange={e => setNumberPhone(e.target.value)}
                    />
                    <Input
                      inputParams={inputParams.Adult}
                      value={nbOfAdult}
                      onChange={e => setNbOfAdult(e.target.value)}
                    />
                    <p>NOMBRE ENFANT</p>
                    <Input
                      inputParams={inputParams.Children}
                      value={nbOfChildren}
                      onChange={e => setNbOfChildren(e.target.value)}
                    />
                    <br />
                  </>
                )}
                <>
                  <br />
                  <button
                    onClick={event => {
                      event.preventDefault();
                      setEditResponse(true);
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
                          setScreen(true);
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
              </div>
            </div>
          ) : (
            <p>BONJOUR MONDE</p>
          )}
        </>
      )}
    </>
  );
}

export default AdminWeedingById;
