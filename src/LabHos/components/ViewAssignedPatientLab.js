import React, { useEffect, useState } from 'react';
import { customStateMethods } from '../../Admin/protected/CustomAppState/CustomState';
import usePagination from '../../CustomHook/usePagination';
import { Link } from 'react-router-dom';
import patientIcon from '../../Assets/img/registration/patient.jpeg';
import useSearch from '../../CustomHook/useSearch';
import axios from 'axios';

export const ViewAssignedPatientLab = () => {
    let token = customStateMethods.selectStateKey('appState', 'token');
    const [api, setApi] = useState('/api/lab/fetch-assigned-patient-lab');
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [employee, setEmployee] = useState(null);
    const [selectedEmployeeId, setEmployeeId] = useState(null);
    const [employeeList, setEmployeeList] = useState([]);

    const { listData, loading, messages, paginationUI } = usePagination(api, token);
    const {
        setQuery,
        query,
        handleSearch,
        suggestions,
        handleSuggestionClick,
    } = useSearch(token, '/api/lab/search-assigned-patient-lab');

    const handleSugClick = (id) => {
        const patient = listData.find((item) => item.patient_id === id);
        setSelectedPatient(patient);
    };

    useEffect(() => {
        if (selectedPatient) {
            handleSuggestionClick({});
            setQuery('');
        }
    }, [selectedPatient]);

    useEffect(() => {
        // Fetch employee data on component mount
        const fetchEmployees = async () => {
            try {
                const response = await axios.get(`/api/lab/fetch-all-lab-employee`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (response.data.status === 200) {
                    setEmployeeList(response.data.data);
                } else {
                    console.error('Failed to fetch employees.');
                }
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        fetchEmployees();
    }, [token]);

    useEffect(() => {
        // Update API when the selected employee changes
        if (selectedEmployeeId) {
            setApi(`/api/lab/fetch-assigned-patient-lab?employee_id=${selectedEmployeeId}`);
        } else {
            setApi('/api/lab/fetch-assigned-patient-lab');
        }
    }, [selectedEmployeeId]);

    const handleEmployeeSelect = (id) => {
        const selectedEmp = employeeList.find((emp) => emp.id === id);
        setEmployee(selectedEmp);
        setEmployeeId(id);
    };

    return (
        <div>
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
            {suggestions && (
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
            )}

            <p className="h3 text-center mt-3">View All Patient</p>

            {/* Employee Selection */}
            <div className="mb-3 col-lg-3">
                <label htmlFor="employeeSelect" className="form-label">Select Employee</label>
                <select
                    id="employeeSelect"
                    className="form-select"
                    value={selectedEmployeeId || ''}
                    onChange={(e) => handleEmployeeSelect(Number(e.target.value))}
                >
                    <option value="">Select an employee</option>
                    {employeeList.map((emp) => (
                        <option key={emp.id} value={emp.id}>
                            {emp.name} ({emp.role})
                        </option>
                    ))}
                </select>
            </div>

            {/* Display Selected Employee */}
            {employee && (
                <div className="alert alert-info mt-3 col-lg-3" role="alert">
                    <strong>Selected Employee:</strong> {employee.name}
                </div>
            )}

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
                        {selectedPatient
                            ? <tr key={selectedPatient.id}>
                                <td>1</td>
                                <td>
                                    <img className="patientIcon" src={patientIcon} alt="User Icon" style={{ height: '35px', width: '35px' }} />
                                </td>
                                <td>{selectedPatient.patient_name}</td>
                                <td>{selectedPatient.lab_name}</td>
                                <td>{selectedPatient.employee_name}</td>
                                <td>{selectedPatient.discount}</td>
                                <td>
                                    <Link to={`/lab/view-assigned-patient-full-info/${selectedPatient.patient_id}`} className="btn btn-outline-primary btn-sm">Full Info</Link>
                                </td>
                                <td>
                                    <Link to={`/lab/assigned-patient-entry-lab/${selectedPatient.patient_id}`} className="btn btn-outline-primary btn-sm">Proceed</Link>
                                </td>
                            </tr>
                            : listData?.map((item, index) => (
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
                                        <Link to={`/lab/view-assigned-patient-full-info/${item.patient_id}`} className="btn btn-outline-primary btn-sm">Full Info</Link>
                                    </td>
                                    <td>
                                        <Link to={`/lab/assigned-patient-entry-lab/${item.patient_id}`} className="btn btn-outline-primary btn-sm">Proceed</Link>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {paginationUI}
        </div>
    );
};
