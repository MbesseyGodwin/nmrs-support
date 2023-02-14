import React from "react";
import { Bar } from "react-chartjs-2";

const HtsHistory = () => {
  const data = {
    labels: ["October", "November", "December", "January", "Febuary", "March"],
    datasets: [
      {
        label: "Negative",
        backgroundColor: "rgba(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        data: [65, 59, 80, 81, 56, 55],
      },
      {
        label: "Positive",
        backgroundColor: "rgba(54, 162, 235)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 0,
        data: [28, 48, 40, 19, 86, 27],
      },
    ],
  };

  const options = {
    responsive: true,
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
    <div className="col-md-6 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title small">HTS History</h4>
          <div className="aligner-wrapper">
            <Bar data={data} options={options} />
          </div>
          <div className="bg-gray-dark d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
            <div className="text-md-center text-xl-left">
              <h6 className="mb-1">Record Set</h6>
              <p className="text-muted mb-0">Total tested</p>
            </div>
            <div className="align-self-center flex-grow text-right text-md-center text-xl-right py-md-2 py-xl-0">
              <h6 className="font-weight-bold mb-0 text-success">1200</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HtsHistory;
