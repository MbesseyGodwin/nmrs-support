import React, { useState, useEffect } from "react";
import axios from "axios";
import db from "./DB";

db.version(1).stores({
    htslist: 'id++, PatientID, Age, Sex, EnrollDate'
});

db.version(1).stores({
    viralloadlist: 'id++, PatientID, Age'
});

function DexieInsert() {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            try {
                const response = await axios.get("http://localhost:5000/htslist");
                const newData = response.data;

                // console.log(newData);
                newData.id = 1;
                const count = await db.htslist.count();

                if (count > 0) {
                    if (count !== newData.length) {
                        // Data has changed, so update the database
                        await db.htslist.put(newData, 1);
                        console.log("Data has changed, so update htslist");
                    }
                } else {
                    // Database is empty, so insert new data
                    await db.htslist.put(newData, 1);
                    console.log("new data added to htslist");
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);



    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            try {
                const response = await axios.get("http://localhost:5000/viralloadlist");
                const newData = response.data;

                // console.log(newData);
                newData.id = 1;
                const count = await db.viralloadlist.count();

                if (count > 0) {
                    if (count !== newData.length) {
                        // Data has changed, so update the database
                        await db.viralloadlist.put(newData, 1);
                        console.log("Data has changed, so update viralloadlist");
                    }
                } else {
                    // Database is empty, so insert new data
                    await db.viralloadlist.put(newData, 1);
                    console.log("new data added to viralloadlist");
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);


    return (
        <></>
    );
}

export default DexieInsert;