import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

import Input from "../containers/Input";
import * as inputParams from "../containers/inputParams";

function LoginAdmin(props) {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [msgError, setMsgError] = useState("error");

  const setError = msgError => {
    setMsgError(msgError);
    setIsError(true);
  };

  const checkParams = () => {
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
  };

  const getLogin = async () => {
    if (checkParams()) {
      try {
        const response = await axios.post(
          "http://localhost:3010/user/login",
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
          history.push("/Admin_Home");
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
    <>
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
        <input type="submit" value="Se connecter" />
      </form>
    </>
  );
}

export default LoginAdmin;
