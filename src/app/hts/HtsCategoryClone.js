import React, { useState, useEffect } from "react";
import axios from "axios";

import { Bar } from "react-chartjs-2";

function HtsCategoryClone() {
    const [isLoading, setIsLoading] = useState(false);
    const [htsData, setHtsData] = useState([]);

    const [adultTotal, setAdultTotal] = useState(0);
    const [adultMale, setAdultMale] = useState(0);
    const [adultFemale, setAdultFemale] = useState(0);
    const [childrenTotal, setChildrenTotal] = useState(0);
    const [childrenMale, setChildrenMale] = useState(0);
    const [childrenFemale, setChildrenFemale] = useState(0);

    useEffect(() => {
        setIsLoading(true);
        const storedData = localStorage.getItem("htsData");
        if (storedData) {
            setHtsData(JSON.parse(storedData));
        } else {
            getTxCurrData();
        }
    }, []);

    const getTxCurrData = async () => {
        const response = await axios.get("http://localhost:5000/htsdatas");
        setHtsData(response.data);
        localStorage.setItem("htsData", JSON.stringify(response.data));
        setIsLoading(false);
    };

    useEffect(() => {
        const initialData = { adultTotal: 0, adultMale: 0, adultFemale: 0, childrenTotal: 0, childrenMale: 0, childrenFemale: 0 };
        const result = htsData.reduce((acc, data) => {
            if (data.Age >= 18) {
                acc.adultTotal++;
                if (data.Gender === "Male" || data.Gender === "M") {
                    acc.adultMale++;
                } else if (data.Gender === "Female" || data.Gender === "F") {
                    acc.adultFemale++;
                }
            } else {
                acc.childrenTotal++;
                if (data.Gender === "Male" || data.Gender === "M") {
                    acc.childrenMale++;
                } else if (data.Gender === "Female" || data.Gender === "F") {
                    acc.childrenFemale++;
                }
            }
            return acc;
        }, initialData);

        setAdultTotal(result.adultTotal);
        setAdultMale(result.adultMale);
        setAdultFemale(result.adultFemale);
        setChildrenTotal(result.childrenTotal);
        setChildrenMale(result.childrenMale);
        setChildrenFemale(result.childrenFemale);
    }, [htsData]);


    console.log("adultTotal: " + adultTotal);
    console.log("adultMale: " + adultMale);
    console.log("adultFemale: " + adultFemale);
    console.log("childrenTotal: " + childrenTotal);
    console.log("childrenMale: " + childrenMale);
    console.log("childrenFemale: " + childrenFemale);

    const data = {
        labels: ["Adult", "Children"],
        datasets: [
            {
                label: "Total",
                data: [`${adultTotal}`, `${childrenTotal}`],
                backgroundColor: ["#0CD", "#0CD",],
                borderColor: ["#0CD"],
                borderWidth: 1,
            },
            {
                label: "Male",
                data: [`${adultMale}`, `${childrenMale}`],
                backgroundColor: ["#00F", "#00F"],
                borderColor: ["#00F"],
                borderWidth: 1,
            },
            {
                label: "Female",
                data: [`${adultFemale}`, `${childrenFemale}`],
                backgroundColor: ["#FFF", "#FFF"],
                borderColor: ["#FFF"],
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

    const INTERVAL_TIME = 1 * 60 * 60 * 1000; // 1 hour in milliseconds
    const updateData = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get("http://localhost:5000/htsdata");
            setHtsData(response.data);
            localStorage.setItem("htsData", JSON.stringify(response.data));
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    // Call updateData() immediately to load data when the component mounts
    useEffect(() => {
        updateData();
    }, []);

    // Call updateData() every 5 seconds using setInterval()
    useEffect(() => {
        const interval = setInterval(() => {
            updateData();
        }, INTERVAL_TIME);

        // Return a function to clean up the interval when the component unmounts
        return () => clearInterval(interval);
    }, []);


    return (
        <div className="col-md-6 grid-margin stretch-card">
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title small">
                        HTS Category
                    </h4>
                    <div className="aligner-wrapper">
                        <div>
                            <Bar data={data} options={options} />
                            <div>
                                <div className="bg-gray-dark d-flex d-md-block d-xl-flex justify-content-between flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
                                    <div className="text-md-center text-xl-left">
                                        <h6 className="mb-1">Total Adult</h6>
                                        <p className="text-muted mb-0">
                                            {/* {isLoading ? "Loading....." : `${adultTotal}`} */}
                                            {adultTotal}
                                        </p>
                                    </div>
                                    <div className="text-md-center text-xl-left">
                                        <h6 className="mb-1">Total Children</h6>
                                        <p className="text-muted mb-0">
                                            {/* {isLoading ? "Loading....." : `${childrenTotal}`} */}
                                            {childrenTotal}
                                        </p>
                                    </div>
                                </div>
                                <button onClick={updateData}>Update Data</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HtsCategoryClone;