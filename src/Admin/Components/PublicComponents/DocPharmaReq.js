import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { customStateMethods } from '../../protected/CustomAppState/CustomState';


export const DocPharmaReq = () => {

  let token = customStateMethods.selectStateKey('appState', 'token');

  const [loading, setLoading] = useState(null);
  const [messages, setMessages] = useState(null);
  const [serverResponse, setServerResponse] = useState({
    validation_error:{},
    message:{},
    error:{},
  });

  // clearing all alert messages with custom hook
  customStateMethods.useClearAlert(setMessages);

  // Step management
  const [step, setStep] = useState(1);

  // Form state to hold all input data
  const [doctorData, setDoctorData] = useState({
    name: '',
    account_request: 'pending',
    age: '',
    sex: '',
    relativeName: '',  // Father, Mother, or Spouse
    phone: '',
    email: '',
    registrationNo: '',
    profession:'',
    village: '',
    po: '',
    ps: '',
    pin: '',
    district: '',
    buildingNo: '',
    landmark: '',
    workDistrict: '',
    state: '',
    designation: '',
    password:'',
    pswCred:'',
    unique_user_id:'',
  });

 

  // Proceed to next step
  const nextStep = () => setStep(step + 1);
 
  // Go back to previous step
  const prevStep = () => setStep(step - 1);

   // Function to handle input changes
  const handleChange = (e) => {
    setDoctorData({
      ...doctorData,
      [e.target.name]: e.target.value
    });
  };


  function adminDoctorRegistration(e) {
    e.preventDefault();

    setLoading(customStateMethods.spinnerDiv(true));

    try {
  
      axios.get('sanctum/csrf-cookie').then(response => {
        axios.post('api/account-request-submission', doctorData )
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
      
    } catch (error) {
      console.log(error);  // Handle any unexpected errors
    }
  }


  return (
    <div >
        <div className="container mt-5">
            <div className="card shadow-lg border-0 rounded-4" id='doc-bg'>
                <div className="card-body p-4">
                <h3 className="text-center mb-4"> Public Request Doctor | Pharmacist Registration - Step {step}</h3>
                {messages}
                {loading}
              
                    <form > 
                      <div className="row">
                        
                        {/* Step 1: Personal Information */}
                        {step === 1 && (
                                            <>
                                            <h5 className="text-center mb-4">Personal Information</h5>

                                            <div className="form-floating mb-3 col-lg-6">
                                                <select className="form-control" id="profession" name="profession" value={doctorData.profession} onChange={handleChange} >
                                                    <option value="">Select Profession ? </option>
                                                    <option value="doctor">Doctor</option>
                                                    <option value="pharmacist">Pharmacist</option>
                                                </select>
                                                <label htmlFor="profession" className="mx-1">Profession</label>
                                                <span style={{ color: 'orange' }}>
                                                    {serverResponse && serverResponse.validation_error ? serverResponse.validation_error.profession : ''}
                                                </span>
                                            </div>

                                           
                                            <div className="form-floating mb-3 col-lg-6">
                                                <input type="text" className="form-control" id="name" name="name" value={doctorData.name} onChange={handleChange} placeholder="Full Name" />
                                                <label htmlFor="name" className='mx-1'>Full Name</label>
                                                <span style={{ color: 'orange' }}>
                                                  {serverResponse && serverResponse.validation_error ? serverResponse.validation_error.name : ''}
                                                </span>
                                            </div>

                                            <div className="form-floating mb-3 col-lg-6">
                                                <input type="number" className="form-control" id="age" name="age" value={doctorData.age} onChange={handleChange} placeholder="Age" />
                                                <label htmlFor="age" className='mx-1'>Age</label>
                                                <span style={{ color: 'orange' }}>
                                                  {serverResponse && serverResponse.validation_error ? serverResponse.validation_error.age : ''}
                                                </span>
                                            </div>

                                            <div className="form-floating mb-3 col-lg-6">
                                                <input type="text" className="form-control" id="sex" name="sex" value={doctorData.sex} onChange={handleChange} placeholder="Sex" />
                                                <label htmlFor="sex" className='mx-1'>Sex</label>
                                                <span style={{ color: 'orange' }}>
                                                  {serverResponse && serverResponse.validation_error ? serverResponse.validation_error.sex : ''}
                                                </span>
                                            </div>

                                            <div className="form-floating mb-3 col-lg-6">
                                                <input 
                                                type="text" 
                                                className="form-control" 
                                                id="relativeName" 
                                                name="relativeName"
                                                value={doctorData.relativeName}
                                                onChange={handleChange}
                                                placeholder="Father/Mother/Spouse Name" 
                                                />
                                                <label htmlFor="relativeName" className='mx-1'>Father/Mother/Spouse Name</label>
                                                <span style={{ color: 'orange' }}>
                                                  {serverResponse && serverResponse.validation_error ? serverResponse.validation_error.relativeName : ''}
                                                </span>

                                            </div>

                                            <div className="form-floating mb-3 col-lg-6">
                                                <input 
                                                type="text" 
                                                className="form-control" 
                                                id="phone" 
                                                name="phone"
                                                value={doctorData.phone}
                                                onChange={handleChange}
                                                placeholder="Phone Number" 
                                                />
                                                <label htmlFor="phone" className='mx-1'>Phone Number</label>
                                                <span style={{ color: 'orange' }}>
                                                  {serverResponse && serverResponse.validation_error ? serverResponse.validation_error.phone : ''}
                                                </span>
                                            </div>

                                            <div className="form-floating mb-3 col-lg-6">
                                                <input 
                                                type="email" 
                                                className="form-control" 
                                                id="email" 
                                                name="email"
                                                value={doctorData.email}
                                                onChange={handleChange}
                                                placeholder="Email" 
                                                />
                                                <label htmlFor="email" className='mx-1'>Email Address</label>
                                                <span style={{ color: 'orange' }}>
                                                  {serverResponse && serverResponse.validation_error ? serverResponse.validation_error.email : ''}
                                                </span>
                                            </div>

                                            <div className="form-floating mb-3 col-lg-6">
                                                <input 
                                                type="text" 
                                                className="form-control" 
                                                id="registrationNo" 
                                                name="registrationNo"
                                                value={doctorData.registrationNo}
                                                onChange={handleChange}
                                                placeholder="Registration Number" 
                                                />
                                                <label htmlFor="registrationNo" className='mx-1'>Registration Number</label>
                                                <span style={{ color: 'orange' }}>
                                                  {serverResponse && serverResponse.validation_error ? serverResponse.validation_error.registrationNo : ''}
                                                </span>
                                            </div>

                                            </>
                            )}
                        {/* Step 2: Address Information */}
                        {step === 2 && (
                                            <>
                                            <h5 className="text-center mb-4">Address</h5>
                                            <div className="form-floating mb-3 col-lg-6">
                                                <input 
                                                type="text" 
                                                className="form-control" 
                                                id="village" 
                                                name="village"
                                                value={doctorData.village}
                                                onChange={handleChange}
                                                placeholder="Village" 
                                                />
                                                <label htmlFor="village" className='mx-1'>Village</label>
                                                <span style={{ color: 'orange' }}>
                                                  {serverResponse && serverResponse.validation_error ? serverResponse.validation_error.village : ''}
                                                </span>
                                            </div>
                                            <div className="form-floating mb-3 col-lg-6">
                                                <input 
                                                type="text" 
                                                className="form-control" 
                                                id="po" 
                                                name="po"
                                                value={doctorData.po}
                                                onChange={handleChange}
                                                placeholder="Post Office" 
                                                />
                                                <label htmlFor="po" className='mx-1'>Post Office</label>
                                                <span style={{ color: 'orange' }}>
                                                  {serverResponse && serverResponse.validation_error ? serverResponse.validation_error.po : ''}
                                                </span>
                                            </div>
                                            <div className="form-floating mb-3 col-lg-6">
                                                <input 
                                                type="text" 
                                                className="form-control" 
                                                id="ps" 
                                                name="ps"
                                                value={doctorData.ps}
                                                onChange={handleChange}
                                                placeholder="Police Station" 
                                                />
                                                <label htmlFor="ps" className='mx-1'>Police Station</label>
                                                <span style={{ color: 'orange' }}>
                                                  {serverResponse && serverResponse.validation_error ? serverResponse.validation_error.ps : ''}
                                                </span>
                                            </div>
                                            <div className="form-floating mb-3 col-lg-6">
                                                <input 
                                                type="text" 
                                                className="form-control" 
                                                id="pin" 
                                                name="pin"
                                                value={doctorData.pin}
                                                onChange={handleChange}
                                                placeholder="PIN Code" 
                                                />
                                                <label htmlFor="pin" className='mx-1'>PIN Code</label>
                                                <span style={{ color: 'orange' }}>
                                                  {serverResponse && serverResponse.validation_error ? serverResponse.validation_error.pin : ''}
                                                </span>
                                            </div>
                                            <div className="form-floating mb-3 col-lg-6">
                                                <input 
                                                type="text" 
                                                className="form-control" 
                                                id="district" 
                                                name="district"
                                                value={doctorData.district}
                                                onChange={handleChange}
                                                placeholder="District" 
                                                />
                                                <label htmlFor="district" className='mx-1'>District</label>
                                                <span style={{ color: 'orange' }}>
                                                  {serverResponse && serverResponse.validation_error ? serverResponse.validation_error.district : ''}
                                                </span>
                                            </div>
                                            </>
                            )}

                        {/* Step 3: Working Address Information */}
                        {step === 3 && (
                                            <>
                                            <h5 className="text-center mb-4">Working Address</h5>
                                            <div className="form-floating mb-3 col-lg-6">
                                                <input 
                                                type="text" 
                                                className="form-control" 
                                                id="buildingNo" 
                                                name="buildingNo"
                                                value={doctorData.buildingNo}
                                                onChange={handleChange}
                                                placeholder="Building Number" 
                                                />
                                                <label htmlFor="buildingNo" className='mx-1'>Building Number</label>
                                                <span style={{ color: 'orange' }}>
                                                  {serverResponse && serverResponse.validation_error ? serverResponse.validation_error.buildingNo : ''}
                                                </span>
                                            </div>
                                            <div className="form-floating mb-3 col-lg-6">
                                                <input 
                                                type="text" 
                                                className="form-control" 
                                                id="landmark" 
                                                name="landmark"
                                                value={doctorData.landmark}
                                                onChange={handleChange}
                                                placeholder="Landmark" 
                                                />
                                                <label htmlFor="landmark" className='mx-1'>Landmark</label>
                                                <span style={{ color: 'orange' }}>
                                                  {serverResponse && serverResponse.validation_error ? serverResponse.validation_error.landmark : ''}
                                                </span>
                                            </div>
                                            <div className="form-floating mb-3 col-lg-6">
                                                <input 
                                                type="text" 
                                                className="form-control" 
                                                id="workDistrict" 
                                                name="workDistrict"
                                                value={doctorData.workDistrict}
                                                onChange={handleChange}
                                                placeholder="District" 
                                                />
                                                <label htmlFor="workDistrict" className='mx-1'>District</label>
                                                <span style={{ color: 'orange' }}>
                                                  {serverResponse && serverResponse.validation_error ? serverResponse.validation_error.workDistrict : ''}
                                                </span>
                                            </div>
                                            <div className="form-floating mb-3 col-lg-6">
                                                <input 
                                                type="text" 
                                                className="form-control" 
                                                id="state" 
                                                name="state"
                                                value={doctorData.state}
                                                onChange={handleChange}
                                                placeholder="State" 
                                                />
                                                <label htmlFor="state" className='mx-1'>State</label>
                                                <span style={{ color: 'orange' }}>
                                                  {serverResponse && serverResponse.validation_error ? serverResponse.validation_error.state : ''}
                                                </span>
                                            </div>
                                            </>
                            )}

                                
                        <div className="d-flex justify-content-center">
                            <button type="submit" onClick={adminDoctorRegistration} className="btn btn-outline-primary col-md-3">Submit</button>
                        </div>
                      

                      </div>
                    </form>
               
                
                {/* Navigation Buttons */}
                <div className="d-flex justify-content-between mt-4">
                    {step > 1 && <button className="btn btn-secondary" onClick={prevStep}>Previous</button>}
                    {step < 3 && <button className="btn btn-primary" onClick={nextStep}>Next</button>}
                </div>
                </div>
            </div>
        </div>
    </div>
    
  );
}
