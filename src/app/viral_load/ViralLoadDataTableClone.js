import React, { useState, useMemo, useCallback, useEffect } from 'react';
import axios from "axios";
import DataTable from 'react-data-table-component';
import {
    Button,
    InputGroup,
    InputGroupText,
    Input,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import db from "../shared/indexedDB/DB";
import { useLiveQuery } from "dexie-react-hooks";


const customStyles = {
    headCells: {
        style: {
            fontWeight: '500',
            fontSize: '16px',
            color: '#fff',
            backgroundColor: '#2a3038',
            marginTop: "10px",
            borderRight: '1px solid #000',
        },
    },
    cells: {
        style: {
            fontSize: '15px',
            borderRight: '1px solid #000',
            margin: 0, // remove all margins from cells
        },
    },
    rows: {
        style: {
            fontSize: '14px',
            border: '1px solid #000',
            '&:hover': {
                backgroundColor: '#a5f5a5',
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

    const liveData = useLiveQuery(() => db.viralloadlist.get(1), []);

    useEffect(() => {
        if (liveData !== undefined) {
            setViralLoadData(liveData);
            console.log("dexie data =:", liveData);
        }
    }, [liveData]);

    const columns = [
        { name: 'VisitDate', selector: 'VisitDate', sortable: true },
        { name: 'PepfarID', selector: 'PepfarID', sortable: true },
        { name: 'SampleID', selector: 'SampleID', sortable: true },
        { name: 'Age', selector: 'Age', sortable: true },
        { name: 'Sex', selector: 'Sex', sortable: true },
        { name: 'ViralLoadResult', selector: 'ViralLoadResult', sortable: true },
        { name: 'OrderedDate', selector: 'OrderedDate', sortable: true },
        { name: 'ResultDate', selector: 'ResultDate', sortable: true },
    ];

    const handleSort = useCallback(
        (column, sortDirection) => {
            setSortDirection(sortDirection);
        },
        []
    );

    const filteredAndSortedData = useMemo(() => {
        let data = viralLoadData;

        // filter data based on search text
        if (searchText.trim() !== '') {
            const searchTextLower = searchText.trim().toLowerCase(); // trim added
            data = data.filter((row) => {
                return Object.values(row).some((value) => {
                    return String(value).toLowerCase().includes(searchTextLower);
                });
            });
        }

        // sort data based on sort direction
        if (sortDirection === 'asc') {
            data.sort((a, b) => a.id - b.id);
        } else {
            data.sort((a, b) => b.id - a.id);
        }

        return data;
    }, [viralLoadData, searchText, sortDirection]);




    const paginatedData = useMemo(() => {
        const offset = (currentPage - 1) * itemsPerPage;
        return filteredAndSortedData.slice(offset, offset + itemsPerPage);
    }, [currentPage, filteredAndSortedData, itemsPerPage]);

    return (
        <div>
            <div className='d-flex'>
                <InputGroup>
                    <InputGroupText className="" size="lg">
                        <span className="text-danger" style={{ 'fontWeight': 'bold', 'fontSize': '20px' }}>
                            {filteredAndSortedData.length}
                        </span>
                    </InputGroupText>
                    <Input
                        placeholder="Search"
                        size="lg"
                        className='text-danger'
                        style={{ 'fontSize': '20px' }}
                        type="text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </InputGroup>

                <Input
                    className='mx-2 text-danger'
                    style={{ 'fontSize': '15px' }}
                    bsSize="lg"
                    type="select"
                    name="itemsPerPage"
                    id="itemsPerPage"
                    onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
                >
                    <option className='form-select-option h5' value="5" selected>Rows Per Page (Default 5)</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value={viralLoadData.length}>All</option>
                </Input>

                <Input
                    className='mx-2 text-danger form-control'
                    style={{ 'fontSize': '15px' }}
                    bsSize="lg"
                    type="select"
                    name=""
                    id=""
                    onChange={(e) => (parseInt(e.target.value))}
                >
                    <option className='form-select-option h5' selected>Filter Data</option>
                    <option className='form-select-option h5' value="">Male</option>
                    <option className='form-select-option h5' value="">Female</option>
                    <option className='form-select-option h5' value="">Adults</option>
                    <option className='form-select-option h5' value="">Pediatrics</option>
                    <option className='form-select-option h5' value="">Suppressed</option>
                    <option className='form-select-option h5' value="">Unsuppressed</option>
                    <option className='form-select-option h5' value="">Eligible</option>
                    <option className='form-select-option h5' value="">Samples Collected</option>
                </Input>



                <UncontrolledDropdown className="ml-2" direction="end">
                    <DropdownToggle caret color="dark" size='lg'>Download</DropdownToggle>
                    <DropdownMenu className='p-0'>
                        <DropdownItem className='px-1'><Button className='form-control' block color="primary" outline>CSV</Button></DropdownItem>
                        <DropdownItem divider className='m-0' />

                        <DropdownItem className='px-1'><Button className='form-control' block color="primary" outline>PDF</Button></DropdownItem>
                        <DropdownItem divider className='m-0' />

                        <DropdownItem disabled className='px-1'><Button className='form-control' block color="primary" outline>JSON</Button></DropdownItem>
                        <DropdownItem divider className='m-0' />

                        <DropdownItem disabled className='px-1'><Button className='form-control' block color="primary" outline>XML</Button></DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
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