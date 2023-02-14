import React, { useState, useEffect } from "react";

const PbsData = () => {
  const [pbsData, setPbsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:5000/fingerprints`);
      const data = await response.json();
      setPbsData(data);
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // const filteredPbsData = pbsData.filter((pbs) => {
  //   return (
  //     pbs.identifier.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     pbs.family_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     pbs.given_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     pbs.gender.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     pbs.date_created.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  // });

  const filteredPbsData = pbsData;
  const maleCount = filteredPbsData.filter(
    (report) => report.gender === "M"
  ).length;
  return (
    <div>
      <div className="row">
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">
                All valid PBS:
                <span className="text-success">{filteredPbsData.length}</span>
              </h4>
              <p>{maleCount}</p>
              <div>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
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
                    {filteredPbsData.map((pbs) => (
                      <tr key={pbs.id}>
                        <td>{pbs.identifier}</td>
                        <td>{pbs.family_name}</td>
                        <td>{pbs.given_name}</td>
                        <td>{pbs.gender}</td>
                        <td>{pbs.date_created}</td>
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
export default PbsData;