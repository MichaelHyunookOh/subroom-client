import React, { useState, useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import config from "../../config";
import TokenService from "../../services/token-service";
import "./EditSubscription.css";

function EditSubscription(props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [category, setCategory] = useState("");

  const { push } = useHistory();

  useEffect(() => {
    let isMounted = true;
    const subscriptionId = props.match.params.subscriptionId;
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
        if (isMounted) {
          setName(responseData.subscription_name);
          setPrice(responseData.subscription_price);
          setUsername(responseData.subscription_user_name);
          setPassword(responseData.subscription_password);
          setCategory(responseData.category);
        }
      })
      .catch((error) => {});
    return () => {
      isMounted = false;
    };
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValues = {
      subscription_name: name,
      subscription_price: price,
      subscription_user_name: username,
      subscription_password: password,
      category: category,
    };

    fetch(
      `${config.API_ENDPOINT}/api/subscriptions/${props.match.params.subscriptionId}`,
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
        props.updateSubscription(res);
        push("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section className="EditSubscription">
      <h2>Edit Subscription</h2>
      <form className="addSubscription" onSubmit={handleSubmit}>
        <div className="sub_name">
          <label htmlFor="sub-name-input">Name</label>
          <input
            required
            type="text"
            id="sub-name-input"
            name="sub-name-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="sub_user">
          <label htmlFor="sub-username-input">Subscription Username</label>
          <input
            type="text"
            id="sub-username-input"
            name="sub-username-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="sub_password">
          <label htmlFor="sub-password-input">Subscription Password</label>
          <input
            type="text"
            id="sub-password-input"
            name="sub-password-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            onChange={(e) => setCategory(e.target.value)}
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

export default withRouter(EditSubscription);
