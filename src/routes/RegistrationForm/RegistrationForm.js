import React, { useState } from "react";
import { withRouter, Link, useHistory } from "react-router-dom";
import AuthService from "../../services/auth-service";
import "./RegistrationForm.css";

function RegistrationForm(props) {
  const [error, setError] = useState(null);
  const { push } = useHistory();

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const { user_name, password } = ev.target;

    setError(null);
    AuthService.postUser({
      user_name: user_name.value,
      password: password.value,
    })
      .then((user) => {
        user_name.value = "";
        password.value = "";
        push("/login");
      })
      .catch((res) => {
        setError(res.error);
      });
  };

  return (
    <form className="RegistrationForm" onSubmit={handleSubmit}>
      <h2>Register</h2>
      <div role="alert">{error && <p className="red">{error}</p>}</div>
      <div className="Registration_name">
        <label htmlFor="Registration__user_name">User Name</label>
        <input required type="text" id="user_name" name="user_name"></input>
      </div>
      <div className="Registration_password">
        <label htmlFor="Registration__password">Password</label>
        <input required type="password" id="password" name="password"></input>
      </div>
      <button className="RegistrationPageButton" type="submit">
        Register
      </button>
      <Link to="/">
        <button className="goBackButton">Go Back</button>
      </Link>
    </form>
  );
}

export default withRouter(RegistrationForm);
