import React, { useState, useEffect } from "react";
import axios from "axios";

// MetricCard component to display each metric with its title, value, and icon
const MetricCard = ({ title, value, iconClass }) => (
  <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
    <div className="card">
      <div className="card-body carousel-item active">
        {/* Row for metric value, icon, and label */}
        <div className="row">
          <div className="col-9">
            <div className="d-flex align-items-center align-self-start">
              {/* Display metric value */}
              <h3 className="mb-0">{value}</h3>
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

// ViralLoadCards component to display different metrics
const ViralLoadCards = () => {
  // State variables for metric data and loading status
  const [vlData, setVlData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch data for viral load metrics on component mount
  useEffect(() => {
    const getVlData = async () => {
      setIsLoading(true);
      try {
        // Fetch data from the provided URL
        const response = await axios.get("http://localhost:5000/");
        // Set the fetched data using the provided setter function
        setVlData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        // Set loading state to false after data fetching is complete
        setIsLoading(false);
      }
    };
    getVlData();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  // Render MetricCard components for each viral load metric
  return (
    <div>
      <div className="row">
        <MetricCard
          title="Total Eligible"
          value={isLoading ? "Loading..." : "NOT SET"}
          iconClass="mdi-human-male-female"
        />
        <MetricCard
          title="Sample collected"
          value={isLoading ? "Loading..." : "NOT SET"}
          iconClass="mdi-magnify-minus"
        />
        <MetricCard
          title="Total Suppressed"
          value={isLoading ? "Loading..." : "NOT SET"}
          iconClass="mdi-magnify-plus"
        />
        <MetricCard
          title="Total Unsuppressed"
          value="NOT SET"
          iconClass="mdi-shield-half-full"
        />
      </div>
    </div>
  );
};

export default ViralLoadCards;
