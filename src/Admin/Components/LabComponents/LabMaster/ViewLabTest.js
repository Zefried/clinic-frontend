import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { customStateMethods } from '../../../protected/CustomAppState/CustomState';
import labIcon from '../../../../Assets/img/lab/labIcon.jpg';

export const ViewLabTest = () => {
    let token = customStateMethods.selectStateKey('appState', 'token');

    const [loading, setLoading] = useState(null);
    const [messages, setMessages] = useState(null);
    const [testCategoryData, setTestCategoryData] = useState([]);
    const [testData, setTestData] = useState([]);
    const [selectedTestCategoryId, setSelectedTestCategoryId] = useState('');

    useEffect(() => {
        setLoading(customStateMethods.spinnerDiv(true));

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
            });
        });
    }, []);

    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        setSelectedTestCategoryId(categoryId);

        if (categoryId) {
            setLoading(customStateMethods.spinnerDiv(true));
            axios.get(`api/admin/fetch-test/${categoryId}`, {
                headers: { Authorization: `Bearer ${token}` }
            }).then((res) => {
                setTestData(res.data.test_data[0]); 
                setLoading(false);
            }).catch((error) => {
                setLoading(false);
                console.log(error);
            });
        }
    };

    let testJsx = '';
    if(testData.tests){
        let testVar = testData.tests;
      testJsx =  testVar.map((testItems, index)=>(
            <tr key={testItems.id}>
                <td>{index +1}</td>
                <td>
                    <img className='labIcon' src={labIcon} alt="Lab Icon" style={{ height: '35px', width: '35px' }} />
                </td>
                <td>{testItems.name}</td>
                <td>{testItems.status === 'on' ? 'Active' : 'Inactive'}</td>
                <td>
                    <Link className='btn btn-outline-primary btn-sm' to={`/admin/edit-lab-test/${testItems.id}`}>Edit</Link>
                </td>
                <td>
                    <Link className='btn btn-outline-danger btn-sm' to={`/admin/edit-lab-test/${testItems.id}`}>Disable</Link>
                </td>
            </tr>
        
        ));
    }

    return (
        <div>
            {loading}
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

                <div className="table-responsive mt-4">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Lab</th>
                                        <th>Test Name</th>
                                        <th>Status</th>
                                        <th>Edit</th>
                                        <th>Disable</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {testJsx}
                                </tbody>
                            </table>
                </div>
            </div>
        </div>
    );
};
