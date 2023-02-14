import React from "react";
import { Doughnut } from "react-chartjs-2";

const htsDoughnutHistoryData = {
  labels: ["male", "female"],
  datasets: [
    {
      data: [1200, 1500],
      backgroundColor: ["#00d25b", "#ffab00"],
    },
  ],
};

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: true,
  segmentShowStroke: false,
  cutoutPercentage: 70,
  elements: {
    arc: {
      borderWidth: 0,
    },
  },
  legend: {
    display: false,
  },
  tooltips: {
    enabled: true,
  },
};

function TxCurrGender() {
  return (
      <div className="col-md-4 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title small">TxCurr By Gender</h4>
            <div className="aligner-wrapper d-flex">
              <Doughnut
                data={htsDoughnutHistoryData}
                options={doughnutOptions}
              />

              <div className="absolute center-content">
                <h5 className="font-weight-normal text-light text-center mb-2">
                  77,211
                </h5>
                <p className="text-small text-muted text-center mb-0">Total</p>
              </div>
            </div>
            <div className="bg-gray-dark d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
              <div className="text-md-center text-xl-left">
                <h6 className="mb-1">Total patients on ART</h6>
                <p className="text-muted mb-0">Male and Female</p>
              </div>
              <div className="align-self-center flex-grow text-right text-md-center text-xl-right py-md-2 py-xl-0">
                <h6 className="font-weight-bold mb-0 text-warning">7,211</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default TxCurrGender;