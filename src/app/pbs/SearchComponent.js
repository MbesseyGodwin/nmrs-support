import React, { useState, useEffect } from "react";

const SearchComponent = ({ pbsData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const results = pbsData.filter((pbs) =>
      pbs.identifier.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, pbsData]);

  return (
    <div className="form-group">
      <input
        type="text"
        className="form-control"
        placeholder="Search by PEPFAR ID"
        value={searchTerm}
        onChange={handleChange}
      />
      {searchResults.map((pbs) => (
        <p key={pbs.id}>{pbs.identifier}</p>
      ))}
    </div>
  );
};

export default SearchComponent;
