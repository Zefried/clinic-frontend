import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { customStateMethods } from '../../Admin/protected/CustomAppState/CustomState';
import { useParams } from 'react-router-dom';

export const AssignedPatientFullInfo = () => {

    const {id} = useParams();
    let patientId = id;

    const token = customStateMethods.selectStateKey('appState', 'token');
    const [patientData, setPatientData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


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
