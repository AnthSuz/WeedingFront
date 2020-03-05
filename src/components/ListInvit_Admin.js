import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import BackHome from "../containers/BackHome";
import Input from "../containers/Input";
import * as inputParams from "../containers/inputParams";

function ListInvitAdmin(props) {
  const [name, setName] = useState("");
  const [filterInvite, setFilterInvite] = useState([]);

  const invite = props.invite;
  const setInvite = props.setInvite;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3010/guest/read");
        setInvite(response.data);
        setFilterInvite(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [setInvite]);

  return (
    <>
      <BackHome back="/Admin_Home" where="l'acceuil admin" />
      <div className="arrayAdmin">
        <Input
          inputParams={inputParams.SearchName}
          value={name}
          onChange={event => {
            const searchName = event.target.value;
            setName(searchName);
            event.preventDefault();
            let filter;
            if (searchName === "") {
              filter = [...invite];
            } else {
              filter = invite.filter(item =>
                item.name.toUpperCase().includes(searchName.toUpperCase())
              );
            }
            setFilterInvite(filter);
          }}
        />
        {filterInvite.map((listInvite, index) => {
          return (
            <Link
              to={{
                pathname: "/ListInvit/" + listInvite._id
              }}
              key={index}
            >
              <div className="array">
                <div>
                  <p>Nom :</p>
                  <p>Prénom :</p>
                  <p>Présence :</p>
                  <p>Numéro de Tel. :</p>
                  <p>Nb Adulte :</p>
                  <p>Nb Enfant :</p>
                </div>
                <div>
                  <p>{listInvite.name === "" ? "X" : listInvite.name}</p>
                  <p>
                    {listInvite.firstname === "" ? "X" : listInvite.firstname}
                  </p>
                  <p>
                    {listInvite.presence === "" ? "X" : listInvite.presence}
                  </p>
                  <p>
                    {listInvite.numberPhone === ""
                      ? "X"
                      : listInvite.numberPhone}
                  </p>
                  <p>
                    {listInvite.numberAdult === null
                      ? "X"
                      : listInvite.numberAdult}
                  </p>
                  <p>
                    {listInvite.numberChildren === null
                      ? "X"
                      : listInvite.numberChildren}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default ListInvitAdmin;
