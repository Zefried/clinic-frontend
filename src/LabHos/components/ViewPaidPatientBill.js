import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { customStateMethods } from '../../Admin/protected/CustomAppState/CustomState';
import './billStyle.css';

export const ViewPaidPatientBill = () => {
    const backendUrl = window.location.hostname.includes('localhost') 
        ? 'http://localhost:8000' 
        : 'https://backend-domain.com'; // Production URL

    let token = customStateMethods.selectStateKey('appState', 'token');
    const { id } = useParams();
    const patientId = id;

    const [loading, setLoading] = useState(true);
    const [patientData, setPatientData] = useState(null);
    const [messages, setMessages] = useState(null);
    const [fileExists, setFileExists] = useState(true); // Track if file exists

    useEffect(() => {
        try {
            setLoading(true);
            setMessages(null);

            axios.get('sanctum/csrf-cookie').then(response => {
                axios.get(`/api/lab/fetch-assigned-patient-by-id/${patientId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then((res) => {
                        if (res.data.status === 200) {
                            setPatientData(res.data);
                            setMessages(customStateMethods.getAlertDiv(res.data.message));
                        } else {
                            setMessages(customStateMethods.getAlertDiv(res.data.message));
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                        setMessages(customStateMethods.getAlertDiv('Failed to fetch data'));
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            });
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    }, [patientId, token]);

    // Check if file exists
  
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

    // Handle file view button click
    const handleFileClick = async (docPath) => {
        console.log(docPath);  // Corrected this to docPath instead of docP
        try {
            const exists = await checkFileExists(docPath);
            if (exists) {
                window.open(`${backendUrl}/storage/${docPath}`, '_blank');
            } else {
                setFileExists(false); // File doesn't exist
            }
        } catch (error) {
            console.error("File request failed:", error);
            setMessages(customStateMethods.getAlertDiv('Network error or failed to fetch file'));
        }
    };

    // If data is loading or there is no patientData
    if (loading || !patientData) {
        return <div>Loading...</div>;
    }

    // Destructure the data to make it more readable
    const { assigned_patient_data, patient_card_data, refName } = patientData;

    const cardUi = (
        <div className="card shadow-lg" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="card-header text-center">
                <h4>Patient Bill</h4>
            </div>
            <div className="card-body">
                <h5 className="card-title">
                    Patient Name: <strong>{assigned_patient_data.patient_name}</strong>
                </h5>
                <p className="card-text">
                    Patient Card ID: <span className="text-muted">{patient_card_data.patient_card_id}</span>
                </p>

                <div className="row mb-3">
                    <div className="col">
                        <p><strong>Lab:</strong> {assigned_patient_data.lab_name}</p>
                    </div>
                    <div className="col">
                        <p><strong>Employee:</strong> {assigned_patient_data.employee_name}</p>
                    </div>
                </div>

                <h6>Assigned Tests:</h6>
                <ul className="list-group mb-3">
                    {JSON.parse(assigned_patient_data.test_ids).map(test => (
                        <li key={test.id} className="list-group-item">{test.name}</li>
                    ))}
                </ul>

                <div className="mt-4">
                    <p><strong>Discount:</strong> {assigned_patient_data.discount}%</p>
                    <p><strong>Final Amount:</strong> {assigned_patient_data.final_amount}</p>
                </div>

                <p className='mt-3'><strong>Referred By:</strong> {refName && refName[0]}</p>

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
                        <strong>Message</strong> The requested file does not exist! Please Upload First.
                    </div>
                )}

                <div className="card-footer text-center">
                    <button className="btn btn-danger btn-lg mt-4" onClick={() => window.print()}>
                        Print
                    </button>
                </div>
            </div>
            <div className="card-footer text-muted text-center">
                <small>Generated on: {new Date().toLocaleString()}</small>
            </div>
        </div>
    );

    return (
        <div>{cardUi}</div>
    );
};
