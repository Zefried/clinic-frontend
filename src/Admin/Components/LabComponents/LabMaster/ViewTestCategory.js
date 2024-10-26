import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { customStateMethods } from '../../../protected/CustomAppState/CustomState';
import labIcon from '../../../../Assets/img/lab/labIcon.jpg';

export const ViewTestCategory = () => {
    const token = customStateMethods.selectStateKey('appState', 'token');
    const [loading, setLoading] = useState(true);
    const [testCategoryData, setTestCategoryData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(customStateMethods.spinnerDiv(true));

            try {
                await axios.get('sanctum/csrf-cookie');
                const res = await axios.get('api/admin/fetch-test-category', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (res.data.status === 200) {
                    setTestCategoryData(res.data.test_category_data);
                    setLoading(false);
                }
            } catch (error) {
                setLoading(false);
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

    return (
        <div className="container mt-5">
          
            <h2 className="text-center mb-4">View Test Categories</h2>
            {loading ? (
                <div>{loading}</div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
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
                            {testCategoryData.map((category, index) => (
                                <tr key={category.id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <img className='labIcon' src={labIcon} alt="Lab Icon" style={{ height: '35px', width: '35px' }} />
                                    </td>
                                    <td>{category.name}</td>
                                    <td>Active</td> {/* Assuming status is always active */}
                                    <td>
                                        <Link className='btn btn-outline-primary btn-sm' to={`/admin/edit-lab-test-category/${category.id}` }>Edit Category</Link>
                                    </td>
                                    <td>
                                        <button className='btn btn-outline-danger btn-sm'>Disable</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
