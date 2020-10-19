import React, { useEffect, useState } from "react";
import config from "../../config";
import TokenService from "../../services/token-service";

export default function Total(props) {
  const [total, setTotal] = useState([]);

  useEffect(() => {
    let isMounted = true;
    Promise.all([
      fetch(`${config.API_ENDPOINT}/api/subscriptions/total`, {
        method: "GET",
        headers: {
          authorization: `bearer ${TokenService.getAuthToken()}`,
        },
      }),
    ])
      .then(([res]) => {
        return Promise.all([res.json()]);
      })
      .then(([res]) => {
        if (isMounted) setTotal(res);
      })
      .catch((error) => {
        console.log({ error });
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const renderTotal = () => {
    return total.map((tot, index) => {
      return <h3 key={index}>{tot.total}</h3>;
    });
  };

  return <section>{renderTotal()}</section>;
}
