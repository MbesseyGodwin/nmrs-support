import React, { useState, useEffect } from "react";
import axios from "axios";
import db from "../shared/indexedDB/DB";
import { Bar } from "react-chartjs-2";
import { useLiveQuery } from "dexie-react-hooks";
import moment from "moment";

function HtsCategory() {
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
    return db.htsData.get(1);
  }, []);

  useEffect(() => {
    if (liveData !== undefined) {
      setHtsData(liveData);
      console.log("dexie data =:", liveData);
    }
  }, [liveData]);


  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/htsdata");
        const newData = response.data;

        console.log(newData);
        newData.id = 1;
        const count = await db.htsData.count();

        console.log(count);
        if (count > 0) {
          const data = await db.htsData.get(1);
          if (count !== newData.length) {
            // Data has changed, so update the database
            console.log("new data id = " + newData.id);
            await db.htsData.put(newData, 1);
            setHtsData(newData);
          } else {
            // Data has not changed, so update state variable with data from Dexie database
            setHtsData(data);
          }
        } else {
          // Database is empty, so insert new data
          await db.htsData.put(newData, 1);
          setHtsData(newData);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

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
          if (data.Gender === "Male" || data.Gender === "M") {
            initialData.adultMale++;
          } else if (data.Gender === "Female" || data.Gender === "F") {
            initialData.adultFemale++;
          }
        } else {
          initialData.childrenTotal++;
          if (data.Gender === "Male" || data.Gender === "M") {
            initialData.childrenMale++;
          } else if (data.Gender === "Female" || data.Gender === "F") {
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
        data: [`${categoryData.adultTotal}`, `${categoryData.childrenTotal}`],
        backgroundColor: ["rgba(12, 205, 149, 0.5)", "rgba(12, 205, 149, 0.5)",],
        borderColor: ["#0CD"],
        borderWidth: 1,
      },
      {
        label: "Male",
        data: [`${categoryData.adultMale}`, `${categoryData.childrenMale}`],
        backgroundColor: ["rgba(0, 123, 255, 0.5)", "rgba(0, 123, 255, 0.5)"],
        borderColor: ["#00F"],
        borderWidth: 1,
      },
      {
        label: "Female",
        data: [`${categoryData.adultFemale}`, `${categoryData.childrenFemale}`],
        backgroundColor: ["rgba(255, 255, 255, 0.5)", "rgba(255, 255, 255, 0.5)"],
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


  useEffect(() => {
    const monthlyData = [];
    for (let i = 1; i <= 12; i++) {
      const monthData = htsData.filter((item) => {
        return (
          moment(item.HIVTestDate, "DD-MM-YYYY").format("M-YYYY") ===
          `${i}-${selectedYear}`
        );
      });
      monthlyData.push(monthData.length);
    }
    setMonthlyCounts(monthlyData);
  }, [htsData, selectedYear]);

  const nullValues = htsData.filter((item) => { return item.HIVTestDate === null });
  const notNullValues = htsData.filter((item) => { return item.HIVTestDate !== null });

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

  return (
    <>
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
                        {/* {isLoading ? "Loading....." : `${categoryData.adultTotal}`} */}
                        {`${categoryData.adultTotal}`}
                      </p>
                    </div>
                    <div className="text-md-center text-xl-left">
                      <h6 className="mb-1">Total Children</h6>
                      <p className="text-muted mb-0">
                        {/* {isLoading ? "Loading....." : `${categoryData.childrenTotal}`} */}
                        {`${categoryData.childrenTotal}`}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
            <div className="bg-gray-dark d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
              <div className="text-md-center text-xl-left">
                <h6 className="mb-1">Total Tested</h6>
                <p className="text-muted mb-0">{htsData.length}</p>
              </div>

              <div className="align-self-center flex-grow text-right text-md-center text-xl-right py-md-2 py-xl-0">
                <p className="text-muted mb-0">With Date Value: {nullValues.length}</p>
                <p className="text-muted mb-0">With Null Value: {notNullValues.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HtsCategory;