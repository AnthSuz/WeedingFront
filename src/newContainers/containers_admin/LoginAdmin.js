import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory, Link } from "react-router-dom";

import Input from "../../newComponents/Input";
import * as inputParams from "../../newComponents/inputParams";
import { Api } from "../../newComponents/Global";

function LoginAdmin(props) {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [msgError, setMsgError] = useState("error");

  //Function qui gère le message d'erreur
  function setError(msgError) {
    setMsgError(msgError);
    setIsError(true);
  }

  //Function qui vérifie si tous les champs sont remplis
  function checkParams() {
    let result = false;
    if (!email) {
      setError("Email non renseigné");
    } else if (!password) {
      setError("Mot de passe non renseigné");
    } else {
      setMsgError("");
      setIsError(false);
      result = true;
    }
    return result;
  }

  const getLogin = async () => {
    if (checkParams()) {
      try {
        const response = await axios.post(
          Api + "/user/login",
          {
            email: email,
            password: password
          },
          { headers: { Accept: "application/json" } }
        );
        const result = response.data;
        if (result && result.token) {
          Cookies.set("token", result.token, { expires: 1 });
          props.setToken(result.token);
          props.setUsername(result.username);
          history.push("/admin/home_admin");
        } else {
          setError("Mot de passe incorrect");
        }
      } catch (error) {
        console.log(error.message);
        setError("Mot de passe incorrect");
      }
    }
  };

  return (
    <div className="loginAdmin">
      <p>Authentification Admin</p>
      <form
        onSubmit={event => {
          event.preventDefault();
          getLogin();
        }}
      >
        <Input
          inputParams={inputParams.Email}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          inputParams={inputParams.Password}
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <br />
        {isError && <p>{msgError}</p>}
        <input type="submit" value="Connexion" />
        <br />
        <Link to="/">
          <button>Retour sur le site</button>
        </Link>
      </form>
    </div>
  );
}

export default LoginAdmin;
