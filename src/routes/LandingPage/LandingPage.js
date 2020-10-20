import React from "react";
import { Link } from "react-router-dom";
import TokenService from "../../services/token-service";

import "./LandingPage.css";

export default function LandingPage() {
  const login = () => {
    return (
      <section className="buttons">
        <div className="login">
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="register">
          <Link to="/register">
            <button>Sign Up</button>
          </Link>
        </div>
      </section>
    );
  };

  const notLoggedIn = () => {
    return (
      <section className="buttons">
        <div className="login">
          <Link to="/dashboard">
            <button>Dashboard</button>
          </Link>
        </div>
      </section>
    );
  };

  return (
    <main className="landing-page-main">
      <header className="App-header">
        <h1>Welcome to Subroom!</h1>
        <h2>Your subscriptions need a home too</h2>
      </header>
      {TokenService.hasAuthToken() ? notLoggedIn() : login()}
      <section className="description">
        <p>
          {""}
          Your online services are important, and we know that you care about
          them. We also know that you care about keeping track of what you are
          paying for (hopefully). Subroom is designed to organize all of your
          subscriptons/services into one place. Gone are the days of forgetting
          your account information and monthly payments!
        </p>
      </section>
    </main>
  );
}
