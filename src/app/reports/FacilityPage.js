import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { lga, facilities } from './data';
import { htsdata } from './indicatorData';

export const HtsDescription = () => {
  return (
    <div>
      <p>HTS Total {htsdata.length}</p>
      <p>HTS POS {htsdata.length}</p>
      <p>HTS NEG {htsdata.length}</p>
    </div>
  );
};

function FacilityPage() {
  const { datimCode } = useParams();

  const selectedFacility = facilities.find((facility) => facility.datimCode === datimCode);
  // console.log(selectedFacility);
  const selectedLGA = lga.find((lgaItem) => lgaItem.value === selectedFacility?.lgaid);

  const hivIndicators = [
    { label: 'Prevention', title: 'HTS', body: <HtsDescription /> },
    { label: 'VL Coverage (10%)', title: 'Viral Load', body: 'Description of Viral Load' },
    { label: 'Prevention', title: 'IIT', body: 'Description of IIT' },
    { label: 'SI Unit', title: 'PBS', body: 'Description of PBS' },
    { label: 'Clinicians', title: 'AHD', body: 'Description of AHD' },
  ];

  const [selectedIndicator, setSelectedIndicator] = useState(null);

  console.log(selectedIndicator);

  return (
    <div className="container-fluid">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb shadow border border-light">
          <li className="breadcrumb-item text-dark">
            {selectedLGA?.label}
          </li>
          <li className="breadcrumb-item text-dark">
            {selectedFacility?.label}
          </li>
          <li className="breadcrumb-item text-dark">{selectedFacility.datimCode}</li>
          <li style={{ marginLeft: 'auto' }} className="text-dark">
            <Link to="../reports" className='font-weight-bold'><span className="mdi mdi mdi-arrow-left"></span>Back</Link>
          </li>
        </ol>
      </nav>

      <div className="row justify-content-center align-items-center g-2">
        {hivIndicators.map((indicator, index) => (
          <div className="col-lg col-md-4 col-sm-6 my-2" key={index}>
           <div
              className={`card shadow text-left ${selectedIndicator === indicator ? 'bg-danger' : 'bg-light'}`}
              onClick={() => setSelectedIndicator(indicator)}
              style={{ cursor: 'pointer' }}
            >
              <div className="card-body">
                <h1 className="card-title h3 text-dark">{indicator.title}</h1>
                <p className="card-text text-danger">{indicator.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

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
