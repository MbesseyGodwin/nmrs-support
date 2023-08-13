import React, { useState, useEffect } from 'react';
import axios from 'axios';
import db from '../shared/indexedDB/DB';
import { useLiveQuery } from 'dexie-react-hooks';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function PushData() {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [htsData, setHtsData] = useState([]);
    const [globalpropertiesData, setGlobalpropertiesData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [pushStatus, setPushStatus] = useState('');
    const [lastPushTime, setLastPushTime] = useState('');
    const [currentPushTime, setCurrentPushTime] = useState('');

    const THREE_HOURS = 3 * 60 * 60 * 1000; // 3 hours in milliseconds


    const formatDate = (date) => {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${month} ${day}, ${year} ${hours}:${minutes}:${seconds}`;
    };

    const liveData = useLiveQuery(() => {
        return db.htslist.get(1);
    }, []);

    useEffect(() => {
        if (Array.isArray(liveData)) {
            setHtsData(liveData);
        } else {
            console.error('Live data is not an array:', liveData);
        }
    }, [liveData]);

    useEffect(() => {
        const getGlobalproperties = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/globalproperties');
                setGlobalpropertiesData(response.data);
            } catch (error) {
                console.error('Error fetching global properties:', error);
            } finally {
                setIsLoading(false);
            }
        };
        getGlobalproperties();
    }, []);

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);

            // Check if it's been 3 hours since the last push attempt
            const lastPushTime = localStorage.getItem('lastPushTime');
            if (!lastPushTime || Date.now() - parseInt(lastPushTime) >= THREE_HOURS) {
                handlePushData();
            }
        };

        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    const handlePushData = async () => {
        if (!isOnline) {
            alert('No internet connection. Data cannot be pushed.');
            return;
        }

        setShowModal(true); // Show "Please wait" modal

        const formattedDate = formatDate(new Date());
        const facilityName = globalpropertiesData.find((prop) => prop.property === 'Facility_Name')?.property_value;
        const datimCode = globalpropertiesData.find((prop) => prop.property === 'facility_datim_code')?.property_value;
        const state = globalpropertiesData.find((prop) => prop.property === 'State')?.property_value;

        const data = {
            name: facilityName,
            datimCode: datimCode,
            lga: [],
            state: state,
            htsData: htsData,
            iitData: htsData,
            ahdData: htsData,
            viralloadData: htsData,
            pbsData: htsData,
            datetime: formattedDate
        };

        try {
            const response = await fetch('http://localhost:5000/api/reports', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setPushStatus(`Data was successfully pushed to remote server`);
                setCurrentPushTime(formattedDate);
            } else {
                setPushStatus('Error pushing data to remote server');
            }
        } catch (error) {
            console.error('Error pushing data:', error);
            setPushStatus('Error pushing data to remote server');
        }

        setLastPushTime(localStorage.getItem('lastPushTime'));
        localStorage.setItem('lastPushTime', Date.now().toString());

        setTimeout(() => {
            setShowModal(false); // Close modal after push attempt
        }, 10000); // wait 10 seconds before 
    };

    const buttonClassName = isOnline ? 'btn btn-success mx-1' : 'btn btn-danger mx-1';

    // const formatDuration = (duration) => {
    //     const seconds = Math.floor((duration / 1000) % 60);
    //     const minutes = Math.floor((duration / (1000 * 60)) % 60);
    //     const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    //     return `${hours}h ${minutes}m ${seconds}s`;
    // };
    
    

    return (
        <div>
            <Modal show={showModal} onHide={() => setShowModal(false)} backdrop="static" keyboard={false} centered>
                <Modal.Header className='bg-light'>
                    <Modal.Title className='text-dark'>
                        <span className={pushStatus ? 'text-success' : 'text-danger'}>
                            {pushStatus ? `Completed` : 'Please Wait'}
                            {pushStatus ? <i className="fa fa-check"></i> : <i className="fa fa-spinner fa-spin"></i>}
                        </span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='bg-light'>
                    <span className='text-dark'>
                        {pushStatus ? (
                            <div>
                                <h1>{pushStatus}</h1>
                                <div className="">
                                    <table className="table table-bordered align-middle">
                                        <thead className="">
                                            <tr>
                                                <th>Last Push Time</th>
                                                <th>Current Push Time</th>
                                                {/* <th>Duration</th> */}
                                            </tr>
                                        </thead>
                                        <tbody className="table-group-divider">
                                            <tr className="">
                                                <td>{lastPushTime ? formatDate(new Date(parseInt(lastPushTime))) : 'N/A'}</td>
                                                <td>{currentPushTime ? formatDate(new Date(currentPushTime)) : 'N/A'}</td>
                                                {/* <td>{currentPushTime && lastPushTime ? formatDuration(currentPushTime - lastPushTime) : 'N/A'}</td> */}
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                
                            </div>
                        ) : (
                            'Pushing data to server...'
                        )}
                    </span>
                </Modal.Body>
                <Modal.Footer className='bg-light'>
                    <Button variant="success" className='bg-success' onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <button className={buttonClassName} onClick={handlePushData}>
                {isOnline ? 'Push Data, Online' : 'Push Data, Offline'}
            </button>
        </div>
    );
}

export default PushData;
