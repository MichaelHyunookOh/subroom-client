import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Subscription from "../../components/Subscription/Subscription";
import config from "../../config";
import TokenService from "../../services/token-service";
import Header from "../../components/Header/Header";
import "./Dashboard.css";

export default function Dashboard(props) {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    let isMounted = true;
    Promise.all([
      fetch(`${config.API_ENDPOINT}/api/subscriptions`, {
        method: "GET",
        headers: {
          authorization: `bearer ${TokenService.getAuthToken()}`,
        },
      }),
    ])
      .then(([subscriptionsRes]) => {
        return Promise.all([subscriptionsRes.json()]);
      })
      .then(([subscriptions]) => {
        if (isMounted) setSubscriptions(subscriptions);
      })
      .catch((error) => {
        console.log({ error });
      });
    return () => {
      isMounted = false;
    };
  });
  const deleteSubscription = (subscriptionId) => {
    setSubscriptions([
      subscriptions.filter(
        (subscription) => subscription.id !== subscriptionId
      ),
    ]);
  };

  return (
    <section className="DashboardMain">
      <header className="App-header">
        <Header />
      </header>
      <section className="add-new-subscription">
        <Link to="/addSubscription">
          <button>Add New Subscription</button>
        </Link>
      </section>
      <ul>
        {subscriptions.map((subscription) => (
          <li key={subscription.id}>
            <Subscription
              id={subscription.id}
              name={subscription.subscription_name}
              price={subscription.subscription_price}
              username={subscription.subscription_user_name}
              password={subscription.subscription_password}
              category={subscription.category}
              deleteSubscription={deleteSubscription}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
