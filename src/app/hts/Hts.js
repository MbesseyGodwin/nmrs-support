import React, {useRef } from "react";
import HtsHistory from "./HtsHistory";
import HtsCategory from "./HtsCategory";
// import HtsCategoryClone from "./HtsCategoryClone";
import HtsCards from "./HtsCards";
import SaveAsImage from "../shared/SaveAsImage";


function Hts() {
  const componentRef = useRef(null);

  return (
    <>
      <SaveAsImage componentRef={componentRef} />
      <div ref={componentRef}>
        <HtsCards />
        <div className="row">
          <HtsCategory />
          <HtsHistory />
        </div>

        <div className="row">
          <div className="col-md-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">HTS Analysis</h4>
              </div>
            </div>
          </div>

          <div className="col-md-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Category 4</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}

export default Hts;
