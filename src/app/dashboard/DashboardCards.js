import React from 'react'


function DashboardCards() {
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">OpenMRS</a></li>
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item text-info active" aria-current="page">Dashboard</li>
                    <li style={{ marginLeft: 'auto' }}><a href="#" className='text-danger'>Reload</a></li>
                </ol>
            </nav>
            <div className="row">
                <div className="col-xl col-sm-6 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-9">
                                    <div className="d-flex align-items-center align-self-start">
                                        <h3 className="mb-0">
                                            NOT SET
                                        </h3>
                                        <p className="text-success ml-2 mb-0 font-weight-medium">
                                            +3.5%
                                        </p>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="icon icon-box-success ">
                                        <span className="mdi mdi-human-male-female icon-md"></span>
                                    </div>
                                </div>
                            </div>
                            <h6 className="text-muted font-weight-normal">Testing</h6>
                        </div>
                    </div>
                </div>
                <div className="col-xl col-sm-6 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-9">
                                    <div className="d-flex align-items-center align-self-start">
                                        <h3 className="mb-0">NOT SET</h3>
                                        <p className="text-success ml-2 mb-0 font-weight-medium">
                                            +0%
                                        </p>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="icon icon-box-success">
                                        <span className="mdi mdi-hospital icon-md"></span>
                                    </div>
                                </div>
                            </div>
                            <h6 className="text-muted font-weight-normal">
                                Treatment
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
                                        <h3 className="mb-0">NOT SET</h3>
                                        <p className="text-danger ml-2 mb-0 font-weight-medium">
                                            -0%
                                        </p>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="icon icon-box-success">
                                        <span className="mdi mdi-test-tube icon-md"></span>
                                    </div>
                                </div>
                            </div>
                            <h6 className="text-muted font-weight-normal">Viral Load</h6>
                        </div>
                    </div>
                </div>
                <div className="col-xl col-sm-6 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-9">
                                    <div className="d-flex align-items-center align-self-start">
                                        <h3 className="mb-0">NOT SET</h3>
                                        <p className="text-danger ml-2 mb-0 font-weight-medium">
                                            -0%
                                        </p>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="icon icon-box-success">
                                        <span className="mdi mdi-comment-plus-outline icon-md"></span>
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
                                        <h3 className="mb-0">NOT SET</h3>
                                        <p className="text-danger ml-2 mb-0 font-weight-medium">
                                            -0%
                                        </p>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="icon icon-box-success">
                                        <span className="mdi mdi-truck-delivery icon-md"></span>
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