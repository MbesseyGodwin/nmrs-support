import React, { Component } from "react";
import Carousel from 'react-bootstrap/Carousel';

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
                        <div className="bg-gray-dark d-flex d-md-block justify-content-between d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
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
                        </div>
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
                        <div className="bg-gray-dark d-flex d-md-block justify-content-between d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
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
                        </div>
                    </div>
                </div>
            </Carousel.Item>
        </Carousel>
    )
}