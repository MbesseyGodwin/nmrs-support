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

        <div className="row">
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

        <div className="row ">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Last 5 Phamarcy Pickups</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead className="text-light">
                      <tr>
                        <th>
                          <div className="form-check form-check-muted m-0">
                            <label className="form-check-label">
                              <input
                                type="checkbox"
                                checked
                                className="form-check-input"
                              />
                              <i className="input-helper"></i>
                            </label>
                          </div>
                        </th>
                        <th> Patient Name </th>
                        <th> Unique ID </th>
                        <th> Gender </th>
                        <th> Age </th>
                        <th> ART Start </th>
                        <th> Next Pickup </th>
                        <th> VL Status </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="form-check form-check-muted m-0">
                            <label className="form-check-label">
                              <input
                                type="checkbox"
                                className="form-check-input"
                              />
                              <i className="input-helper"></i>
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex">
                            <span className="pl-2">ebube james</span>
                          </div>
                        </td>
                        <td> abia </td>
                        <td> male </td>
                        <td> 43 </td>
                        <td> 11-02-2020 </td>
                        <td> 30-06-2023 </td>
                        <td>
                          <div className="badge badge-outline-success">
                            Suppressed
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="form-check form-check-muted m-0">
                            <label className="form-check-label">
                              <input
                                type="checkbox"
                                className="form-check-input"
                              />
                              <i className="input-helper"></i>
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex">
                            <span className="pl-2">ebube james</span>
                          </div>
                        </td>
                        <td> abi00100001 </td>
                        <td> male </td>
                        <td> 43 </td>
                        <td> 11-02-2020 </td>
                        <td> 30-06-2023 </td>
                        <td>
                          <div className="badge badge-outline-success">
                            Suppressed
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="form-check form-check-muted m-0">
                            <label className="form-check-label">
                              <input
                                type="checkbox"
                                className="form-check-input"
                              />
                              <i className="input-helper"></i>
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex">
                            <span className="pl-2">chima makwa</span>
                          </div>
                        </td>
                        <td> abi00100002 </td>
                        <td> male </td>
                        <td> 23 </td>
                        <td> 11-02-2021 </td>
                        <td> 10-02-2023 </td>
                        <td>
                          <div className="badge badge-outline-danger">
                            Unsuppressed
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="form-check form-check-muted m-0">
                            <label className="form-check-label">
                              <input
                                type="checkbox"
                                className="form-check-input"
                              />
                              <i className="input-helper"></i>
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex">
                            <span className="pl-2">favour chinedu</span>
                          </div>
                        </td>
                        <td> abi00100003 </td>
                        <td> female </td>
                        <td> 39 </td>
                        <td> 02-02-2022 </td>
                        <td> 17-04-2023 </td>
                        <td>
                          <div className="badge badge-outline-success">
                            Suppressed
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="form-check form-check-muted m-0">
                            <label className="form-check-label">
                              <input
                                type="checkbox"
                                className="form-check-input"
                              />
                              <i className="input-helper"></i>
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex">
                            <span className="pl-2">emmanuel goodness</span>
                          </div>
                        </td>
                        <td> abi00100004 </td>
                        <td> female </td>
                        <td> 16 </td>
                        <td> 11-12-2022 </td>
                        <td> 13-05-2023 </td>
                        <td>
                          <div className="badge badge-outline-danger">
                            Unsuppressed
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="form-check form-check-muted m-0">
                            <label className="form-check-label">
                              <input
                                type="checkbox"
                                className="form-check-input"
                              />
                              <i className="input-helper"></i>
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex">
                            <span className="pl-2">godwin vincent</span>
                          </div>
                        </td>
                        <td> abia </td>
                        <td> male </td>
                        <td> 43 </td>
                        <td> 10-02-2020 </td>
                        <td> 22-05-2023 </td>
                        <td>
                          <div className="badge badge-outline-success px-4">
                            Suppressed
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
