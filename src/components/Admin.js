import React, { useState, useEffect } from "react";
import axios from "axios";
const Admin = () => {
  const [invite, setInvite] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3010/readlistguest/");
      setInvite(response.data);
      console.log("here", response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="arrayAdmin">
        {invite.map((listInvite, index) => {
          return (
            <div className="array">
              <table>
                <td className="responseTitle">
                  <tr>Nom :</tr>
                  <tr>Prenom :</tr>
                  <tr>Présence :</tr>
                  <tr>Numéro de Tel. :</tr>
                  <tr>Nb Adulte :</tr>
                  <tr>Nb Enfant :</tr>
                </td>
                <hr className="hrArray" />
              </table>
              <table>
                <td className="responseInvit">
                  <tr>
                    {listInvite.name === undefined ? "X" : listInvite.name}
                  </tr>
                  <tr>
                    {listInvite.firstname === undefined
                      ? "X"
                      : listInvite.firstname}
                  </tr>
                  <tr>
                    {listInvite.presence === undefined
                      ? "X"
                      : listInvite.presence}
                  </tr>
                  <tr>
                    {listInvite.numberPhone === undefined
                      ? "X"
                      : listInvite.numberPhone}
                  </tr>
                  <tr>
                    {listInvite.numberAdult === undefined
                      ? "X"
                      : listInvite.numberAdult}
                  </tr>
                  <tr>
                    {listInvite.numberChildren === undefined
                      ? "X"
                      : listInvite.numberChildren}
                  </tr>
                </td>
                <hr className="hrArray" />
              </table>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Admin;
