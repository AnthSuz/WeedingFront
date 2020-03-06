import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import BackHome from "../../newComponents/BackHome";
import Input from "../../newComponents/Input";
import * as inputParams from "../../newComponents/inputParams";

function ResponseListAdmin(props) {
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
      <BackHome back="/admin/home_admin" where="l'acceuil admin" />
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
                pathname:
                  "/admin/response_list_weeding_by_id_admin/" + listInvite._id
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

export default ResponseListAdmin;
