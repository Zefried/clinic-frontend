import React, { useEffect, useState } from 'react';
import './EmailVerification.css';
import axios from 'axios';


export const VerifyEmail = () => {
  
    const [email, setEmail] = useState({});
    const [serverResponse, setResponse] = useState({});

    function handleChange(e) {
        const { name, value } = e.target;
        setEmail({ ...email, [name]: value });
    }

    

    function handleStateAndRedirect(res){
        console.log(res);
        if(serverResponse.status === 404){

           window.location.reload();
        } else{
            alert('email does not exist');
        }
    }

    const handleVerify = async (e) => {
        e.preventDefault();
        try {
            await axios.get('sanctum/csrf-cookie');
            const res = await axios.post('api/admin/verify-team', email);
            if(res){
                setResponse(res.data.data);
            }
            if(serverResponse){
                handleStateAndRedirect(res);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const test = serverResponse.status === 404 ? (
        <div className="alert alert-secondary col-lg-5 text-center" role="alert">
           Test successfully 🎉!
        </div>
    ) : '';

    return (
        <div className="verify-email">
            {test}
            <h1 className="text-center text-light mb-4">Verify Your Email</h1>
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className="card p-4 shadow-lg rounded">
                    <h2 className="text-center mb-3 text-danger">Email Verification Required</h2>
                    <p className="text-center mb-4 text-secondary">
                        To access our Lead CRM, please enter your email address for verification. <br />
                        This ensures your team membership and grants you access to all features.
                    </p>

                    <input type="email" name="email" className="form-control mb-3" placeholder="Enter your email" onChange={handleChange} />
                    <span className='text-danger'>{serverResponse && serverResponse.message ? serverResponse.message.email : ''}</span> 
                    <button className="btn btn-danger w-100" onClick={handleVerify}>
                        Verify
                    </button>
                </div>
            </div>
        </div>
    );
};
