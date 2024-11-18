import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { customStateMethods } from '../../Admin/protected/CustomAppState/CustomState';

export const ViewLabHosDashboard = () => {
    const token = customStateMethods.selectStateKey('appState', 'token');
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        axios
            .get(`api/lab/fetch-lab-report/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                if (res.data.status === '200') {
                    setDashboardData(res.data.data);
                } else {
                    setError('Failed to fetch dashboard data');
                }
            })
            .catch(() => {
                setError('An error occurred while fetching data');
            })
            .finally(() => {
                setLoading(false);
            });
    }, [token]);

    if (loading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    if (error) {
        return <div className="alert alert-danger mt-5">{error}</div>;
    }

    return (
        <div className="container mt-5">
            <h1 className="mb-4 text-center">Lab Dashboard</h1>
            <div className="row text-center">
                {/* Metrics Cards */}
                <div className="col-md-3 mb-3">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Total Employees</h5>
                            <h2>{dashboardData.totalEmployee}</h2>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Assigned Patients</h5>
                            <h2>{dashboardData.totalAssignedPatient}</h2>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Pending Patients</h5>
                            <h2>{dashboardData.totalPendingPatient}</h2>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Paid Patients</h5>
                            <h2>{dashboardData.totalPaidPatient}</h2>
                        </div>
                    </div>
                </div>
            </div>

            {/* Latest Five Patients */}
            <h2 className="mt-5 mb-3">Latest Pending Patients</h2>
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Lab</th>
                            <th>Employee</th>
                            <th>Amount</th>
                            <th>Visit</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dashboardData.latestFivePatients.map((patient, index) => (
                            <tr key={patient.id}>
                                <td>{index + 1}</td>
                                <td>{patient.patient_name}</td>
                                <td>{patient.lab_name}</td>
                                <td>{patient.employee_name}</td>
                                <td>₹{patient.final_amount}</td>
                                <td>{patient.visit}</td>
                                <td>
                                    <span className="badge bg-warning text-dark">
                                        {patient.patient_status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
