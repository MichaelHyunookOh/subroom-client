import React from "react";
import { Link, withRouter } from "react-router-dom";
import config from "../../config";
import TokenService from "../../services/token-service";
import "./Subscription.css";

function Subscription(props) {
  const deleteSubscriptionRequest = () => {
    fetch(`${config.API_ENDPOINT}/api/subscriptions/${props.id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => {
            throw error;
          });
        }
        props.deleteSubscription(props.id);
      })
      .catch((error) => {
        console.error(error);
      });
    // window.location.reload(false);
  };

  return (
    <section className="subscription-entries">
      <div className="subscriptionInfo">
        <p>Subscription Name: {props.name}</p>
        <p>Monthly Cost: {props.price}</p>
        <p>Subscription Username: {props.username}</p>
        <p>Subscription Password: {props.password}</p>
        <p>Payment Type: {props.category}</p>
      </div>
      <section className="subscription-buttons">
        <button
          className="subscription-delete"
          onClick={deleteSubscriptionRequest}
        >
          Delete
        </button>
        <Link to={`/edit/${props.id}`}>
          <button className="subscription-edit" type="button">
            Edit
          </button>
        </Link>
      </section>
    </section>
  );
}

export default withRouter(Subscription);
