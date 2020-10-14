import React, { useState } from "react";
import { withRouter, Link, useHistory } from "react-router-dom";
import TokenService from "../../services/token-service";
import AuthService from "../../services/auth-service";
import "./LoginForm.css";

function LoginForm(props) {
  const [error, setError] = useState(null);
  const { push } = useHistory();

  const handleSubmitJwtAuth = (ev) => {
    ev.preventDefault();
    setError(null);
    const { user_name, password } = ev.target;

    AuthService.postLogin({
      user_name: user_name.value,
      password: password.value,
    })
      .then((res) => {
        user_name.value = "";
        password.value = "";
        TokenService.saveAuthToken(res.authToken);
        push("/dashboard");
      })
      .catch((error) => {
        setError(error);
        console.log(error);
      });
  };

  return (
    <section className="LoginPage">
      <h2>Login</h2>
      <form className="LoginForm" onSubmit={handleSubmitJwtAuth}>
        <div role="alert">{error && <p className="red">{error.error}</p>}</div>
        <div className="Login_name">
          <label htmlFor="Login__user_name">User Name</label>
          <input required type="text" id="user_name" name="user_name"></input>
        </div>
        <div className="Login_password">
          <label htmlFor="Login__password">Password</label>
          <input required type="password" id="password" name="password"></input>
        </div>
        <button type="submit" className="LoginPageButton">
          Login
        </button>
        <Link to="/">
          <button className="goBackButton">Go Back</button>
        </Link>
      </form>
    </section>
  );
}

export default withRouter(LoginForm);
