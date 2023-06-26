import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import Slider from "react-slick";
import { TodoListComponent } from "../apps/TodoList";
import { VectorMap } from "react-jvectormap";
import Globalproperties from "./Globalproperties";
import DashboardSlides from "./DashboardSlides";
import DashboardCards from "./DashboardCards";


export class Dashboarding extends Component {

  toggleProBanner() {
    document.querySelector(".proBanner").classList.toggle("hide");
  }

  render() {
    return (
      <div>
        <DashboardCards />

        <div className="row">
          {/* dashboard slides */}
          <DashboardSlides />
          {/* Globalproperties data */}
          <Globalproperties />
        </div>

        <div className="row mb-5">
          <div className="col-sm-4 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>VL Sample Collected</h5>
                <div className="row">
                  <div className="col-8 col-sm-12 col-xl-8 my-auto">
                    <div className="d-flex d-sm-block d-md-flex align-items-center">
                      <h2 className="mb-0">1900</h2>
                      <p className="text-success ml-2 mb-0 font-weight-medium">
                        +3.5%
                      </p>
                    </div>
                    <h6 className="text-muted font-weight-normal">
                      2.38% Since last quater
                    </h6>
                  </div>
                  <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                    <i className="icon-lg mdi mdi-codepen text-primary ml-auto"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Unsuppressed</h5>
                <div className="row">
                  <div className="col-8 col-sm-12 col-xl-8 my-auto">
                    <div className="d-flex d-sm-block d-md-flex align-items-center">
                      <h2 className="mb-0">200</h2>
                      <p className="text-danger ml-2 mb-0 font-weight-medium">
                        -3.3%
                      </p>
                    </div>
                    <h6 className="text-muted font-weight-normal">
                      {" "}
                      -1.61% Since last quater
                    </h6>
                  </div>
                  <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                    <i className="icon-lg mdi mdi-wallet-travel text-danger ml-auto"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Suppressed</h5>
                <div className="row">
                  <div className="col-8 col-sm-12 col-xl-8 my-auto">
                    <div className="d-flex d-sm-block d-md-flex align-items-center">
                      <h2 className="mb-0">1700</h2>
                      <p className="text-success ml-2 mb-0 font-weight-medium">
                        +2.1%{" "}
                      </p>
                    </div>
                    <h6 className="text-muted font-weight-normal">
                      2.27% Since last quater
                    </h6>
                  </div>
                  <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                    <i className="icon-lg mdi mdi-monitor text-success ml-auto"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboarding;
