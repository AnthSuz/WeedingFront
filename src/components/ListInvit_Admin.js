import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Input from "../containers/Input";
import * as inputParams from "../containers/inputParams";

import BackHome from "../containers/BackHome";

const ListInvitAdmin = props => {
  const [filterInvite, setFilterInvite] = useState([]);
  const [name, setName] = useState("");

  const invite = props.invite;
  const setInvite = props.setInvite;

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3010/readlistguest");
      setInvite(response.data);
      setFilterInvite(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <BackHome back="/Admin_Home" where="l'acceuil admin" />
      <div className="arrayAdmin">
        <form
          onSubmit={event => {
            event.preventDefault();
            fetchData();
          }}
        >
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
        </form>
        {filterInvite.map((listInvite, index) => {
          return (
            <Link
              to={{
                pathname: "/ListInvit/" + listInvite._id
              }}
              key={index}
            >
              <div className="array">
                <div className="list">
                  <p>Nom :</p>
                  <p>Prénom :</p>
                  <p>Présence :</p>
                  <p>Numéro de Tel. :</p>
                  <p>Nb Adulte :</p>
                  <p>Nb Enfant :</p>
                </div>
                <div className="list">
                  <p>{listInvite.name === undefined ? "X" : listInvite.name}</p>
                  <p>
                    {listInvite.firstname === undefined
                      ? "X"
                      : listInvite.firstname}
                  </p>
                  <p>
                    {listInvite.presence === undefined
                      ? "X"
                      : listInvite.presence}
                  </p>
                  <p>
                    {listInvite.numberPhone === undefined
                      ? "X"
                      : listInvite.numberPhone}
                  </p>
                  <p>
                    {listInvite.numberAdult === undefined
                      ? "X"
                      : listInvite.numberAdult}
                  </p>
                  <p>
                    {listInvite.numberChildren === undefined
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
};

export default ListInvitAdmin;
