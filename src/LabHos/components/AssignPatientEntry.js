import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { customStateMethods } from '../../Admin/protected/CustomAppState/CustomState';

export const AssignPatientEntry = () => {
    let token = customStateMethods.selectStateKey('appState', 'token');
    const { id } = useParams();
    let patientId = id;

    const [loading, setLoading] = useState(true);
    const [patientData, setPatientData] = useState(null);
    const [messages, setMessages] = useState(null);
    const [amount, setAmount] = useState('');
    const [discount, setDiscount] = useState('');
    const [finalAmount, setFinalAmount] = useState('');
    const [file, setFile] = useState(null); // State for file

    useEffect(() => {
        try {
            setLoading(customStateMethods.spinnerDiv(true));

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
                            setDiscount(res.data.assigned_patient_data.discount);
                        } else {
                            setMessages(customStateMethods.getAlertDiv(res.data.message));
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        setMessages(customStateMethods.getAlertDiv('Failed to fetch data'));
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            });
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }, [patientId, token]);

    const handleAmountChange = (e) => {
        const inputAmount = e.target.value;
        setAmount(inputAmount);
        recalculateFinalAmount(inputAmount, discount);
    };

    const handleDiscountChange = (e) => {
        const inputDiscount = e.target.value;
        setDiscount(inputDiscount);
        recalculateFinalAmount(amount, inputDiscount);
    };

    const recalculateFinalAmount = (inputAmount, inputDiscount) => {
        if (inputAmount && inputDiscount) {
            const discountedAmount = inputAmount - (inputAmount * (inputDiscount / 100));
            setFinalAmount(discountedAmount.toFixed(2));
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {

        e.preventDefault();
        let formData = new FormData();
        formData.append('amount', amount);
        formData.append('discount', discount);
        formData.append('final_amount', finalAmount);
        if (file) formData.append('file', file);

        // axios.post('/api/testApi', formData, {
        //     headers: {
        //         Authorization: `Bearer ${token}`,
        //         'Content-Type': 'multipart/form-data',
        //     },
        // })
        //     .then((res) => {
        //         if (res.data.status === 200) {
        //             setMessages(customStateMethods.getAlertDiv(res.data.message));
        //         } else {
        //             setMessages(customStateMethods.getAlertDiv(res.data.message));
        //         }
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //         setMessages(customStateMethods.getAlertDiv('File upload failed'));
        //     });

     // Log the FormData contents
        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
               // Log details about the file
        console.log('File name:', file.name);
        console.log('File size:', file.size);
        console.log('File type:', file.type);
        }


    };

    if (messages) {
        setTimeout(() => {
            setMessages('');
        }, 1500);
    }

    const cardUi = (
        <div className="card shadow-lg" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="card-header text-center">
                <h4>Patient Details</h4>
            </div>
            <div className="card-body">
                {patientData && patientData.assigned_patient_data && patientData.patient_card_data ? (
                    <>
                        <h5 className="card-title">
                            Patient Name: <strong>{patientData.assigned_patient_data.patient_name}</strong>
                        </h5>
                        <p className="card-text">
                            Patient Card ID: <span className="text-muted">{patientData.patient_card_data.patient_card_id}</span>
                        </p>

                        <div className="row mb-3">
                            <div className="col">
                                <p><strong>Lab Referred To:</strong> {patientData.assigned_patient_data.lab_name}</p>
                            </div>
                            <div className="col">
                                <p><strong>Employee Assigned:</strong> {patientData.assigned_patient_data.employee_name}</p>
                            </div>
                        </div>

                        <h6>Tests:</h6>
                        <ul className="list-group mb-3">
                            {patientData.assigned_patient_data.test_ids &&
                                JSON.parse(patientData.assigned_patient_data.test_ids).map(test => (
                                    <li key={test.id} className="list-group-item">{test.name}</li>
                                ))}
                        </ul>

                        <div>
                            <label htmlFor="amountInput">Enter Amount:</label>
                            <input
                                id="amountInput"
                                type="number"
                                value={amount}
                                onChange={handleAmountChange}
                                placeholder="Enter the amount"
                                className="form-control"
                            />
                        </div>

                        <div>
                            <label htmlFor="discountInput">Enter Discount (%):</label>
                            <input
                                id="discountInput"
                                type="number"
                                value={discount}
                                onChange={handleDiscountChange}
                                placeholder="Enter the discount percentage"
                                className="form-control"
                            />
                        </div>

                        {amount && finalAmount && (
                            <div className='mt-4'>
                                <p><strong>Discount: </strong>{discount}%</p>
                                <p><strong>Final Amount: </strong>{finalAmount}</p>
                            </div>
                        )}

                        <div>
                            <label htmlFor="fileInput">Upload File:</label>
                            <input
                                id="fileInput"
                                type="file"
                                onChange={handleFileChange}
                                className="form-control"
                            />
                        </div>

                        <p className='mt-3'><strong>Referred By Doctor:</strong> {patientData.refName && patientData.refName[0]}</p>
                    
                        
                            <div className='card col-lg-6'>
                                <button onClick={handleSubmit} className="btn btn-primary mt-4">
                                    Submit
                                </button>
                            </div>     
                    
                    </>
                ) : (
                    <div>No patient data available.</div>
                )}
            </div>
            <div className="card-footer text-muted text-center">
                {patientData && patientData.patient_card_data ? (
                    <small>Created on: {new Date(patientData.patient_card_data.created_at).toLocaleString()}</small>
                ) : null}
            </div>
        </div>
    );

    return (
        <div className="container mt-5">
            {loading && <div>Loading...</div>}
            {messages && <div className="alert mt-3">{messages}</div>}
            {cardUi}
        </div>
    );
};
