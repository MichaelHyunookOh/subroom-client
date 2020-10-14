import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import Dashboard from "./routes/Dashboard/Dashboard";
import AddSubscription from "./routes/AddSubscription/AddSubscription";
import LoginForm from "./routes/LoginForm/LoginForm";
import EditSubscription from "./routes/EditSubscription/EditSubscription";
import PublicOnlyRoute from "./components/Utils/PublicOnlyRoute";
import LandingPage from "./routes/LandingPage/LandingPage";
import RegistrationForm from "./routes/RegistrationForm/RegistrationForm";

function App(props) {
  const [subscriptions, setSubscriptions] = useState([]);
  const [hasError, setHasError] = useState(false);

  useEffect((error) => {
    if (error) {
      setHasError(true);
    }
  }, []);

  const handleAddSubscription = (subscription) => {
    setSubscriptions([subscription]);
  };

  const handleUpdateSubscription = (updatedSubscription) => {
    const newSubscriptions = subscriptions.map((sub) =>
      sub.id === updatedSubscription.id ? updatedSubscription : sub
    );
    setSubscriptions([newSubscriptions]);
  };

  return (
    <main className="App">
      <section className="app-with-header">
        {hasError && <p className="red">There was an error! Oh no!</p>}

        <Route exact path="/" component={LandingPage} />
        <Route exact path="/dashboard" component={Dashboard} />

        <Route
          exact
          path="/addSubscription"
          render={() => (
            <AddSubscription addSubscription={handleAddSubscription} />
          )}
        />
      </section>

      <Route
        exact
        path="/edit/:subscriptionId"
        render={() => (
          <EditSubscription updateSubscription={handleUpdateSubscription} />
        )}
      />

      <PublicOnlyRoute exact path={"/login"} component={LoginForm} />

      <PublicOnlyRoute exact path={"/register"} component={RegistrationForm} />
    </main>
  );
}

export default App;
