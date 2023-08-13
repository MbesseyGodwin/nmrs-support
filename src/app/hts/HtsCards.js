import React, { useState, useEffect } from "react";
import axios from "axios";
import db from "../shared/indexedDB/DB";
import { useLiveQuery } from 'dexie-react-hooks';

const HtsCards = React.memo(() => {
    const [htsData, setHtsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const liveData = useLiveQuery(() => {
        return db.htslist.get(1);
    }, []);

    useEffect(() => {
        if (Array.isArray(liveData)) { // Check if liveData is an array
            setHtsData(liveData);
        } else {
            console.error("Live data is not an array:", liveData);
        }
    }, [liveData]);

    // Ensure that htsData is an array before filtering
    const totalHtsNegative = Array.isArray(htsData)
        ? htsData.filter((item) => item.FinalResult === 'Negative').length
        : 0;

    const totalHtsPositive = Array.isArray(htsData)
        ? htsData.filter((item) => item.FinalResult === 'Positive').length
        : 0;

    const linkage = Array.isArray(htsData)
        ? htsData.filter((item) => item.FinalResult === 'Positive' && item.PepfarID !== null).length
        : 0;

    const linkagePercentage = Array.isArray(htsData)
        ? (linkage / totalHtsPositive) * 100
        : 0;

    return (
        <div>
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
                                            htsData.length
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
                                            totalHtsNegative
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
                                            <h3 className="mb-0">{totalHtsPositive}</h3>
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
                                        <h3 className="mb-0">{linkage}</h3>
                                        <p className="text-success ml-2 mb-0 font-weight-medium">{`+${linkagePercentage.toFixed()}%`}</p>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="icon icon-box-success ">
                                        <span className="mdi mdi-shield-half-full icon-item"></span>
                                    </div>

                                </div>
                            </div>
                            <h6 className="font-weight-normal small">
                                Linkage
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default HtsCards;
