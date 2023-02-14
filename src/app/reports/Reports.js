import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";

const Reports = () => {
  const [pbsData, setPbsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [reportsPerPage, setReportsPerPage] = useState(200);
  let formattedDate;

  // let formattedDate

  useEffect(() => {
    getPbs();
  }, []);

  // function to fetch the data
  const getPbs = async () => {
    const response = await axios.get("http://localhost:5000/customers");
    setPbsData(response.data);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategorySelect = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  let filteredReports = pbsData;

  if (searchTerm) {
    filteredReports = filteredReports.filter((report) =>
      report.patient_Id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (selectedCategory) {
    filteredReports = filteredReports.filter(
      (report) => report.gender === selectedCategory
    );
  }

  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = filteredReports.slice(
    indexOfFirstReport,
    indexOfLastReport
  );

  const maleCount = filteredReports.filter(
    (report) => report.gender === "M"
  ).length;
  const femaleCount = filteredReports.filter(
    (report) => report.gender === "F"
  ).length;

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredReports.length / reportsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }
  


// destructing
const [firstObject] = filteredReports;
console.log(firstObject);

  return (
    <div>
      <div className="row">
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">
                All valid PBS:
                <span className="text-success">{pbsData.length}</span>
              </h4>
              <p>{maleCount}</p>
              <div>
                <div className="d-flex mb-4">
                  <input
                    type="text"
                    placeholder="Search reports..."
                    value={searchTerm}
                    onChange=""
                    className="form-control bg-light"
                  />

                  <select
                    className="bg-success text-light form-select"
                    value={reportsPerPage}
                    onChange={(e) => setReportsPerPage(e.target.value)}
                  >
                    <option selected value="5">
                      5
                    </option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value={pbsData.length}>All</option>
                  </select>

                  <select
                    className="bg-success form-select text-light"
                    value={selectedCategory}
                    onChange={handleCategorySelect}
                  >
                    <option value="">Select All Categories</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
                </div>
                <table className="table table-hover text-light table-bordered">
                  <thead className="thead mt-3">
                    <tr className="bg-success text-uppercase">
                      <th>PEPFAR ID</th>
                      <th>Family Name</th>
                      <th>Given</th>
                      <th>Gender</th>
                      <th>Date Captured</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentReports.map((report) => (
                      <tr key={report.id}>
                        <td>{report.identifier}</td>
                        <td>{report.family_name}</td>
                        <td>{report.given_name}</td>
                        <td>{report.gender}</td>
                        <td>
                          {
                            (report.date_created = formattedDate =
                              moment(report.date_created).format(
                                "MMMM Do YYYY, h:mm:ss a"
                              ))
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
