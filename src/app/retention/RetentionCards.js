import React, { useState, useEffect } from "react";
import axios from "axios";

export default function RetentionCards() {

    const [RetentionResults, setRetentionResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getRetentionResults = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get("http://localhost:5000/");
                setRetentionResults(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        getRetentionResults();
    }, []);

    return (
        <div>
            {/* <nav aria-label="breadcrumb" className="bg-black">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item text-orange-600"><a href="#">OpenMRS</a></li>
                    <li className="breadcrumb-item text-orange-600"><a href="#">Home</a></li>
                    <li className="breadcrumb-item text-orange-600 text-info active" aria-current="page">Retention</li>
                    <li style={{ marginLeft: 'auto' }}><a href="#" className='text-danger'>Reload</a></li>
                </ol>
            </nav> */}
            <div className="row">
                <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
                    <div className="card d-block">

                        <div className="card-body carousel-item active">
                            <div className="row">
                                <div className="col-9">
                                    <div className="d-flex align-items-center align-self-start">
                                        {isLoading ? (
                                            <h3 className="mb-0">Loading...</h3>
                                        ) : (
                                            <h3 className="mb-0">NOT SET</h3>
                                        )}
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="icon icon-box-success ">
                                        <span className="mdi mdi mdi-human-male-female icon-item"></span>
                                    </div>
                                </div>
                            </div>
                            <h6 className="font-weight-normal small">
                                Ever Enrolled
                            </h6>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-9">
                                    <div className="d-flex align-items-center align-self-start">
                                        <h3 className="mb-0">{isLoading ? (
                                            <h3 className="mb-0">Loading...</h3>
                                        ) : (
                                            <h3 className="mb-0">NOT SET</h3>
                                        )}</h3>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="icon icon-box-success">
                                        <span className="mdi mdi-magnify-minus icon-item"></span>
                                    </div>
                                </div>
                            </div>
                            <h6 className="font-weight-normal small">
                                Tx Cur
                            </h6>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-9">
                                    <div className="d-flex align-items-center align-self-start">
                                        <h3 className="mb-0">{isLoading ? (
                                            <h3 className="mb-0">Loading...</h3>
                                        ) : (
                                            <h3 className="mb-0">NOT SET</h3>
                                        )}</h3>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="icon icon-box-success">
                                        <span className="mdi mdi-magnify-plus icon-item"></span>
                                    </div>
                                </div>
                            </div>
                            <h6 className="font-weight-normal small">
                                IIT/LTFU
                            </h6>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-9">
                                    <div className="d-flex align-items-center align-self-start">
                                        <h3 className="mb-0">NOT SET</h3>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="icon icon-box-success ">
                                        <span className="mdi mdi-shield-half-full icon-item"></span>
                                    </div>
                                </div>
                            </div>
                            <h6 className="font-weight-normal small">
                                Termination/Deaths
                            </h6>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
    )
}
