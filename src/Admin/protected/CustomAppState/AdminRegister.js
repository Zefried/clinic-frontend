import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { customStateMethods } from './CustomState';

export const AdminRegister = () => {

    const [loading, setLoading] = useState(null);
    const [messages, setMessages] = useState(null);

    const [serverResponse, setServerResponse] = useState({
        validation_error:{},
        message:{},
        error:{},
    });
  
    // clearing all alert messages with custom hook
    customStateMethods.useClearAlert(setMessages);

    const [inputData, setData] = useState({
        name:'',
        email:'',
        password:'',
        role:'admin',
    });

    const handleChange = (e) =>{
        setData({...inputData, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(customStateMethods.spinnerDiv(true));
        
        axios.get('sanctum/csrf-cookie').then(response => {
            axios.post('api/admin/register-admin', inputData)
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
                  }
    
                  if(res.data){
                    setLoading(false);
                  }
                 
              })
              .catch(error => {
                console.log(error);  // Handle API error
              });
          });
    };

    console.log(inputData);

  return (
    <div>
        {loading}
        {messages}

        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8 col-sm-10">
                    <div className="card">
                        <div className="card-body p-4">
                            <h2 className="text-center mb-4">Admin Register</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-floating mb-3">
                                    <input 
                                        type="name" 
                                        className="form-control" 
                                        id="name" 
                                        placeholder="john" 
                                        value={inputData.name} 
                                        name='name'
                                        onChange={handleChange} 
                                    />
                                    <label htmlFor="email">Name</label>
                                    {serverResponse && serverResponse.validation_error ? serverResponse.validation_error.name : ''}
                                </div>
                                <div className="form-floating mb-3">
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        id="email" 
                                        placeholder="name@example.com" 
                                        value={inputData.email} 
                                        name='email'
                                        onChange={handleChange} 
                                    />
                                    <label htmlFor="email">Email address</label>
                                    {serverResponse && serverResponse.validation_error ? serverResponse.validation_error.email : ''}
                                </div>
                                <div className="form-floating mb-3">
                                    <input 
                                        type="text" 
                                        name='password'
                                        className="form-control" 
                                        id="password" 
                                        placeholder="Password" 
                                        value={inputData.password} 
                                        onChange={handleChange} 
                                    />
                                    <label htmlFor="password">Password</label>
                                    {serverResponse && serverResponse.validation_error ? serverResponse.validation_error.password : ''}
                                </div>
                             
                                <button type="submit" className="btn btn-primary w-100">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
