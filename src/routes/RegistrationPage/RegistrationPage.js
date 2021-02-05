import React, { Component } from "react";
import RegistrationForm from "../RegistrationForm/RegistrationForm";

export default class LoginPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  };

  render() {
    return (
      <section className="RegistrationPage">
        <h2>Sign Up</h2>
        <RegistrationForm />
      </section>
    );
  }
}
