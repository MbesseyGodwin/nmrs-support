import React from "react";
import PbsData from "./PbsData";


const Pbs = () => {
  return (
    <div>
      <div className="row">
        {/* Category 3 */}
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Category 3</h4>
              <PbsData />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pbs;
