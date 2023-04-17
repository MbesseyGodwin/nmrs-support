import React, { useState, useMemo, useCallback, useEffect } from 'react';
import axios from "axios";
import DataTable from 'react-data-table-component';
import { Button, Input } from 'reactstrap';
import db from "../shared/indexedDB/DB";
import { useLiveQuery } from "dexie-react-hooks";

const customStyles = {
    headCells: {
        style: {
            fontWeight: 'bold',
            fontSize: '16px',
            backgroundColor: '#ff13',
            marginTop: "10px",
        },
    },
    rows: {
        style: {
            fontSize: '14px',
            border: '1px solid #dee2e6',
            '&:hover': {
                backgroundColor: '#f5f5f5',
            },
        },
    },
};


const ViralLoadDataTable = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [viralLoadData, setViralLoadData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [ageSearchText, setAgeSearchText] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);


    const liveData = useLiveQuery(() => {
        return db.viralloadlist.get(1);
    }, []);

    useEffect(() => {
        if (liveData !== undefined) {
            setViralLoadData(liveData);
            console.log("dexie data =:", liveData);
        }
    }, [liveData]);

    // useEffect(() => {
    //     async function fetchData() {
    //         setIsLoading(true);
    //         try {
    //             const response = await axios.get("http://localhost:5000/viralloadlist");
    //             const newData = response.data;

    //             console.log(newData);
    //             newData.id = 1;
    //             const count = await db.viralloadlist.count();

    //             console.log(count);
    //             if (count > 0) {
    //                 const data = await db.viralloadlist.get(1);
    //                 if (count !== newData.length) {
    //                     // Data has changed, so update the database
    //                     console.log("new data id = " + newData.id);
    //                     await db.viralloadlist.put(newData, 1);
    //                     setViralLoadData(newData);
    //                 } else {
    //                     // Data has not changed, so update state variable with data from Dexie database
    //                     setViralLoadData(data);
    //                 }
    //             } else {
    //                 // Database is empty, so insert new data
    //                 await db.viralloadlist.put(newData, 1);
    //                 setViralLoadData(newData);
    //             }
    //         } catch (error) {
    //             console.error(error);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     }

    //     fetchData();
    // }, []);

    const columns = useMemo(
        () => [
            { name: 'PepfarID', selector: 'PepfarID', sortable: true },
            { name: 'SampleID', selector: 'SampleID', sortable: true },
            { name: 'Age', selector: 'Age', sortable: true },
            { name: 'Sex', selector: 'Sex', sortable: true },
        ],
        []
    );



    const handleSort = useCallback(
        (column, sortDirection) => {
            setSortDirection(sortDirection);
        },
        []
    );


    const handleSearch = useCallback((event) => {
        const searchText = event.target.value;
        setSearchText(searchText);
        setCurrentPage(1);
        setAgeSearchText('');
    }, []);



    const filteredData = useMemo(() => {
        if (searchText === '' && ageSearchText === '') return viralLoadData;
        return viralLoadData.filter((row) =>
            row.PepfarID.toLowerCase().includes(searchText.toLowerCase()) &&
            row.Age.toString().toLowerCase().includes(ageSearchText.toLowerCase())
        );
    }, [viralLoadData, searchText, ageSearchText]);

    console.log(filteredData.length);

    const filteredAndSortedData = useMemo(() => {
        if (sortDirection === 'asc') {
            return filteredData.sort((a, b) => a.id - b.id);
        } else {
            return filteredData.sort((a, b) => b.id - a.id);
        }
    }, [filteredData, sortDirection]);



    const paginatedData = useMemo(() => {
        const offset = (currentPage - 1) * itemsPerPage;
        return filteredAndSortedData.slice(offset, offset + itemsPerPage);
    }, [currentPage, filteredAndSortedData, itemsPerPage]);


    return (
        <div>
            <div className='d-flex'>
                <Input className='ml-2 text-danger' bsSize="lg" type="text" placeholder="Search" onChange={handleSearch} />
                <span className='btn btn-danger d-flex justify-content-center align-items-center text-center'>{filteredData.length}</span>
                <Input className='ml-2 text-danger' bsSize="lg" type="number" placeholder="Search by age" onChange={(e) => setViralLoadData(e.target.value)} />
                <Input className='mx-2 text-danger' bsSize="lg" type="select" name="itemsPerPage" id="itemsPerPage" onChange={(e) => setItemsPerPage(parseInt(e.target.value))}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value={viralLoadData.length}>All</option>
                </Input>
            </div>


            <DataTable
                className='table'
                theme=""
                columns={columns}
                data={paginatedData}
                onSort={handleSort}
                pagination
                paginationServer
                paginationTotalRows={filteredAndSortedData.length}
                onChangePage={setCurrentPage}
                paginationPerPage={1}
                customStyles={customStyles} // add custom styles
            />
        </div>
    );
};

export default ViralLoadDataTable;
