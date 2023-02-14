import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

function TxCurrByMonth() {
  const [isLoading, setIsLoading] = useState(false);
  const [txCurrData, setTxCurrData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getTxCurrData();
  }, []);

  // function to fetch the data
  const getTxCurrData = async () => {
    const response = await axios.get("http://localhost:5000/fingerprints");
    setTxCurrData(response.data);
    setIsLoading(false);
  };

  let clonedData = txCurrData;

  // Count the number of people receiving ART per month
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let counts = new Array(12).fill(0);
  clonedData.forEach((report) => {
    counts[report.month - 1]++;
  });

  const data = {
    labels: months,
    datasets: [
      {
        label: "Number of people receiving ART",
        data: counts,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
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
            TxCurr By Month
          </h4>
          <div className="aligner-wrapper">
            <div>
              <Bar data={data} options={options} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TxCurrByMonth;
