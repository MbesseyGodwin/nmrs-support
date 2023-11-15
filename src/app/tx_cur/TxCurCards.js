import React, { useState, useEffect } from "react";
import axios from "axios";

// TxCurCard component to display each TX-CUR metric with its title, value, and icon
const TxCurCard = ({ title, value, iconClass }) => (
  <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
    <div className="card">
      <div className="card-body carousel-item active">
        {/* Row for metric value, icon, and label */}
        <div className="row">
          <div className="col-9">
            <div className="d-flex align-items-center align-self-start">
              {/* Display metric value */}
              {value ? <h3 className="mb-0">{value}</h3> : <p className="text-danger">NOT SET</p>}
            </div>
          </div>
          {/* Metric icon */}
          <div className="col-3">
            <div className={`icon icon-box-success`}>
              <span className={`mdi ${iconClass} icon-item`}></span>
            </div>
          </div>
        </div>
        {/* Metric label */}
        <h6 className="font-weight-normal small">{title}</h6>
      </div>
    </div>
  </div>
);

// TxCurCards component to fetch and display different TX-CUR metrics
const TxCurCards = () => {
  // State variables for TX-CUR results and loading status
  const [txCurResults, setTxCurResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch data for TX-CUR metrics on component mount
  useEffect(() => {
    const getTxCurResults = async () => {
      setIsLoading(true);
      try {
        // Fetch data from the provided URL
        const response = await axios.get("http://localhost:5000/");
        // Set the fetched data using the provided setter function
        setTxCurResults(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        // Set loading state to false after data fetching is complete
        setIsLoading(false);
      }
    };
    getTxCurResults();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  // Render TxCurCard components for each TX-CUR metric
  return (
    <div>
      <div className="row">
        <TxCurCard
          title="Ever Enrolled"
          value={isLoading ? "Loading..." : "NOT SET"}
          iconClass="mdi-human-male-female"
        />
        <TxCurCard
          title="Tx Cur"
          value={isLoading ? "Loading..." : "NOT SET"}
          iconClass="mdi-magnify-minus"
        />
        <TxCurCard
          title="Tx New"
          value={isLoading ? "Loading..." : "NOT SET"}
          iconClass="mdi-magnify-plus"
        />
        <TxCurCard
          title="Net New"
          value={isLoading ? "Loading..." : "NOT SET"}
          iconClass="mdi-shield-half-full"
        />
      </div>
    </div>
  );
};

export default TxCurCards;
