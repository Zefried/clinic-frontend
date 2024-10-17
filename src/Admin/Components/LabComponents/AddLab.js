import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { customStateMethods } from '../../protected/CustomAppState/CustomState';


export const AddLab = () => {

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
  const [labData, setLabData] = useState({
    name: '',
    phone: '',
    email: '',
    registrationNo: '',
    buildingNo: '',
    landmark: '',
    workDistrict: '',
    state: '',
    password:'',
  });

 

  // Proceed to next step
  const nextStep = () => setStep(step + 1);
 
  // Go back to previous step
  const prevStep = () => setStep(step - 1);

   // Function to handle input changes
  const handleChange = (e) => {
    setLabData({
      ...labData,
      [e.target.name]: e.target.value
    });
  };

  const generatePassword = (name, phone) => {
    const namePart = name.slice(0, 4);  // Get first 4 characters of name
    const phonePart = phone.slice(-4);  // Get last 4 digits of phone
    return namePart + phonePart;        // Combine to form password
  };

  function adminLabRegistration(e) {
    e.preventDefault();

    setLoading(customStateMethods.spinnerDiv(true));

    try {
      // Generate the password
      const autoPassword = generatePassword(labData.name, labData.phone);
  
      // Update labData state with the generated password
      const updatedLabData = {
        ...labData,
        password: autoPassword,
        pswCred: autoPassword,
      };
    
      axios.get('sanctum/csrf-cookie').then(response => {
        axios.post('api/admin/add-lab', updatedLabData, {
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
              }

              setLoading(false);
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
    <div >
        <div className="container mt-5">
            <div className="card shadow-lg border-0 rounded-4" id='doc-bg'>
                <div className="card-body p-4">
                <h3 className="text-center mb-4">Lab Registration - Step {step}</h3>
                {messages}
                {loading}
              
                    <form > 
                      <div className="row">
                        
                        {/* Step 1: Lab Information */}
                        {step === 1 && (
                                            <>
                                            <h5 className="text-center mb-4">Lab Information</h5>

                                           
                                            <div className="form-floating mb-3 col-lg-6">
                                                <input type="text" className="form-control" id="name" name="name" value={labData.name} onChange={handleChange} placeholder="Full Name" />
                                                <label htmlFor="name" className='mx-1'>Name of Lab</label>
                                                <span style={{ color: 'orange' }}>
                                                  {serverResponse && serverResponse.validation_error ? serverResponse.validation_error.name : ''}
                                                </span>
                                            </div>


                                            <div className="form-floating mb-3 col-lg-6">
                                                <input 
                                                type="text" 
                                                className="form-control" 
                                                id="phone" 
                                                name="phone"
                                                value={labData.phone}
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
                                                value={labData.email}
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
                                                value={labData.registrationNo}
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
                      
                        {/* Step 3: Working Address Information */}
                        {step === 2 && (
                                            <>
                                            <h5 className="text-center mb-4">Working Address</h5>
                                            <div className="form-floating mb-3 col-lg-6">
                                                <input 
                                                type="text" 
                                                className="form-control" 
                                                id="buildingNo" 
                                                name="buildingNo"
                                                value={labData.buildingNo}
                                                onChange={handleChange}
                                                placeholder="Building Number" 
                                                />
                                                <label htmlFor="buildingNo" className='mx-1'>Building Number, Block, and Road Address</label>
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
                                                value={labData.landmark}
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
                                                value={labData.workDistrict}
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
                                                value={labData.state}
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
                            <button type="submit" onClick={adminLabRegistration} className="btn btn-outline-primary col-md-3">Submit</button>
                        </div>
                      
                      </div>
                    </form>
               
                
                {/* Navigation Buttons */}
                <div className="d-flex justify-content-between mt-4">
                    {step > 1 && <button className="btn btn-secondary" onClick={prevStep}>Previous</button>}
                    {step < 2 && <button className="btn btn-primary" onClick={nextStep}>Next</button>}
                </div>
                </div>
            </div>
        </div>
    </div>
    
  );
}
