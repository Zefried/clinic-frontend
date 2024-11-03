import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import labIcon from '../../../../Assets/img/lab/labIcon.jpg';
import { customStateMethods } from '../../../protected/CustomAppState/CustomState';

export const AssignTestToLab = () => {

    const { id } = useParams(); // Use useParams to get lab_id
    let lab_id = id;
    let token = customStateMethods.selectStateKey('appState', 'token');

    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState(null);

    const [testCategoryData, setTestCategoryData] = useState([]);
    const [testData, setTestData] = useState([]);
    const [selectedTestCategoryId, setSelectedTestCategoryId] = useState('');

    const [selectedTests, setSelectedTests] = useState([]); // Array to hold selected tests
    const [selectedCategory, setSelectedCategory] = useState({});

    useEffect(() => {
        setLoading(true);

        axios.get('sanctum/csrf-cookie').then(() => {
            axios.get('api/admin/fetch-test-category', {
                headers: { Authorization: `Bearer ${token}` }
            }).then((res) => {
                if (res.data.status === 200) {
                    setTestCategoryData(res.data.test_category_data);
                }
                setLoading(false);
            }).catch((error) => {
                setLoading(false);
                console.error("Error fetching test categories:", error);
            });
        });
    }, [token]);

    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        setSelectedTestCategoryId(categoryId);

        const selectedCategory = testCategoryData.find(cat => cat.id === Number(categoryId));

        if (categoryId && selectedCategory) {
            setLoading(true);
            setSelectedTests([]); // Clear selected tests when changing category
            
            axios.get(`api/admin/fetch-test/${categoryId}`, {
                headers: { Authorization: `Bearer ${token}` }
            }).then((res) => {
                if (res.data.status === 200) {
                    const testDataArray = res.data.test_data[0]; // Access the first item in test_data array
                    setTestData(testDataArray.tests); // Set the tests directly
                    setSelectedCategory({
                        id: selectedCategory.id,
                        name: selectedCategory.name,
                    });
                }
                setLoading(false);
            }).catch((error) => {
                setLoading(false);
                console.error("Error fetching tests:", error);
            });
        } else {
            // Reset selected tests if no category is selected
            setSelectedTests([]);
            setSelectedCategory({});
        }
    };

    const handleSelectTest = (testId, testName) => {
        setSelectedTests((prevSelected) => {
            if (prevSelected.some(test => test.id === testId)) {
                // Test already selected, remove it
                return prevSelected.filter(test => test.id !== testId);
            } else {
                // Add new test
                return [...prevSelected, { id: testId, name: testName }];
            }
        });
    };

    const handleRemoveTest = (testId) => {
        setSelectedTests((prevTests) => prevTests.filter(test => test.id !== testId));
    };

    function handleSubmit(e){
        
        setLoading(customStateMethods.spinnerDiv(true));
        e.preventDefault();
        
        let payLoad = {
            lab_id:lab_id,
            categoryData:selectedCategory,
            test:selectedTests,
        }

        axios.get('sanctum/csrf-cookie').then(() => {
            axios.post('api/admin/insert-test-in-lab', payLoad, {
                headers: { Authorization: `Bearer ${token}` }
            }).then((res) => {
                if (res.data.status === 200) {
                    setMessages(customStateMethods.getAlertDiv(res.data.message));  
                    clearMessages();
                }
                setLoading(false);
            }).catch((error) => {
                setLoading(false);
                console.error("Error fetching test categories:", error);
            });
        });

        console.log(payLoad);
    }

    function clearMessages(){
        setTimeout(()=>{
            setMessages('');
        },4000)
    }




    return (
        <div>
            {loading && <div>Loading...</div>} {/* Show loading indicator */}
            {messages}
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-md-10">
                        <div className="card shadow-lg p-4">
                            <h2 className="card-title text-center mb-4">View Lab Tests</h2>

                            {/* Select Test Category */}
                            <div className="form-group mb-3">
                                <label htmlFor="category" className="form-label">Select Test Category</label>
                                <select
                                    name="test_category_id"
                                    className="form-select col-lg-5"
                                    id="category"
                                    value={selectedTestCategoryId}
                                    onChange={handleCategoryChange}
                                >
                                    <option value="">Select Category</option>
                                    {testCategoryData && testCategoryData.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>


                <div className='row'>

                    <div className='col-lg-6'>

                        {/* List of Tests with Checkboxes */}
                        <div className="mt-4">
                            <h4>Select Tests</h4>
                            {testData.map((testItems) => (
                                <div key={testItems.id} className="form-check">
                                    <input 
                                        className="form-check-input" 
                                        type="checkbox" // Use checkbox for multiple selection
                                        id={`test-${testItems.id}`} 
                                        checked={selectedTests.some(test => test.id === testItems.id)}
                                        onChange={() => handleSelectTest(testItems.id, testItems.name)} 
                                    />
                                    <label className="form-check-label" htmlFor={`test-${testItems.id}`}>
                                        <img className='labIcon' src={labIcon} alt="Lab Icon" style={{ height: '35px', width: '35px', marginRight: '10px' }} />
                                        {testItems.name} ({testItems.status === 'on' ? 'Active' : 'Inactive'})
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
                                            <img src={labIcon} alt="Lab Icon" style={{ height: '20px', width: '20px', marginRight: '8px', borderRadius: '50%' }} />
                                            <span style={{ fontWeight: 'bold', fontSize: '1.1em', marginRight: '8px' }}>{test.name}</span>
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

                    <div className='text-center mt-3'>
                        <button className='btn btn-outline-danger btn-md' onClick={handleSubmit}>Submit Selected Test</button>
                        <p className='mt-2'>Note: Submit data for one category at a time.</p>
                    </div>

                </div>

             
            </div>
        </div>
    );
};
