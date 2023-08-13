import React, { useState, useEffect } from "react";
import db from "../shared/indexedDB/DB";
import { useLiveQuery } from "dexie-react-hooks";


function DashboardCards() {
    const [htsList, setHtsList] = useState([]);
    const [txCurList, setTxCurList] = useState([]);
    const [viralloadList, setViralloadList] = useState([]);
    const [retentionList, setRetentionList] = useState([]);
    const [pbsList, setPbsList] = useState([]);


    // hts data
    const htsData = useLiveQuery(() => {
        return db.htslist.get(1);
    }, []);

    useEffect(() => {
        if (htsData !== undefined) {
            setHtsList(htsData);
        }
    }, [htsData]);

    // viral load data
    const viralloadData = useLiveQuery(() => {
        return db.viralloadlist.get(1);
    }, []);

    useEffect(() => {
        if (viralloadData !== undefined) {
            setViralloadList(viralloadData);
        }
    }, [viralloadData]);



    return (
        <div>
            {/* <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">OpenMRS</a></li>
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item text-info active" aria-current="page">Dashboard</li>
                    <li style={{ marginLeft: 'auto' }}><a href="#" className='text-danger'>Reload</a></li>
                </ol>
            </nav> */}
            <div className="row">
                <div className="col-xl col-sm-6 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-9">
                                    <div className="d-flex align-items-center align-self-start">
                                        <h5 className="mb-0">
                                            {htsList.length}
                                        </h5>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="icon icon-box-success">
                                        <p className="text-success mb-0 font-weight-medium">
                                            0%
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <h6 className="text-muted font-weight-normal">HTS TST</h6>
                        </div>
                    </div>
                </div>
                <div className="col-xl col-sm-6 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-9">
                                    <div className="d-flex align-items-center align-self-start">
                                        <h5 className="mb-0">{0}</h5>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="icon icon-box-success">
                                        <p className="text-success mb-0 font-weight-medium">
                                            0%
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <h6 className="text-muted font-weight-normal">
                                TX Curr
                            </h6>
                        </div>
                    </div>
                </div>
                <div className="col-xl col-sm-6 grid-margin stretch-card">
                    <div className="card" style={{}}>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-9">
                                    <div className="d-flex align-items-center align-self-start">
                                        <h5 className="mb-0">{viralloadList.length}</h5>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="icon icon-box-success">
                                        <p className="text-success mb-0 font-weight-medium">
                                            0%
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <h6 className="text-muted font-weight-normal">VL Coverage</h6>
                        </div>
                    </div>
                </div>
                <div className="col-xl col-sm-6 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-9">
                                    <div className="d-flex align-items-center align-self-start">
                                        <h5 className="mb-0">{0}</h5>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="icon icon-box-success">
                                        <p className="text-success mb-0 font-weight-medium">
                                            0%
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <h6 className="text-muted font-weight-normal">Retention</h6>
                        </div>
                    </div>
                </div>
                <div className="col-xl col-sm-6 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-9">
                                    <div className="d-flex align-items-center align-self-start">
                                        <h5 className="mb-0">{0}</h5>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="icon icon-box-success">
                                        <p className="text-success mb-0 font-weight-medium">
                                            0%
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <h6 className="text-muted font-weight-normal">Biometrics</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default DashboardCards