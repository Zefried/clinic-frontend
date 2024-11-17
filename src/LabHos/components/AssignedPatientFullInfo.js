import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { customStateMethods } from '../../Admin/protected/CustomAppState/CustomState';
import { useParams } from 'react-router-dom';

export const AssignedPatientFullInfo = () => {
    const { id } = useParams();
    let patientId = id;

    const token = customStateMethods.selectStateKey('appState', 'token');
    const [patientData, setPatientData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fileExists, setFileExists] = useState(true); // Track if file exists

    const backendUrl = window.location.hostname.includes('localhost') 
        ? 'http://localhost:8000'  // Development URL
        : 'https://your-backend-domain.com'; // Production URL

        console.log(backendUrl);
    useEffect(() => {
        setLoading(true);
        axios
            .get(`api/lab/fetch-assigned-patient-by-id/${patientId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                if (response.data.status === 200) {
                    setPatientData(response.data);
                } else {
                    setError('Failed to fetch patient data.');
                }
            })
            .catch(() => {
                setError('Error while fetching data.');
            })
            .finally(() => {
                setLoading(false);
            });
    }, [patientId, token]);



    const checkFileExists = async (docPath) => {
      try {
          const res = await axios.head(`${backendUrl}/storage/${docPath}`);
          if (res.status === 200) {
              return "File exists";  // Return string if the file exists
          } else {
              return "File does not exist";  // Return string if the file doesn't exist (non-200 status)
          }
      } catch (err) {
          return "File does not exist";  // Catch error if the file doesn't exist
      }
    };
  
    

    const handleFileClick = async (docPath) => {
        const exists = await checkFileExists(docPath);
        if (exists) {
            window.open(`${backendUrl}/storage/${docPath}`, '_blank');
        } else {
            setFileExists(false); // File doesn't exist
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const { patient_card_data, assigned_patient_data, refName } = patientData;

    const fullInfoUi = (
        <div className="container mt-4">
            <h4 className="text-center mb-4"> Patient Full Information</h4>
            {patientData && (
                <div className="card shadow-lg">
                    <div className="card-body">
                        {/* Patient Card Data */}
                        <h5 className="card-title text-primary">Patient Card Data</h5>
                        <div className="mb-3">
                            <p className="mb-1"><strong>Card ID:</strong> {patient_card_data.patient_card_id}</p>
                        </div>
                        
                        {/* Assigned Patient Data */}
                        <h5 className="card-title text-primary">Assigned Patient Data</h5>
                        <div className="row">
                            <div className="col-md-6">
                                <p className="mb-1"><strong>Patient Name:</strong> {assigned_patient_data.patient_name}</p>
                                <p className="mb-1"><strong>Lab Name:</strong> {assigned_patient_data.lab_name}</p>
                                <p className="mb-1"><strong>Employee Name:</strong> {assigned_patient_data.employee_name}</p>
                            </div>
                            <div className="col-md-6">
                                <p className="mb-1"><strong>Final Amount:</strong> ₹{assigned_patient_data.final_amount}</p>
                                <p className="mb-1"><strong>Discount:</strong> {assigned_patient_data.discount}%</p>
                                <p className="mb-1"><strong>Visit:</strong> {assigned_patient_data.visit}</p>
                                <p className="mb-1"><strong>Status:</strong> {assigned_patient_data.patient_status}</p>
                            </div>
                        </div>

                        {/* Referral Information */}
                        <h5 className="card-title text-primary mt-4">Referred By</h5>
                        <div className="mb-3">
                            <p>{refName && refName[0]}</p>
                        </div>

                        {/* Test Information */}
                        <h5 className="card-title text-primary">Assigned Tests</h5>
                        <ul className="list-group">
                            {JSON.parse(assigned_patient_data.test_ids).map((test) => (
                                <li key={test.id} className="list-group-item">{test.name}</li>
                            ))}
                        </ul>

                        {/* View File Button */}
                        {assigned_patient_data.doc_path && (
                            <div className="mt-4">
                                <button 
                                    className="btn btn-outline-success btn-md mt-2"
                                    onClick={() => handleFileClick(assigned_patient_data.doc_path)}
                                >
                                    View File
                                </button>
                            </div>
                        )}

                        {/* Error Message for Missing File */}
                        {!fileExists && (
                            <div className="alert alert-danger mt-4">
                                <strong>Message</strong> The requested file does not exist | Please upload first.
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <div>
            {fullInfoUi}
        </div>
    );
};
