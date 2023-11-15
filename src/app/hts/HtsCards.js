import React, { useState, useEffect } from "react";
import axios from "axios";
import db from "../shared/indexedDB/DB";
import { useLiveQuery } from 'dexie-react-hooks';

// Define a React memoized functional component for rendering HTS cards
const HtsCards = React.memo(() => {
    // State to store HTS data
    const [htsData, setHtsData] = useState([]);
    // Fetch live data using Dexie's useLiveQuery hook
    const liveData = useLiveQuery(() => db.htslist.get(1), []);

    // Effect to update component state when liveData changes
    useEffect(() => {
        // Check if liveData is an array before updating the state
        Array.isArray(liveData) ? setHtsData(liveData) : console.error("Live data is not an array:", liveData);
    }, [liveData]);

    // Function to get metric based on the provided filter
    const getMetric = (filter) => {
        if (Array.isArray(htsData)) {
            if (filter === '') {
                return htsData.length;
            } else if (filter === 'Negative') {
                return htsData.filter((item) => item.FinalResult === filter).length;
            } else if (filter === 'Positive') {
                return htsData.filter((item) => item.FinalResult === filter).length;
            } else if (filter === 'PositiveLinkage') {
                return htsData.filter((item) => item.FinalResult === 'Positive' && item.PepfarID !== null).length;
            }
        }
        return "Loading...";
    };

    // Render the component
    return (
        <div>
            <div className="row">
                {/* Render metric cards for different categories */}
                {metricCard("Total Tested", getMetric(''), "mdi-human-male-female")}
                {metricCard("Tested Negative", getMetric('Negative'), "mdi-magnify-minus")}
                {metricCard("Tested Positive", getMetric('Positive'), "mdi-magnify-plus")}
                {metricCard("Linkage", getMetric('PositiveLinkage'), "mdi-shield-half-full")}
            </div>
        </div>
    );

    // Function to render individual metric cards
    function metricCard(title, value, iconClass, additionalValue = "") {
        return (
            <div className="col-xl-3 col-sm-6 grid-margin stretch-card" key={title}>
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-9">
                                <div className="d-flex align-items-center align-self-start">
                                    {/* Display metric value and additional value if provided */}
                                    <h3 className="mb-0">{value}</h3>
                                    {additionalValue && <p className="text-success ml-2 mb-0 font-weight-medium">{additionalValue}</p>}
                                </div>
                            </div>
                            <div className="col-3">
                                <div className={`icon icon-box-success`}>
                                    {/* Display the icon based on the provided class */}
                                    <span className={`mdi ${iconClass} icon-item`}></span>
                                </div>
                            </div>
                        </div>
                        {/* Display metric title */}
                        <h6 className="font-weight-normal small">{title}</h6>
                    </div>
                </div>
            </div>
        );
    }
});

// Export the component
export default HtsCards;
