import React, { useState, useEffect } from "react";

const HtsCards = React.memo(() => {
    const [htsResults, setHtsResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const eventSource = new EventSource("http://localhost:4000/sse/htsresults");
        eventSource.onmessage = (event) => {
            const newResults = JSON.parse(event.data);
            setHtsResults(newResults);
        };
        return () => eventSource.close();
    }, []);

    console.log(htsResults.TOTAL_TESTED);

    return (
        <div>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div className="bg-dark">
                    <p>Total tested: {htsResults.TOTAL_TESTED}</p>
                    <p>Total positive: {htsResults.TOTAL_HTS_POS}</p>
                    <p>Total negative: {htsResults.TOTAL_HTS_NEG}</p>
                </div>
            )}
        </div>
    );
});

export default HtsCards;