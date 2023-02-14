import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import dayjs from "dayjs";
import "animate.css/animate.min.css";

const Globalproperties = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [globalpropertiesData, setGlobalpropertiesData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getPbs();
  }, []);

  const getPbs = async () => {
    const response = await axios.get("http://localhost:5000/globalproperties");
    setGlobalpropertiesData(response.data);
    setIsLoading(false);
  };

  const currentDate = dayjs();
  const pastDate = dayjs().subtract(10, "day");
  const differenceInDays = currentDate.diff(pastDate, "day");

  return (
    <div className="col-md-8 grid-margin stretch-card">
      {globalpropertiesData.length > 0 && (
        <div className="card">
          <div className="card-body">
            <div className="d-flex flex-row justify-content-between  border-light border-bottom">
              <h4 className="card-title mb-1">Global Properties</h4>
              <p className="text-muted mb-1">Your data status</p>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="preview-list">
                  {/* for NDR last run date */}
                  <div className="preview-item border-bottom">
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-primary">
                        <i className="mdi mdi-file-document"></i>
                      </div>
                    </div>
                    <div className="preview-item-content d-sm-flex flex-grow">
                      <div className="flex-grow">
                        <h6 className="preview-subject">
                          {globalpropertiesData[234].property}
                        </h6>
                        <p className="text-muted mb-0">
                          {globalpropertiesData[234].description}
                        </p>
                      </div>
                      <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                        <p className="font-weight-bold font-italic">
                          {globalpropertiesData[234].property_value}
                        </p>
                        <p className="text-muted mb-0 animate__animated animate__shakeX">
                          {currentDate.diff(
                            globalpropertiesData[234].property_value,
                            "day"
                          ) === 0 ? (
                            <span className="text-success">Today</span>
                          ) : currentDate.diff(
                              globalpropertiesData[234].property_value,
                              "day"
                            ) === 1 ? (
                            <span className="text-warning">Yesterday</span>
                          ) : currentDate.diff(
                              globalpropertiesData[234].property_value,
                              "day"
                            ) >= 1 ? (
                            <span>
                              <span className="text-danger">
                                {currentDate.diff(
                                  globalpropertiesData[234].property_value,
                                  "day"
                                )}{" "}
                                days ago
                              </span>
                            </span>
                          ) : (
                            "error"
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* for datasync last run date */}
                  <div className="preview-item border-bottom">
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-primary">
                        <i className="mdi mdi-file-document"></i>
                      </div>
                    </div>
                    <div className="preview-item-content d-sm-flex flex-grow">
                      <div className="flex-grow">
                        <h6 className="preview-subject">
                          {globalpropertiesData[187].property}
                        </h6>
                        <p className="text-muted mb-0">
                          {globalpropertiesData[187].description}
                        </p>
                      </div>
                      <div className="mr-auto text-sm-right pt-2 pt-sm-0"> 
                        <p className="font-weight-bold font-italic">
                          {globalpropertiesData[187].property_value}
                        </p>
                        <p className="text-muted mb-0 animate__animated animate__shakeX">
                          {currentDate.diff(
                            globalpropertiesData[187].property_value,
                            "day"
                          ) === 0 ? (
                            <span className="text-success">Today</span>
                          ) : currentDate.diff(
                              globalpropertiesData[187].property_value,
                              "day"
                            ) === 1 ? (
                            <span className="text-warning">Yesterday</span>
                          ) : currentDate.diff(
                              globalpropertiesData[187].property_value,
                              "day"
                            ) >= 1 ? (
                            <span>
                              <span className="text-danger">
                                {currentDate.diff(
                                  globalpropertiesData[187].property_value,
                                  "day"
                                )}{" "}
                                days ago
                              </span>
                            </span>
                          ) : (
                            "error"
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* displaying facilty name */}
                  <div className="preview-item border-bottom">
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-success">
                        <i className="mdi mdi-cloud-download"></i>
                      </div>
                    </div>
                    <div className="preview-item-content d-sm-flex flex-grow">
                      <div className="flex-grow">
                        <h6 className="preview-subject">
                          {globalpropertiesData[152].property}
                        </h6>
                        <p className="text-muted mb-0">
                          {globalpropertiesData[431].property}
                        </p>
                      </div>
                      <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                        <p className="font-weight-bold font-italic">
                          {globalpropertiesData[152].property_value}
                        </p>
                        <p className="text-muted mb-0">
                          {globalpropertiesData[431].property_value}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* displaying datim code */}
                  <div className="preview-item border-bottom">
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-info">
                        <i className="mdi mdi-clock"></i>
                      </div>
                    </div>
                    <div className="preview-item-content d-sm-flex flex-grow">
                      <div className="flex-grow">
                        <h6 className="preview-subject">
                          {globalpropertiesData[150].property}
                        </h6>
                        <p className="text-muted mb-0">
                          {globalpropertiesData[150].property}
                        </p>
                      </div>
                      <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                        <p className="font-weight-bold font-italic text-default">
                          {globalpropertiesData[150].property_value}
                        </p>
                        <p className="text-muted mb-0">
                          {globalpropertiesData[150].description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* displaying Implementing Partner */}
                  <div className="preview-item border-bottom">
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-danger">
                        <i className="mdi mdi-email-open"></i>
                      </div>
                    </div>
                    <div className="preview-item-content d-sm-flex flex-grow">
                      <div className="flex-grow">
                        <h6 className="preview-subject">
                          {globalpropertiesData[282].property}
                        </h6>
                        <p className="text-muted mb-0">
                          {globalpropertiesData[285].property}
                        </p>
                      </div>
                      <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                        <p className="font-weight-bold font-italic">
                          {globalpropertiesData[282].property_value}
                        </p>
                        <p className="text-muted mb-0">
                          {globalpropertiesData[285].property_value}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Application Name */}
                  <div className="preview-item">
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-warning">
                        <i className="mdi mdi-chart-pie"></i>
                      </div>
                    </div>
                    <div className="preview-item-content d-sm-flex flex-grow">
                      <div className="flex-grow">
                        <h6 className="preview-subject">
                          {globalpropertiesData[25].property}
                        </h6>
                        <p className="text-muted mb-0">
                          {globalpropertiesData[25].description}
                        </p>
                      </div>
                      <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                        <p className="font-weight-bold font-italic">
                          {globalpropertiesData[25].property_value}
                        </p>
                        <p className="text-muted mb-0">
                          {globalpropertiesData[25].property}{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Globalproperties;
