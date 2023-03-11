import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import Slider from "react-slick";
import { TodoListComponent } from "../apps/TodoList";
import { VectorMap } from "react-jvectormap";
import Globalproperties from "./Globalproperties";
import DashboardSlides from "./DashboardSlides";

// map data
const mapData = {
  BZ: 75.0,
  US: 56.25,
  AU: 15.45,
  GB: 25.0,
  RO: 10.25,
  GE: 33.25,
};

export class Dashboarding extends Component {
  state = {
    data: [],
    filteredData: [],
    category: "",
    isLoading: false,
    error: null,
  };

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch("http://localhost:5000/fingerprints")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) =>
        this.setState({ data, filteredData: data, isLoading: false })
      )
      .catch((error) => this.setState({ error, isLoading: false }));
  }


  toggleProBanner() {
    document.querySelector(".proBanner").classList.toggle("hide");
  }

  handleCategoryFilter = (event) => {
    const category = event.target.value;
    const { data } = this.state;

    this.setState({
      category,
      filteredData: data.filter((item) => item.gender === category),
    });
  };

  render() {
    const { data, isLoading, error, } = this.state;

    if (error) {
      return (
        <h2 className="bg-dark p-2 text-center text-uppercase">
          {error.message}
        </h2>
      );
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }
    
    const cardColors = {
        pbsLow: "#D10C26", //red "#D10C26"
        pbsHigh: "#0DDF4C", //green "#0DDF4C"
      };
      const  bgSelect = data.length < 1000 ? cardColors.pbsLow : cardColors.pbsHigh;
      
      
    const { family_name, given_name } = data;
    console.log(family_name);
    return (
      <div>
      <div className="row">
        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-9">
                  <div className="d-flex align-items-center align-self-start">
                    <h3 className="mb-0">
                      2771
                    </h3>
                    <p className="text-success ml-2 mb-0 font-weight-medium">
                      +3.5%
                    </p>
                  </div>
                </div>
                <div className="col-3">
                  <div className="icon icon-box-success ">
                    <span className="mdi mdi-arrow-top-right icon-item"></span>
                  </div>
                </div>
              </div>
              <h6 className="text-muted font-weight-normal">Ever Enrolled</h6>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-9">
                  <div className="d-flex align-items-center align-self-start">
                    <h3 className="mb-0">2705</h3>
                    <p className="text-success ml-2 mb-0 font-weight-medium">
                      +11%
                    </p>
                  </div>
                </div>
                <div className="col-3">
                  <div className="icon icon-box-success">
                    <span className="mdi mdi-arrow-top-right icon-item"></span>
                  </div>
                </div>
              </div>
              <h6 className="text-muted font-weight-normal">
                Treatment Current
              </h6>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
          <div className="card" style={{"color":`${bgSelect}` }}>
            <div className="card-body">
              <div className="row">
                <div className="col-9">
                  <div className="d-flex align-items-center align-self-start">
                    <h3 className="mb-0">{data.length}</h3>
                    <p className="text-danger ml-2 mb-0 font-weight-medium">
                      -2.4%
                    </p>
                  </div>
                </div>
                <div className="col-3">
                  <div className="icon icon-box-danger">
                    <span className="mdi mdi-arrow-bottom-left icon-item"></span>
                  </div>
                </div>
              </div>
              <h6 className="text-muted font-weight-normal">Valid PBS</h6>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-9">
                  <div className="d-flex align-items-center align-self-start">
                    <h3 className="mb-0">45</h3>
                    <p className="text-danger ml-2 mb-0 font-weight-medium">
                      -3.5%
                    </p>
                  </div>
                </div>
                <div className="col-3">
                  <div className="icon icon-box-danger ">
                    <span className="mdi mdi-arrow-bottom-left icon-item"></span>
                  </div>
                </div>
              </div>
              <h6 className="text-muted font-weight-normal">Retention/IIT</h6>
            </div>
          </div>
        </div>
      </div>
        
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
