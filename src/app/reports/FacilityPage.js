import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { lga, facilities } from './data';
import { htsdata } from './indicatorData';

// Component for HTS indicators description
export const HtsDescription = () => {
  return (
    <div>
      <p>HTS Total {htsdata.length}</p>
      <p>HTS POS {htsdata.length}</p>
      <p>HTS NEG {htsdata.length}</p>
    </div>
  );
};

// Main FacilityPage component
function FacilityPage() {
  // Get parameters from the URL
  const { datimCode } = useParams();

  // Find selected facility and its associated LGA
  const selectedFacility = facilities.find((facility) => facility.datimCode === datimCode);
  const selectedLGA = lga.find((lgaItem) => lgaItem.value === selectedFacility?.lgaid);

  // Array of HIV indicators with their labels, titles, and bodies
  const hivIndicators = [
    { label: 'Prevention', title: 'HTS', body: <HtsDescription /> },
    { label: 'VL Coverage (10%)', title: 'Viral Load', body: 'Description of Viral Load' },
    { label: 'Prevention', title: 'IIT', body: 'Description of IIT' },
    { label: 'SI Unit', title: 'PBS', body: 'Description of PBS' },
    { label: 'Clinicians', title: 'AHD', body: 'Description of AHD' },
  ];

  // State to manage the selected indicator
  const [selectedIndicator, setSelectedIndicator] = useState(null);

  console.log(selectedIndicator);

  return (
    <div className="container-fluid">
      {/* Breadcrumb navigation */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb shadow border border-light">
          <li className="breadcrumb-item text-dark">{selectedLGA?.label}</li>
          <li className="breadcrumb-item text-dark">{selectedFacility?.label}</li>
          <li className="breadcrumb-item text-dark">{selectedFacility.datimCode}</li>
          <li style={{ marginLeft: 'auto' }} className="text-dark">
            {/* Link to navigate back to reports */}
            <Link to="../reports" className='font-weight-bold'><span className="mdi mdi mdi-arrow-left"></span>Back</Link>
          </li>
        </ol>
      </nav>

      {/* Display indicators with their titles and labels */}
      <div className="row justify-content-center align-items-center g-2">
        {hivIndicators.map((indicator, index) => (
          <div className="col-lg col-md-4 col-sm-6 my-2" key={index}>
            <div
              className={`card shadow text-left ${selectedIndicator && selectedIndicator.title === indicator.title ? 'bg-success' : 'bg-light'}`}
              onClick={() => setSelectedIndicator(indicator)}
              style={{ cursor: 'pointer' }}
              title='click to see more'
            >
              <div className="card-body">
                <h1 className="card-title h3 text-dark">{indicator.title}</h1>
                <p className="card-text text-danger">{indicator.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>


      {/* Display selected indicator details */}
      {selectedIndicator && (
        <div className="row justify-content-center mt-4">
          <div className="col-12">
            <div className="card bg-light shadow mb-5">
              <div className="card-body text-dark">
                <h4 className="card-title text-dark">{selectedIndicator.title}</h4>
                <p className="card-text">{selectedIndicator.body}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FacilityPage;
