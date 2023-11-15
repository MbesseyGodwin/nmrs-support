import React, { useState, useEffect } from "react";
import axios from "axios";

// MetricCard component to display each metric with its title, value, and icon
const MetricCard = ({ title, value, iconClass }) => (
  <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
    <div className="card">
      <div className="card-body">
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

// PbsCards component to display different metrics
const PbsCards = () => {
  // State variables for metric data
  const [validPrints, setValidPrints] = useState([]);
  const [patientWithoutPbs, setPatientWithoutPbs] = useState([]);
  const [invalidPrints, setInvalidPrints] = useState([]);
  const [recapture, setRecapture] = useState([]);
  // Loading state to indicate when data is being fetched
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data for different metrics on component mount
  useEffect(() => {
    const fetchData = async (url, setter) => {
      try {
        // Fetch data from the provided URL
        const response = await axios.get(url);
        // Set the fetched data using the provided setter function
        setter(response.data);
      } catch (error) {
        console.error(`Error fetching data: ${error}`);
      } finally {
        // Set loading state to false after data fetching is complete
        setIsLoading(false);
      }
    };

    // Fetch data for each metric using the fetchData function
    fetchData("http://localhost:5000/fingerprints", setValidPrints);
    fetchData("http://localhost:5000/", setPatientWithoutPbs);
    fetchData("http://localhost:5000/", setInvalidPrints);
    fetchData("http://localhost:5000/recapture", setRecapture);
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  // Render MetricCard components for each metric
  return (
    <div>
      {/* Row to display MetricCard components */}
      <div className="row">
        <MetricCard
          title="Valid PBS"
          value={isLoading ? "Loading..." : validPrints.length}
          iconClass="mdi-human-male-female"
        />
        <MetricCard
          title="Patients without PBS"
          value="NOT SET"
          iconClass="mdi-magnify-minus"
        />
        <MetricCard
          title="Invalid Prints"
          value="NOT SET"
          iconClass="mdi-magnify-plus"
        />
        <MetricCard
          title="Recaptured Prints"
          value={isLoading ? "Loading..." : recapture.length}
          iconClass="mdi-shield-half-full"
        />
      </div>
    </div>
  );
};

export default PbsCards;
