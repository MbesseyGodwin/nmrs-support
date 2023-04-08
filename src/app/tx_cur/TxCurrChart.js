import React, { useState, useEffect } from "react";
import axios from "axios";

import { Bar } from "react-chartjs-2";

function TxCurrChart() {
  const [isLoading, setIsLoading] = useState(false);
  const [txCurrData, setTxCurrData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getTxCurrData();
  }, []);

  // function to fetch the data
  const getTxCurrData = async () => {
    const response = await axios.get("http://localhost:5000/");
    setTxCurrData(response.data);
    setIsLoading(false);
  };

  let clonedData = txCurrData;

  const maleCount = clonedData.filter((report) => report.gender === "M").length;
  const femaleCount = clonedData.filter(
    (report) => report.gender === "F"
  ).length;

  const data = {
    labels: ["Adult", "Children"],
    datasets: [
      {
        label: "Number of people receiving ART",
        data: [`${femaleCount}`, `${maleCount}`],
        backgroundColor: ["rgba(255, 99, 132)", "rgba(54, 162, 235)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div className="col-md-4 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title small">
            Number of adults and children currently receiving antiretroviral
            therapy (ART)
          </h4>
          <div className="aligner-wrapper">
            <div>
              <Bar data={data} options={options} />
              <div>
                <div className="bg-gray-dark d-flex d-md-block d-xl-flex justify-content-between flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
                  <div className="text-md-center text-xl-left">
                    <h6 className="mb-1">Total Adult</h6>
                    <p className="text-muted mb-0">
                      {isLoading ? "fetching....." : `${maleCount}`}
                    </p>
                  </div>
                  <div className="text-md-center text-xl-left">
                    <h6 className="mb-1">Total Children</h6>
                    <p className="text-muted mb-0">
                      {isLoading ? "fetching....." : `${femaleCount}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TxCurrChart;
