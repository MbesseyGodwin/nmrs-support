import React, { useState, useEffect } from "react";
import axios from "axios";
import db from "../shared/indexedDB/DB";
import { Bar } from "react-chartjs-2";
import { useLiveQuery } from "dexie-react-hooks";
import moment from "moment";


function HtsCategoryClone() {
    const [isLoading, setIsLoading] = useState(false);
    const [htsData, setHtsData] = useState([]);
    const [categoryData, setCategoryData] = useState({
        adultTotal: 0,
        adultMale: 0,
        adultFemale: 0,
        childrenTotal: 0,
        childrenMale: 0,
        childrenFemale: 0,
    });
    const [monthlyCounts, setMonthlyCounts] = useState([]);
    const [selectedYear, setSelectedYear] = useState(moment().year());

    const liveData = useLiveQuery(() => {
        return db.htslist.get(1);
    }, []);

    useEffect(() => {
        if (liveData !== undefined) {
            setHtsData(liveData);
        }
    }, [liveData]);


    useEffect(() => {
        const monthlyData = [];
        for (let i = 1; i <= 12; i++) {
            const monthData = htsData.filter((item) => {
                return (
                    moment(item.EnrollDate).format("M-YYYY") === `${i}-${selectedYear}`
                );
            });
            monthlyData.push(monthData.length);
        }
        setMonthlyCounts(monthlyData);
    }, [htsData, selectedYear]);

    // const nullValues = htsData.filter((item) => { return item.EnrollDate === null });
    // const withDateValues = htsData.filter((item) => { return item.EnrollDate !== null });

    const testCountsByMonthAndYear = htsData.reduce((acc, item) => {
        const monthYear = moment(item.EnrollDate).format("MMMM-YYYY");
        acc[monthYear] = (acc[monthYear] || 0) + 1;
        return acc;
    }, {});

    const highestTestCount = Object.entries(testCountsByMonthAndYear).reduce((acc, [monthYear, count]) => {
        if (count > acc.count) {
            return { monthYear, count };
        }
        return acc;
    }, { monthYear: "", count: 0 });

    const handleYearChange = (event) => {
        setSelectedYear(parseInt(event.target.value));
    };


    const chartData = {
        labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ],
        datasets: [
            {
                label: `${selectedYear} HTS`,
                data: monthlyCounts,
                backgroundColor: "#00d25b",
            },
        ],
    };

    return (
        <>
            <div className="col-md-6 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title small">HTS History</h4>
                        <div className="d-flex justify-content-end mb-3">
                            <select
                                className="form-control w-auto"
                                value={selectedYear}
                                onChange={handleYearChange}
                            >
                                {Array.from({ length: 10 }, (_, i) => moment().year() - i).map(
                                    (year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    )
                                )}
                            </select>
                        </div>
                        <div className="aligner-wrapper">
                            <Bar data={chartData} />
                        </div>
                        <div className="bg-gray-dark d-flex d-md-block d-xl-flex justify-content-between flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
                            <div className="text-md-center text-xl-left">
                                <h6 className="mb-1">Total Tested</h6>
                                <p className="text-muted mb-0">{htsData.length}</p>
                            </div>

                            <div className="text-md-center text-xl-left">
                                <h6 className="mb-1">highest Test Count</h6>
                                <p className="text-muted mb-0"> {`${highestTestCount.monthYear} (${highestTestCount.count})`}</p>
                            </div>

                            {/* <div className="align-self-center flex-grow text-right text-md-center text-xl-right py-md-2 py-xl-0">
                                <p className="text-muted mb-0">With Date Value: {withDateValues.length}</p>
                                <p className="text-muted mb-0">With Null Value: {nullValues.length}</p>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HtsCategoryClone;