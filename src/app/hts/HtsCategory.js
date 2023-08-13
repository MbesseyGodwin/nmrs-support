import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { useLiveQuery } from "dexie-react-hooks";
import db from "../shared/indexedDB/DB";

function HtsCategoryClone() {
    const [htsData, setHtsData] = useState([]);
    const [categoryData, setCategoryData] = useState({
        adultTotal: 0,
        adultMale: 0,
        adultFemale: 0,
        childrenTotal: 0,
        childrenMale: 0,
        childrenFemale: 0,
    });

    const liveData = useLiveQuery(() => db.htslist.get(1));

    useEffect(() => {
        if (liveData !== undefined) {
            setHtsData(liveData);
        }
    }, [liveData]);

    useEffect(() => {
        const countCategories = () => {
            const initialData = {
                adultTotal: 0,
                adultMale: 0,
                adultFemale: 0,
                childrenTotal: 0,
                childrenMale: 0,
                childrenFemale: 0,
            };
            htsData.forEach((data) => {
                if (data.Age >= 18) {
                    initialData.adultTotal++;
                    if (data.Sex === "Male" || data.Sex === "M") {
                        initialData.adultMale++;
                    } else if (data.Sex === "Female" || data.Sex === "F") {
                        initialData.adultFemale++;
                    }
                } else {
                    initialData.childrenTotal++;
                    if (data.Sex === "Male" || data.Sex === "M") {
                        initialData.childrenMale++;
                    } else if (data.Sex === "Female" || data.Sex === "F") {
                        initialData.childrenFemale++;
                    }
                }
            });
            setCategoryData(initialData);
        };
        countCategories();
    }, [htsData]);

    const data = {
        labels: ["Adult", "Children"],
        datasets: [
            {
                label: "Total",
                data: [categoryData.adultTotal, categoryData.childrenTotal],
                backgroundColor: ["rgba(0, 210, 91)", "rgba(0, 210, 91)"],
                
            },
            {
                label: "Male",
                data: [categoryData.adultMale, categoryData.childrenMale],
                backgroundColor: ["rgba(0, 210, 91)", "rgba(0, 210, 91)"],
                
            },
            {
                label: "Female",
                data: [categoryData.adultFemale, categoryData.childrenFemale],
                backgroundColor: ["rgba(0, 210, 91)", "rgba(0, 210, 91)"],
                
            },
        ],
    };

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: false,
                    },
                },
            ],
        },
    };

    return (
        <div className="col-md-6 grid-margin stretch-card">
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title small">HTS Category</h4>
                    <div className="aligner-wrapper">
                        <div>
                            <Bar data={data} options={options} />
                            <div className="border border-light mt-2">
                                <table className="table table-default table-bordered">
                                    <tbody className="text-center">
                                        <tr>
                                            <td className="btn-outline-light">{`Adults Total ${categoryData.adultTotal}`}</td>
                                            <td className="btn-outline-light">{`Adults Male ${categoryData.adultMale}`}</td>
                                            <td className="btn-outline-light">{`Adults Female ${categoryData.adultFemale}`}</td>
                                        </tr>
                                        <tr>
                                            <td className="btn-outline-light">{`Pediatrics Total ${categoryData.childrenTotal}`}</td>
                                            <td className="btn-outline-light">{`Pediatrics Male ${categoryData.childrenMale}`}</td>
                                            <td className="btn-outline-light">{`Pediatrics Female ${categoryData.childrenFemale}`}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HtsCategoryClone;