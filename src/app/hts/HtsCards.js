import React, { useState, useEffect } from "react";
import axios from "axios";

const HtsCards = React.memo(() => {

    const [htsResults, setHtsResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const cachedData = localStorage.getItem("hts-results");
        if (cachedData) {
            setHtsResults(JSON.parse(cachedData));
        } else {
            fetchHtsResults();
        }
    }, []);

    const fetchHtsResults = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("http://localhost:5000/htsresults");
            setHtsResults(response.data);
            localStorage.setItem("hts-results", JSON.stringify(response.data));
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const totalHtsPos = htsResults.length > 0 ? htsResults[0].TOTAL_HTS_POS : 0;
    const totalHtsNeg = htsResults.length > 0 ? htsResults[0].TOTAL_HTS_NEG : 0;
    const totalTested = totalHtsPos + totalHtsNeg;

    console.log(totalHtsPos);
    console.log(totalHtsNeg);
    console.log(totalTested);

    const INTERVAL_TIME = 1 * 60 * 60 * 1000; // 1 hour in milliseconds
    const updateData = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get("http://localhost:5000/htsresults");
            setHtsResults(response.data);
            localStorage.setItem("hts-results", JSON.stringify(response.data));
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    // Call updateData() immediately to load data when the component mounts
    useEffect(() => {
        updateData();
    }, []);

    // Call updateData() every 5 seconds using setInterval()
    useEffect(() => {
        const interval = setInterval(() => {
            updateData();
        }, INTERVAL_TIME);

        // Return a function to clean up the interval when the component unmounts
        return () => clearInterval(interval);
    }, []);


    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">OpenMRS</a></li>
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item text-info active" aria-current="page">HTS</li>
                    <li style={{ marginLeft: 'auto' }}><a href="#" className='text-danger'>Reload</a></li>
                </ol>
            </nav>
            <div className="row">
                <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
                    <div className="card d-block">
                        <div className="card-body carousel-item active">
                            <div className="row">
                                <div className="col-9">
                                    <div className="d-flex align-items-center align-self-start">
                                        <h3 className="mb-0">{isLoading ? (
                                            "Loading..."
                                        ) : (
                                            totalTested
                                        )}</h3>

                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="icon icon-box-success ">
                                        <span className="mdi mdi mdi-human-male-female icon-item"></span>
                                    </div>
                                </div>
                            </div>
                            <h6 className="font-weight-normal small">
                                Total Tested
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
                                            "Loading..."
                                        ) : (
                                            totalHtsNeg
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
                                Tested Negative
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
                                            <h3 className="mb-0">{totalHtsPos}</h3>
                                        )}</h3>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="icon icon-box-success">
                                        <span className="mdi mdi-magnify-plus icon-item"></span>
                                    </div>
                                </div>
                            </div>
                            <h6 className="font-weight-normal small">Tested Positive</h6>
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
                                Enrolled on ART
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default HtsCards;
