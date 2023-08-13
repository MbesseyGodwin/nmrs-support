/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Reports.css';
import { states, lga, facilities } from './data';

function Reports() {
  const [expandedStates, setExpandedStates] = useState([]);
  const [expandedLGAs, setExpandedLGAs] = useState([]);
  const [selectedLGA, setSelectedLGA] = useState(null);
  const [selectedFacility, setSelectedFacility] = useState('');
  const history = useHistory(); // Import useHistory hook

  const toggleState = (stateValue) => {
    setExpandedStates((prevStates) =>
      prevStates.includes(stateValue)
        ? prevStates.filter((state) => state !== stateValue)
        : [...prevStates, stateValue]
    );
    setExpandedLGAs([]); // Close all LGAs when a state is toggled
    setSelectedLGA(null);
  };

  const toggleLGA = (lgaValue) => {
    if (selectedLGA === lgaValue) {
      setSelectedLGA(null);
      setExpandedLGAs([]);
    } else {
      setSelectedLGA(lgaValue);
      setExpandedLGAs([lgaValue]);
    }
  };

  const handleFacilityChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedFacility(selectedValue);

    // Navigate to the facility page when an option is selected
    if (selectedValue) {
      history.push(`/facility/${selectedValue}`);
    }
  };

  const isStateExpanded = (stateValue) => expandedStates.includes(stateValue);
  const isLGAExpanded = (lgaValue) => expandedLGAs.includes(lgaValue);

  return (
    <div className="container-fluid">
      <div className="form-group">
        <label htmlFor="facilitySelect" className='text-dark'>Select a Facility:</label>
        <select
          className="custom-select shadow"
          name="facility"
          id="facilitySelect"
          onChange={handleFacilityChange}
          value={selectedFacility}
        >
          <option value="">Select a facility</option>
          {facilities
            .slice() // Create a copy of the array before sorting
            .sort((a, b) => a.label.localeCompare(b.label)) // Sort facilities alphabetically by label
            .map((facility) => (
              <option key={facility.value} value={facility.datimCode}>
                {facility.label}
              </option>
            ))}
        </select>
      </div>

      <div className="row">
        <div className="tree">
          <ul>
            {states.map((state) => (
              <li key={state.value}>
                <a href="#" onClick={() => toggleState(state.value)}>
                  <span className={'text-dark'}>{state.label}</span>
                </a>
                <ul className={isStateExpanded(state.value) ? 'hidden' : ''}>
                  {lga
                    .filter((l) => l.stateid === state.value)
                    .map((lgaItem) => (
                      <li key={lgaItem.value}>
                        <a href="#" onClick={() => toggleLGA(lgaItem.value)}>
                          <span className={selectedLGA === lgaItem.value ? 'text-primary' : 'text-dark'}>
                            {lgaItem.label}
                          </span>
                        </a>
                        <ul className={isLGAExpanded(lgaItem.value) ? '' : 'hidden'}>
                          {facilities
                            .filter((facility) => facility.lgaid === lgaItem.value)
                            .map((facility) => (
                              <li key={facility.value}>
                                <Link to={`/facility/${facility.datimCode}`} className="btn btn-primary">
                                  {facility.label}
                                </Link>
                              </li>
                            ))}
                        </ul>
                      </li>
                    ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Reports;
