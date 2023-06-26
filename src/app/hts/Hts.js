import React, { useEffect, useRef } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import Slider from "react-slick";
import HtsHistory from "./HtsHistory";
import HtsCategory from "./HtsCategory";
import HtsCategoryClone from "./HtsCategoryClone";
import HtsAnalysis from "./HtsAnalysis";
import HtsData from "./HtsData";
import HtsDrillDownChart from "./HtsDrillDownChart";
import HtsCards from "./HtsCards";
import HtsTest from "./HtsTest";
import SaveAsImage from "../shared/SaveAsImage";

function Hts() {
  const componentRef = useRef(null);

  return (
    <>
      <SaveAsImage componentRef={componentRef} />
      <div ref={componentRef}>

        <HtsCards />
        {/* <HtsTest /> */}

        <div className="row">
          {/* hts gender category */}
          {/* <HtsCategory /> */}
          <HtsCategoryClone />

          {/* hts history */}
          {/* <HtsHistory /> */}
        </div>

        <div className="row">
          {/* Category 3 */}
          <div className="col-md-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">HTS Analysis</h4>
                {/* <HtsAnalysis /> */}
              </div>
            </div>
          </div>

          {/* Category 4 */}
          <div className="col-md-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Category 4</h4>
                {/* <HtsData /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}

export default Hts;
