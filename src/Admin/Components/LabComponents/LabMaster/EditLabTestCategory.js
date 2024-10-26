import React, { useEffect } from 'react'
import { useState } from 'react';
import { customStateMethods } from '../../../protected/CustomAppState/CustomState';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export const EditLabTestCategory = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    let token = customStateMethods.selectStateKey('appState', 'token');

    const [loading, setLoading] = useState(null);
    const [messages, setMessages] = useState(null);


    // This useEffect is used to fetch testCategory data for editing purposes.
    useEffect(()=>{

        try {
            axios.get('sanctum/csrf-cookie').then(response => {
                axios.get(`api/admin/edit-test-category/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                }
                })
                .then((res) => {
    
                    setServerResponse((prevData)=>(
                        {...prevData, 
                        validation_error:res.data.validation_error, 
                        message:res.data.message, 
                        error:res.data.error}
                    ))
        
                    if(res.data.status !== 200){ 
                        setMessages(customStateMethods.getAlertDiv(res.data.message));  
                    } else{
                        setTestCategory(res.data.test_category_data);
                        setMessages(customStateMethods.getAlertDiv(res.data.message));
                    }
    
                    setLoading(false);
                    resetMessages();
                })
                .catch(error => {
                    setLoading(false);
                    console.log(error);  // Handle API error
                });
            });
    
        } catch (error) {
        console.log(error);  // Handle any unexpected errors
        }

    },[])

    const [serverResponse, setServerResponse] = useState({
      validation_error:{},
      message:{},
      error:{},
    }); 

    function resetMessages() {
        setTimeout(()=>{
            setMessages(false)
        },3000)
    }
  
    const [testCategory, setTestCategory] = useState({
        name:'',
        description:'',
        status:'',
    });

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setTestCategory({
            ...testCategory,
            [name]: type === 'checkbox' ? checked : value,
        });
    };
    

    function handleSubmit(e){
        e.preventDefault();
        setLoading(customStateMethods.spinnerDiv(true));

        try {
        
        axios.get('sanctum/csrf-cookie').then(response => {
            axios.post(`api/admin/update-test-category/${id}`, testCategory, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
            })
            .then((res) => {

                setServerResponse((prevData)=>(
                    {...prevData, 
                    validation_error:res.data.validation_error, 
                    message:res.data.message, 
                    error:res.data.error}
                ))
    
                if(res.data.status !== 200){ 
                    setMessages(customStateMethods.getAlertDiv(res.data.message));  
                } else{
                    setMessages(customStateMethods.getAlertDiv(res.data.message));
                    navigate('/admin/view-test-category');
                }

                setLoading(false);
                resetMessages();
            })
            .catch(error => {
                setLoading(false);
                console.log(error);  // Handle API error
            });
        });

        } catch (error) {
        console.log(error);  // Handle any unexpected errors
        }
    }


  return (
    <div>
        {loading}
        {messages}
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-8 col-md-10">
                <div className="card shadow-lg p-4">
                    <h2 className="card-title text-center mb-4">Edit Test Category</h2>
                    
                    <form>
                    <div className="form-group mb-3">
                        <label htmlFor="name" className="form-label">Category Name</label>
                        <input
                        type="text"
                        name='name'
                        className="form-control"
                        id="name"
                        value={testCategory.name}
                        placeholder="Enter test category name"
                        onChange={handleChange}
                        />
                        <span style={{ color: 'orange' }}>
                            {serverResponse && serverResponse.validation_error ? serverResponse.validation_error.test_category_name : ''}
                        </span>
                       
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea
                        className="form-control"
                        id="description"
                        rows="3"
                        name='description'
                        value={testCategory.description}
                        placeholder="Enter category description"
                        onChange={handleChange}
                        ></textarea>

                        <span style={{ color: 'orange' }}>
                            {serverResponse && serverResponse.validation_error ? serverResponse.description : ''}
                        </span>
                    </div>

                    <div className="form-group mb-3">
                        <label className="form-label">Status</label>
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="status"
                                id="status"
                                checked={testCategory.status} // Use `checked` to control the state of the checkbox
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="status">
                                Active
                            </label>

                            <span style={{ color: 'orange' }}>
                                {serverResponse && serverResponse.validation_error ? serverResponse.status : ''}
                            </span>
                        </div>
                    </div>

                    <div className="d-grid gap-2">
                        <button type="submit" onClick={handleSubmit} className="btn btn-primary btn-lg">
                            Save Category
                        </button>
                    </div>
                    </form>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}
