import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import config from "../../config";
import TokenService from "../../services/token-service";
import "./AddSubscription.css";

export default function AddSubscription(props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { push } = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSubscription = {
      subscription_name: name,
      subscription_price: price,
      subscription_user_name: username,
      subscription_password: password,
      category: category,
    };
    fetch(`https://www.subroom-server.tk/api/subscriptions`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(newSubscription),
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .then((subscription) => {
        props.addSubscription(subscription);
        push("/dashboard");
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  return (
    <section className="add_subscription">
      <form className="addSubscription" onSubmit={handleSubmit}>
        <h2>Add Subscription</h2>

        <div className="sub_name">
          <label htmlFor="sub-name-input">Name</label>
          <input
            required
            type="text"
            id="sub-name-input"
            name="sub-name-input"
            onChange={(e) => setName(e.target.value)}
          ></input>
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
            id="sub-category-input"
            name="sub-category-input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">None</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
        </div>
        <button type="submit" className="addButton">
          Add Subscription
        </button>
      </form>
    </section>
  );
}
