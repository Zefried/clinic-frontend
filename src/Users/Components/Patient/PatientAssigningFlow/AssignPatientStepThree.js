import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import labIcon from '../../../../Assets/img/lab/labIcon.jpg';
import { customStateMethods } from '../../../../Admin/protected/CustomAppState/CustomState';

export const AssignPatientStepThree = () => {

    // Additional State starts from here
    const token = customStateMethods.selectStateKey('appState', 'token');
    const [loading, setLoading] = useState(null);
    const [messages, setMessages] = useState(null);
    // ends here


    // importing the data passed from the previous component 
    const location = useLocation();
    const { patientId, labId, selectedEmployeeId, selectedEmployeeData, patientData } = location.state || {};
    //ends here

    // all test data state
    const [testData, setTestData] = useState(null);
    const [selectedTests, setSelectedTests] = useState([]);
    // ends here


    // useEffects starts here
      
        useEffect(() => {
            
            ////// fetching all test data against the lab not category specific 

            try {
                setLoading(customStateMethods.spinnerDiv(true));

                axios.get('sanctum/csrf-cookie').then(response => {
                    axios.get(`/api/user/fetch-lab-test-allData/${labId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    })
                        .then((res) => {

                            if (res.data.status === 200) {
                                setTestData(res.data.allTestData);
                                setMessages(customStateMethods.getAlertDiv(res.data.message));
                            } else if(res.data.status === 204) {
                                
                            } else{
                                setMessages(customStateMethods.getAlertDiv(res.data.message));
                            }
                            setLoading(false);
                        })
                        .catch(error => {
                        setLoading(false);
                        console.log(error);
                        });;
                });
            } catch (error) {
                setLoading(false);
                console.log(error);
            }

        }, []);
     
    // ends here



    // Handler function to add/remove tests from selectedTests
        const handleSelectTest = (testId, testName) => {
            setSelectedTests(prevTests => {
                const isSelected = prevTests.some(test => test.id === testId);
                if (isSelected) {
                    return prevTests.filter(test => test.id !== testId);
                } else {
                    return [...prevTests, { id: testId, name: testName }];
                }
            });
        };


        const handleRemoveTest = (testId) => {
            // Remove the test from the selected tests array
            setSelectedTests(prevState => prevState.filter(test => test.id !== testId));
          };


    // Defining the JSX to keep the return clean
    const dataName = (
        <div className="card shadow-lg border-0">
            <div className="card-header bg-primary text-white text-center">
                <h3>Please Select Test Against The Patient</h3>
            </div>

            <div className="card-body">
                <div className="row">
                    <div className="col-md-6">
                        <h5 className="text-secondary">Patient Name</h5>
                        <p className="fs-5 text-dark fw-semibold">
                            {patientData?.patient_name || "Patient Name Not Available"}
                        </p>
                    </div>
                    <div className="col-md-6">
                        <h5 className="text-secondary">Lab Name</h5>
                        <p className="fs-5 text-dark fw-semibold">
                            {patientData?.labName || "Lab Name Not Available"}
                        </p>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-md-6">
                        <h5 className="text-secondary">Employee Name</h5>
                        <p className="fs-5 text-dark fw-semibold">
                            {selectedEmployeeData?.name || "Employee Name Not Available"}
                        </p>
                    </div>
                    <div className="col-md-6">
                        <h5 className="text-secondary">Employee Phone</h5>
                        <p className="fs-5 text-dark fw-semibold">
                            {selectedEmployeeData?.phone || "Employee Phone Not Available"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

    
    console.log(selectedTests);

  return (
    <div>
        {loading}
        {messages}
        
     

        {/* Patient name and lab name from the previous selection in the patient assignment process, rendering JSX */}
        <div className="container my-5">
            {dataName}

            <div className="card-footer text-center bg-light">
                <button 
                        className="btn btn-primary px-4" 
                        // onClick={handleProceed} 
                > Proceed </button>
            </div>

        </div>
        {/* ends here */}




        <div className="col-lg-6">
    {/* List of Tests with Checkboxes */}
    <div className="mt-4">
        <h4>Select Tests</h4>
        {testData?.map(testItem => (
            <div key={testItem.lab_test_id} className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id={`test-${testItem.lab_test_id}`}
                    checked={selectedTests.some(test => test.id === testItem.lab_test_id)}
                    onChange={() => handleSelectTest(testItem.lab_test_id, testItem.lab_test_name)}
                />
                <label className="form-check-label" htmlFor={`test-${testItem.lab_test_id}`}>
                    <img 
                        className='labIcon' 
                        src={labIcon} 
                        alt="Lab Icon" 
                        style={{ height: '35px', width: '35px', marginRight: '10px' }} 
                    />
                    {testItem.lab_test_name} (Active)
                </label>
            </div>
        ))}
    </div>
        </div>


        <div className='col-lg-6'>
    {/* Display Selected Test Details */}
    <div className="mt-4">
        <h4 className="mb-3">Selected Tests</h4>
        {selectedTests.length > 0 ? (
            <ul className="list-unstyled">
                {selectedTests.map(test => (
                    <li key={test.id} className="d-flex align-items-center mb-2">
                        <img 
                            src={labIcon} 
                            alt="Lab Icon" 
                            style={{ height: '20px', width: '20px', marginRight: '8px', borderRadius: '50%' }} 
                        />
                        <span style={{ fontWeight: 'bold', fontSize: '1.1em', marginRight: '8px' }}>
                            {test.name}
                        </span>
                        <button 
                            className="btn btn-danger btn-sm" 
                            onClick={() => handleRemoveTest(test.id)}
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        ) : (
            <p>No tests selected yet.</p>
        )}
    </div>
</div>



    </div>
  )
}
