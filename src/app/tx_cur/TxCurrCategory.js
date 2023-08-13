import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

function TxCurrCategory() {
  const [isLoading, setIsLoading] = useState(false);
  const [txCurrData, setTxCurrData] = useState([]);
  const [AHD, setAHD] = useState(15);
  const [MMD6, setMMD6] = useState(10);
  const [TB, setTB] = useState(5);


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

  const data = {
    labels: ["AHD", "MMD6", "TB"],
    datasets: [
      {
        label: "Category",
        data: [AHD, MMD6, TB],
        backgroundColor:["rgba(0, 210, 91)", "rgba(0, 210, 91)", "rgba(0, 210, 91)"],
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
          <h4 className="card-title small">TxCurr Category (AHD, MMD6, TB)</h4>
          <div className="aligner-wrapper">
            <Bar data={data} options={options} />
          </div>
          <div className="bg-gray-dark d-flex justify-content-between d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">

            <div className="text-md-center text-xl-left">
              <h6 className="mb-1">AHD</h6>
              <p className="text-muted mb-0">{AHD}</p>
            </div>

            <div className="text-md-center text-xl-left">
              <h6 className="mb-1">MMD6</h6>
              <p className="text-muted mb-0">{MMD6}</p>
            </div>

            <div className="text-md-center text-xl-left">
              <h6 className="mb-1">TB</h6>
              <p className="text-muted mb-0">{TB}</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default TxCurrCategory;
