import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import config from "../../config";
import TokenService from "../../services/token-service";
import "./EditSubscription.css";

class EditSubscription extends Component {
  state = {
    subscription_name: "",
    subscription_price: "",
    subscription_user_name: "",
    subscription_password: "",
    category: "",
  };

  componentDidMount() {
    const subscriptionId = this.props.match.params.subscriptionId;
    fetch(`${config.API_ENDPOINT}/api/subscriptions/${subscriptionId}`, {
      method: "GET",
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
      .then((responseData) => {
        this.setState({
          subscription_name: responseData.subscription_name,
          subscription_price: responseData.subscription_price,
          subscription_user_name: responseData.subscription_user_name,
          subscription_password: responseData.subscription_password,
          category: responseData.category,
        });
      })
      .catch((error) => {});
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const inputValues = {
      subscription_name: this.state.subscription_name,
      subscription_price: this.state.subscription_price,
      subscription_user_name: this.state.subscription_user_name,
      subscription_password: this.state.subscription_password,
      category: this.state.category,
    };

    fetch(
      `${config.API_ENDPOINT}/api/subscriptions/${this.props.match.params.subscriptionId}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${TokenService.getAuthToken()}`,
        },
        body: JSON.stringify(inputValues),
      }
    )
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => {
            throw error;
          });
        }
        this.props.updateSubscription(res);
        this.props.history.push("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const {
      subscription_name,
      subscription_price,
      category,
      subscription_user_name,
      subscription_password,
    } = this.state;
    return (
      <section className="EditSubscription">
        <h2>Edit Subscription</h2>
        <form className="addSubscription" onSubmit={this.handleSubmit}>
          <div className="sub_name">
            <label htmlFor="sub-name-input">Name</label>
            <input
              required
              type="text"
              id="sub-name-input"
              name="sub-name-input"
              value={subscription_name}
              onChange={(e) =>
                this.setState({ subscription_name: e.target.value })
              }
            />
          </div>

          <div className="sub_price">
            <label htmlFor="sub-price-input">Price</label>
            <input
              required
              type="number"
              step="0.01"
              id="sub-price-input"
              name="sub-price-input"
              value={subscription_price}
              onChange={(e) =>
                this.setState({ subscription_price: e.target.value })
              }
            />
          </div>

          <div className="sub_user">
            <label htmlFor="sub-username-input">Subscription Username</label>
            <input
              type="text"
              id="sub-username-input"
              name="sub-username-input"
              value={subscription_user_name}
              onChange={(e) =>
                this.setState({ subscription_user_name: e.target.value })
              }
            />
          </div>

          <div className="sub_password">
            <label htmlFor="sub-password-input">Subscription Password</label>
            <input
              type="text"
              id="sub-password-input"
              name="sub-password-input"
              value={subscription_password}
              onChange={(e) =>
                this.setState({ subscription_password: e.target.value })
              }
            />
          </div>

          <div className="sub_category">
            <label htmlFor="sub-category-input">Category</label>
            <select
              required
              type="text"
              id="sub-category-input"
              name="sub-category-input"
              value={category}
              onChange={(e) => this.setState({ category: e.target.value })}
            >
              <option value={null}>...</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>

          <button type="submit" className="editButton">
            Submit
          </button>
        </form>
      </section>
    );
  }
}

export default withRouter(EditSubscription);
