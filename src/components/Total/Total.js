import React, { useEffect, useState } from "react";
import config from "../../config";
import "./total.css";
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
  }, [total]);

  const renderTotal = () => {
    return total.map((tot, index) => {
      return (
        <section className="monthly-total">
          <h3>
            <div className="monthly-total-item">Monthly Total</div>{" "}
            <div className="tot">{tot.total}</div>
          </h3>
        </section>
      );
    });
  };

  // const emptyTotal = () => {
  //   return (
  //     <section className="monthly-total">
  //       <h3>
  //         <div className="monthly-total-item">Monthly Total</div>{" "}
  //         <div className="tot">0.00</div>
  //       </h3>
  //     </section>
  //   );
  // };

  return <section className="total">{renderTotal()}</section>;
}
