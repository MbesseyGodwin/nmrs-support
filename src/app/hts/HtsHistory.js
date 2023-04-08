import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import moment from 'moment';

import axios from "axios";

const HtsHistory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [htsData, setHtsData] = useState([]);
  const [monthlyCounts, setMonthlyCounts] = useState([]);
  const [selectedYear, setSelectedYear] = useState(moment().year());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/htsdata");
        const data = await response.json();
        setHtsData(data);
        localStorage.setItem("htsData", JSON.stringify(data)); // Store data in localStorage
      } catch (error) {
        console.error(error);
      }
    };

    const storedData = localStorage.getItem("htsData");
    if (storedData) {
      setHtsData(JSON.parse(storedData)); // Restore data from localStorage
    } else {
      fetchData();
    }
  }, []);

  useEffect(() => {
    const monthlyData = [];
    for (let i = 1; i <= 12; i++) {
      const monthData = htsData.filter((item) => {
        return moment(item.HIVTestDate, "DD-MM-YYYY").format("M-YYYY") === `${i}-${selectedYear}`;
      });
      monthlyData.push(monthData.length);
    }
    setMonthlyCounts(monthlyData);
  }, [htsData, selectedYear]);

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
        backgroundColor: [
          "#b71c1c",
          "#880e4f",
          "#4a148c",
          "#311b92",
          "#1a237e",
          "#0d47a1",
          "#01579b",
          "#006064",
          "#004d40",
          "#1b5e20",
          "#33691e",
          "#827717",
        ],
      },
    ],
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
  }, [INTERVAL_TIME]);


  return (
    <div className="col-md-6 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title small">HTS History</h4>
          <div className="d-flex justify-content-end mb-3">
            <select className="form-control w-auto" value={selectedYear} onChange={handleYearChange}>
              {Array.from({ length: 10 }, (_, i) => moment().year() - i).map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div className="aligner-wrapper">
            <Bar data={chartData} />
          </div>
          <div className="bg-gray-dark d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
            <div className="text-md-center text-xl-left">
              <h6 className="mb-1">Record Set</h6>
              <p className="text-muted mb-0">Total tested: {htsData.length}</p>
            </div>

            <div className="align-self-center flex-grow text-right text-md-center text-xl-right py-md-2 py-xl-0">
              <h6 className="font-weight-bold mb-0 text-success">{ }</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HtsHistory;
