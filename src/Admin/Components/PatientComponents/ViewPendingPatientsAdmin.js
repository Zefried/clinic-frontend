import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { customStateMethods } from '../../protected/CustomAppState/CustomState';
import userIcon from '../../../Assets/img/registration/userIcon.jpeg';
import { handleSearch, handleSuggestionClick } from '../../protected/SearchModule/AutoCopy';

export const ViewPendingPatientsAdmin = () => {
    const token = customStateMethods.selectStateKey('appState', 'token');

    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState(null);


    const [patientData, setPatientData] = useState([]);

    customStateMethods.useClearAlert(setMessages);

    const handleChangeSearch = (e) => {
        handleSearch(e, setQuery, setSuggestions, setLoading, setMessages);
    };

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                setLoading(true);
                await axios.get('sanctum/csrf-cookie'); // Ensure CSRF token is fetched
                const response = await axios.post(`/api/admin/fetch-all-patient/`, {},{
                    headers: { Authorization: `Bearer ${token}` },
                });
                
                if (response.data.status === 200) {
                    setPatientData(response.data.patient_data);
                    setMessages(customStateMethods.getAlertDiv(response.data.message));
                } else {
                    setMessages(customStateMethods.getAlertDiv(response.data.message));
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPatients();
    }, [token]);

    useEffect(() => {
        if (selected) {
            const fetchSelectedPatient = async () => {
                try {
                    setLoading(true);
                    await axios.get('sanctum/csrf-cookie');
                    const response = await axios.post(`/api/admin/fetch-all-pending-patient/`, { selected }, {
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    if (response.data.status === 200) {
                        setPatientData(response.data.patient_data);
                        setMessages(customStateMethods.getAlertDiv(response.data.message));
                    } else {
                        setMessages(customStateMethods.getAlertDiv(response.data.message));
                    }
                
                    setSelected(false); // Reset selected after fetch
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            };

            fetchSelectedPatient();
        }
    }, [selected, token]);

    const patientTable = patientData.map((items, index) => (
        <tr key={items.id}>
            <td>{index + 1}</td>
            <td>
                <img className='userIcon' src={userIcon} alt="User Icon" />
            </td>
            <td>{items.name}</td>
            <td>{items.age}</td>
            <td>{items.sex}</td>
            <td>{items.phone}</td>
            <td>{items.district}</td>
            <td>{items.state}</td>
            <td>
                <Link to={`/admin/edit-patient/${items.id}`} className='btn btn-outline-success btn-sm'>Edit</Link>
            </td>
            <td>
                <Link to={`/admin/full-information/${items.id}`} className='btn btn-outline-primary btn-sm'>Full Info</Link>
            </td>
            <td>
                <button className='btn btn-outline-danger btn-sm'>Disable</button>
            </td>
        </tr>
    ));

    return (
        <div>
            {/* Search Bar */}
            <h3>Search Associated User First</h3>
            <div className='searchBarDiv d-flex'>
                <input type='text' name='searchBar' placeholder='search lab' onChange={handleChangeSearch} className='form-control col-lg-5'/>
                <i className="bi bi-search mx-2" style={{ fontSize: '24px' }}></i>
            </div>

            <div>
                {loading && <div>Loading...</div>}
                {messages}
            </div>

            <ul>
                {Object.entries(suggestions).map(([email, phone], index) => (
                    <li className="col-md-6 text-dark mt-3" key={index} style={{ cursor: 'pointer' }} onClick={() =>
                        handleSuggestionClick(email, phone, setSelected, setQuery, setSuggestions, () => {})
                    }>
                        {`email: ${email} | Phone: ${phone}`}
                    </li>
                ))}
            </ul>

            {selected && (
                <div>
                    <h4>Selected</h4>
                    <p>Email ID: {selected.email}</p>
                    <p>Phone: {selected.phone}</p>
                </div>
            )}

            <p className="h3 text-center">View All Pending Patients</p>
            <div className="table-responsive table-container">
                <table className="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Profile</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Sex</th>
                            <th>Phone</th>
                            <th>District</th>
                            <th>State</th>
                            <th>Edit</th>
                            <th>Full Info</th>
                            <th>Disable</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patientTable}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
