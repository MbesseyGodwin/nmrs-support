import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import { Line, Bar, Polar, Radar } from "react-chartjs-2";

import { Doughnut } from "react-chartjs-2";
import HtsAnalysis from "../hts/HtsAnalysis";
import DoughnutChart from "../charts/DoughnutChart";
// import "./dashboard.css";

const data = [
    { category: "Male", value: 326 },
    { category: "Female", value: 510 },
];

const options = {
    colors: ["#FFC107", "#4CAF50"],
    innerRadius: 50,
    startAngle: -90,
    endAngle: 270,
};

 // Dummy data for Line Chart
 const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
        {
            label: "VL Data",
            data: [120, 210, 180, 280, 250],
            borderColor: "#2196F3",
            backgroundColor: "rgba(33, 150, 243, 0.2)",
            borderWidth: 2,
        },
    ],
};

// Dummy data for Bar Chart
const barChartData = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple"],
    datasets: [
        {
            label: "Colors Count",
            data: [12, 19, 3, 5, 2],
            backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4CAF50",
                "#9C27B0",
            ],
            borderWidth: 1,
        },
    ],
};

   // Dummy data for Polar Area Chart
   const polarAreaChartData = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple"],
    datasets: [
        {
            data: [12, 19, 3, 5, 2],
            backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4CAF50",
                "#9C27B0",
            ],
            label: "Color Distribution",
        },
    ],
};

// Dummy data for Radar Chart
const radarChartData = {
    labels: ["Strength", "Speed", "Agility", "Intelligence", "Stamina"],
    datasets: [
        {
            label: "Superhero Abilities",
            backgroundColor: "rgba(33, 150, 243, 0.2)",
            borderColor: "#2196F3",
            pointBackgroundColor: "#2196F3",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "#2196F3",
            data: [90, 75, 85, 80, 70],
        },
    ],
};

export default function DashboardSlides() {
    return (
        <Carousel className="col-md-7 grid-margin stretch-card">
            <Carousel.Item interval={5000}>
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">ART Gender Category</h4>
                        <div className="aligner-wrapper">
                            <DoughnutChart data={data} options={options} />
                        </div>
                        {/* <div className="bg-gray-dark d-flex d-md-block justify-content-between d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
                            <div className="text-md-center text-xl-left">
                                <h6 className="mb-1">Female on ART: <span className="font-weight-bold mb-0 text-success">510</span></h6>
                                <p className="text-muted mb-0">
                                    Total females ever enrolled
                                </p>
                            </div>
                            <div className="text-md-center text-xl-left">
                                <h6 className="mb-1">Male on ART: <span className="font-weight-bold mb-0 text-success">326</span></h6>
                                <p className="text-muted mb-0">Total Male ever enrolled</p>
                            </div>
                        </div> */}
                    </div>
                </div>
            </Carousel.Item>


            <Carousel.Item interval={5000}>
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">ART Age Category</h4>
                        <div className="aligner-wrapper">
                            <HtsAnalysis />
                        </div>
                        {/* <div className="bg-gray-dark d-flex d-md-block justify-content-between d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
                            <div className="text-md-center text-xl-left">
                                <h6 className="mb-1">Adults on ART: <span className="font-weight-bold mb-0 text-success">620</span></h6>
                                <p className="text-muted mb-0">
                                    Total Adult
                                </p>
                            </div>
                            <div className="text-md-center text-xl-left">
                                <h6 className="mb-1">Pediatrics on ART: <span className="font-weight-bold mb-0 text-success">110</span></h6>
                                <p className="text-muted mb-0">Total Male ever enrolled</p>
                            </div>
                        </div> */}
                    </div>
                </div>
            </Carousel.Item>

            {/* Additional Line Chart */}
            <Carousel.Item interval={5000}>
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Viral load Trend</h4>
                        <div className="aligner-wrapper">
                            <Line data={lineChartData} />
                        </div>
                    </div>
                </div>
            </Carousel.Item>

            {/* Additional Bar Chart */}
            <Carousel.Item interval={5000}>
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Color Distribution</h4>
                        <div className="aligner-wrapper">
                            <Bar data={barChartData} />
                        </div>
                    </div>
                </div>
            </Carousel.Item>

             {/* Additional Polar Area Chart */}
             <Carousel.Item interval={5000}>
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Color Distribution</h4>
                        <div className="aligner-wrapper">
                            <Polar data={polarAreaChartData} />
                        </div>
                    </div>
                </div>
            </Carousel.Item>

            {/* Additional Radar Chart */}
            <Carousel.Item interval={5000}>
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Superhero Abilities</h4>
                        <div className="aligner-wrapper">
                            <Radar data={radarChartData} />
                        </div>
                    </div>
                </div>
            </Carousel.Item>
        </Carousel>
    )
}