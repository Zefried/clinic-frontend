import React from 'react';
import { customStateMethods } from '../../Admin/protected/CustomAppState/CustomState';
import usePagination from '../../CustomHook/usePagination';
import { Link } from 'react-router-dom';
import patientIcon from '../../Assets/img/registration/patient.jpeg';
import useSearch from '../../CustomHook/useSearch';
import { useEffect } from 'react';


export const ViewAssignedPatientLab = () => {
    let token = customStateMethods.selectStateKey('appState', 'token');
    let api = '/api/lab/fetch-assigned-patient-lab';

    const { listData, loading, messages, paginationUI } = usePagination(api, token);
    const [selectedPatient, setSelectedPatient] = React.useState(null);

    const {
        setQuery,
        query,
        handleSearch,
        suggestions,
        selected,
        handleSuggestionClick,
    } = useSearch(token, '/api/lab/search-assigned-patient-lab');

    
    const handleSugClick = (id) => {
        const patient = listData.find((item) => item.patient_id === id); // Find patient by ID
        setSelectedPatient(patient); // Set selected patient
    };

    useEffect(() => {
        if (selectedPatient) {
            handleSuggestionClick({});
            setQuery(''); // Reset search query
        }
    }, [selectedPatient]); // This effect runs only when selectedPatient changes

    // Generate patient table rows for all patients
    const patientTable = listData?.map((item, index) => (
        <tr key={item.id}>
            <td>{index + 1}</td>
            <td>
                <img className="patientIcon" src={patientIcon} alt="User Icon" style={{ height: '35px', width: '35px' }} />
            </td>
            <td>{item.patient_name}</td>
            <td>{item.lab_name}</td>
            <td>{item.employee_name}</td>
            <td>{item.discount}</td>
            <td>
                <Link to={`/user/view-lab-details/${item.lab_id}`} className="btn btn-outline-primary btn-sm">Full Info</Link>
            </td>
            <td>
                <Link to={`/lab/assigned-patient-entry-lab/${item.patient_id}`} className="btn btn-outline-primary btn-sm">Proceed</Link>
            </td>
        </tr>
    ));

    // Suggestions UI
    let suggestionUI = suggestions ? (
        <div>
            <ul className="list-group m-3 col-lg-7">
                {suggestions.map(({ patient_id, patient_name, lab_name, employee_name }) => (
                    <li
                        key={patient_id}
                        className="list-group-item list-group-item-action"
                        onClick={() => handleSugClick(patient_id)}
                        style={{ cursor: 'pointer' }}
                    >
                        <strong>Patient Name : {patient_name}</strong> | Lab name : {lab_name} | Employee : {employee_name}
                    </li>
                ))}
            </ul>
        </div>
    ) : '';

    // Render only selected patient if one is selected
    const renderedTable = selectedPatient ? (
        <tr key={selectedPatient.id}>
            <td>1</td>
            <td>
                <img className="patientIcon" src={patientIcon} alt="User Icon" style={{ height: '35px', width: '35px' }} />
            </td>
            <td>{selectedPatient.patient_name}</td>
            <td>{selectedPatient.lab_name}</td>
            <td>{selectedPatient.employee_name}</td>
            <td>{selectedPatient.discount}</td>
            <td>
                <Link to={`/user/view-lab-details/${selectedPatient.lab_id}`} className="btn btn-outline-primary btn-sm">Full Info</Link>
            </td>
            <td>
                <Link to={`/user/view-lab-details/${selectedPatient.lab_id}`} className="btn btn-outline-primary btn-sm">Proceed</Link>
            </td>
        </tr>
    ) : null;

    return (
        <div>
            ViewAssignedPatientLab
            {loading}
            {messages}

            {/* Search Input */}
            <input
                className="form-control col-lg-5"
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Search..."
            />

            {/* Suggestions UI */}
            {suggestionUI}

            <p className="h3 text-center mt-3">View All Patient</p>

            <div className="table-responsive table-container">
                <table className="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Profile</th>
                            <th>Name</th>
                            <th>Lab Name</th>
                            <th>Employee Name</th>
                            <th>Discount</th>
                            <th>Full Info</th>
                            <th>Proceed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* If selectedPatient is set, render it; otherwise, render full list */}
                        {selectedPatient ? renderedTable : patientTable}
                    </tbody>
                </table>
            </div>

            {/* Render pagination UI */}
            {paginationUI}
        </div>
    );
};