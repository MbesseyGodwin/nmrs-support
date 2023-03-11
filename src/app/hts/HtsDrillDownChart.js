import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'A', value: 10, subData: [{ name: 'A1', value: 5 }, { name: 'A2', value: 5 }] },
    { name: 'B', value: 20, subData: [{ name: 'B1', value: 10 }, { name: 'B2', value: 10 }] },
    { name: 'C', value: 30, subData: [{ name: 'C1', value: 15 }, { name: 'C2', value: 15 }] },
];

const HtsDrillDownChart = ({ data: initialData }) => {
    const [currentData, setCurrentData] = useState(initialData || data);
    const [parentData, setParentData] = useState([]);

    const handleBarClick = (data, index) => {
        setParentData([...currentData]);
        setCurrentData(data.subData);
    };

    const handleReturnClick = () => {
        if (parentData.length > 0) {
            setCurrentData(parentData.pop());
            setParentData([parentData]);
        }
    };

    return (
        <>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={currentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" onClick={handleBarClick} />
                </BarChart>
            </ResponsiveContainer>
            {parentData.length > 0 && (
                <button onClick={handleReturnClick}>Return to Previous Chart</button>
            )}
        </>
    );
};

export default HtsDrillDownChart;