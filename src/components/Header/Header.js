import React, { useState } from "react";
import { Link } from "react-router-dom";
import TokenService from "../../services/token-service";

export default function Header(props) {
  const [, setUpdate] = useState();
  const handleLogoutClick = () => {
    TokenService.clearAuthToken();
    setUpdate();
  };

  const renderLogoutLink = () => {
    return (
      <div className="logged-in">
        <Link onClick={handleLogoutClick} to="/">
          <button className="logout-button">Logout</button>
        </Link>
      </div>
    );
  };

  const renderLoginLink = () => {
    return <div className="not-logged-in"></div>;
  };

  return (
    <nav className="header">
      <h1>Your Subscriptions!</h1>
      {TokenService.hasAuthToken() ? renderLogoutLink() : renderLoginLink()}
    </nav>
  );
}
