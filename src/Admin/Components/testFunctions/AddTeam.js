import React, { useState } from 'react'
import axios from 'axios';
import { error } from 'jquery';

export const AddTeam = () => {

    const [team, setTeam] = useState({});
    const [serverResponse, setResponse] = useState({
        validationError:{},
        error:{},
        message:{},
        data:{},
        status:0
    });


    function handleTeamInputs(e){
        const {name, value} = e.target;
        setTeam((prevItem) => {
            return(
                {...prevItem, [name]:value}
            )
        })
     
    }

    function addTeamFunction(e){
        e.preventDefault();
        try{
            axios.get('sanctum/csrf-cookie').then(response => {
               axios.post('api/admin/add-team', team).then((res)=>{
                    if(res.data.status !== 200){
                       setResponse((prev) =>(
                        {...prev, validationError:res.data, error:res.data.error, status:res.data.status}
                       ))
                    } else{
                        setResponse((prev) =>(
                        {...prev, message:res.data.message, status:res.data.status}
                        ))
                    }
               })
            });
        }catch(error){
            console.log(error);
        }

    }

    // custom jsx section 

    const teamAddedAlert = serverResponse.status === 200 ? (
        <div className="alert alert-secondary col-lg-5 text-center" role="alert">
            Team MEMBER Added successfully 🎉!
        </div>
    ) : '';
    
    const emailExistAlert = serverResponse.validationError?.status === 422 ? (
        <div className="alert alert-secondary col-lg-5 text-center" role="alert">
            Email already exists, please enter a new email 📧!
        </div>
    ) : '';


    console.log(serverResponse)

  return (

    <div>
        {teamAddedAlert}
        {emailExistAlert}
        <h3 className='text-primary text-center mb-4'>Add Team</h3>
        <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                    <div className="card shadow-lg p-4">
                    
                        <h3 className="card-title text-center mb-4">ADD NEW TEAM MEMBER</h3>
                        <form>

                       

                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" name='name' className="form-control" onChange={handleTeamInputs} id="name" placeholder="Enter your name" />
                            <span>{serverResponse && serverResponse.validationError ? serverResponse.validationError.name : ''}</span>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" name='email' className="form-control" onChange={handleTeamInputs} id="email" placeholder="Enter your email" />
                            <span>{serverResponse && serverResponse.validationError ? serverResponse.validationError.email : ''}</span>
                           
                        </div>
                        <div className="d-grid">
                            <button type="submit" onClick={addTeamFunction} className="btn btn-outline-primary">Submit</button>
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
    </div>
  )
}
