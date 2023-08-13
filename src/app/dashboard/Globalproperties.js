import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import dayjs from "dayjs";
import "animate.css/animate.min.css";
import { Link } from "react-router-dom";



const Globalproperties = () => {

  const currentDate = dayjs();
  const currDate = moment().format('YYYY-MM-DD');

  const [, setIsLoading] = useState(false);
  const [globalpropertiesData, setGlobalpropertiesData] = useState([]);
  const [drugRefill, setDrugRefill] = useState([]);

  useEffect(() => {
    const getGlobalproperties = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/globalproperties");
        setGlobalpropertiesData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getGlobalproperties();
  }, []);

  useEffect(() => {
    const getDrugRefill = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/drugrefill");
        setDrugRefill(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getDrugRefill();
  }, []);



  // console.table(drugRefill);
  const PharmacyDrugRefill = drugRefill.filter((item) => {
    return item.AppointmentDate === currDate;
  }).length;



  // variable definations
  const ndrLastRunDate = globalpropertiesData.find(
    (prop) => prop.property === "ndr_last_run_date"
  )?.property_value;

  const lastLocalDataSyncDate = globalpropertiesData.find(
    (prop) => prop.property === "last_local_data_sync_date"
  )?.property_value;

  const facilityName = globalpropertiesData.find(
    (prop) => prop.property === "Facility_Name"
  )?.property_value;

  const facilityDatimCode = globalpropertiesData.find(
    (prop) => prop.property === "facility_datim_code"
  )?.property_value;

  const partner_reporting_state = globalpropertiesData.find(
    (prop) => prop.property === "partner_reporting_state"
  )?.property_value;


  return (
    <div className="col-md-5 grid-margin stretch-card">


      <div className="card">
        <div className="card-body">
          <div className="d-flex flex-row justify-content-between border-light border-bottom mb-3">
            <h4 className="card-title mb-1">{facilityName}</h4>
            <p className="text-muted mb-1">Global Properties</p>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="preview-list">
                <div className="row">
                  {/* for NDR last run date */}
                  <div className="col-4">
                    <div className="card bg-light mb-3 text-center">
                      <div className="card-header text-dark font-weight-bold">ndr upload</div>
                      <div className="card-body p-2 m-2">
                        <a target="blank" href="http://localhost:8080/openmrs/nigeriaemr/customNdr.page" className="nav-link p-0 small">
                          <span className="card-title mb-0 text-dark small">{lastLocalDataSyncDate}</span>
                        </a>
                      </div>
                      <div className="card-footer">
                        <div className="text-muted mb-0">
                          {currentDate.diff(
                            ndrLastRunDate,
                            "day"
                          ) === 0 ? (
                            <span className="text-success">Today</span>
                          ) : currentDate.diff(
                            ndrLastRunDate,
                            "day"
                          ) === 1 ? (
                            <span className="text-warning">Yesterday</span>
                          ) : currentDate.diff(
                            ndrLastRunDate,
                            "day"
                          ) >= 1 ? (
                            <span>
                              <span className="text-danger">
                                {currentDate.diff(
                                  ndrLastRunDate,
                                  "day"
                                )}{" "}
                                days ago
                              </span>
                            </span>
                          ) : (
                            "error"
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* for datasync last run date*/}
                  <div className="col-4">
                    <div className="card bg-light mb-3 text-center">
                      <div className="card-header text-dark font-weight-bold">Data sync</div>
                      <div className="card-body p-2 m-2">
                        <a target="blank" href="http://localhost:8008" className="nav-link p-0 small">
                          <span className="card-title mb-0 text-dark small">{lastLocalDataSyncDate}</span>
                        </a>
                      </div>
                      <div className="card-footer">
                        <div className="text-muted mb-0">
                          {currentDate.diff(
                            lastLocalDataSyncDate,
                            "day"
                          ) === 0 ? (
                            <span className="text-success">Today</span>
                          ) : currentDate.diff(
                            lastLocalDataSyncDate,
                            "day"
                          ) === 1 ? (
                            <span className="text-warning">Yesterday</span>
                          ) : currentDate.diff(
                            lastLocalDataSyncDate,
                            "day"
                          ) >= 1 ? (
                            <span>
                              <span className="text-danger">
                                {currentDate.diff(
                                  lastLocalDataSyncDate,
                                  "day"
                                )}{" "}
                                days ago
                              </span>
                            </span>
                          ) : (
                            "error"
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* drug pickup for today */}
                  <div className="col-4">
                    <div className="card bg-light mb-3 text-center">
                      <div className="card-header text-dark font-weight-bold">Drug pickup</div>
                      <div className="card-body text-success p-2 m-2">
                        <Link to="./retention" className="nav-link p-0 small">
                          <span className="card-title mb-0 text-dark" title="View all Refills">Due for Refill ({PharmacyDrugRefill})</span>
                        </Link>
                      </div>
                      <div className="card-footer text-dark">
                        Refilled Today: <span className="text-success">0</span>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Globalproperties;