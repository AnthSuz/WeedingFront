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
      <table>
        <tr className="topArray">
          <td>Nom</td>
          <td>Prenom</td>
          <td>Présence</td>
          <td>Numéro de Tel.</td>
          <td>Nb Adulte</td>
          <td>Nb Enfant</td>
        </tr>
      </table>
      {invite.map((listInvite, index) => {
        return (
          <div className="array">
            <table>
              <tr>
                <td>{listInvite.name}</td>
                <td>{listInvite.firstname}</td>
                <td>{listInvite.presence}</td>
                <td>{listInvite.numberPhone}</td>
                <td>{listInvite.numberAdult}</td>
                <td>{listInvite.numberChildren}</td>
              </tr>
            </table>
          </div>
        );
      })}
    </>
  );
};

export default Admin;
