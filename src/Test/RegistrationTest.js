import React, { useState } from 'react';
import axios from 'axios';


export const RegistrationTest = () => {

  // Step management
  const [step, setStep] = useState(1);

  // Form state to hold all input data
  const [doctorData, setDoctorData] = useState({
    name: '',
    age: '',
    sex: '',
    relativeName: '',  // Father, Mother, or Spouse
    phone: '',
    email: '',
    registrationNo: '',
    village: '',
    po: '',
    ps: '',
    pin: '',
    district: '',
    buildingNo: '',
    landmark: '',
    workDistrict: '',
    state: '',
    designation: 'doctor',
    password:'',
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

  const generatePassword = (name, phone) => {
    const namePart = name.slice(0, 4);  // Get first 4 characters of name
    const phonePart = phone.slice(-4);  // Get last 4 digits of phone
    return namePart + phonePart;        // Combine to form password
  };
  
  function adminDoctorRegistration(e) {
    e.preventDefault();
    
    try {
      // Generate the password
      const autoPassword = generatePassword(doctorData.name, doctorData.phone);
  
      // Update doctorData state with the generated password
      const updatedDoctorData = {
        ...doctorData,
        password: autoPassword
      };

      console.log(updatedDoctorData);
  
    //   axios.get('sanctum/csrf-cookie').then(response => {
    //     axios.post('api/admin/add-doctor', updatedDoctorData)
    //       .then((res) => {
    //         console.log(res.data);  // Success message
    //       })
    //       .catch(error => {
    //         console.log(error);  // Handle API error
    //       });
    //   });
      
    } catch (error) {
      console.log(error);  // Handle any unexpected errors
    }
  }





  return (
    <div >
        <div className="container mt-5">
            <div className="card shadow-lg border-0 rounded-4" id='doc-bg'>
                <div className="card-body p-4">
                <h3 className="text-center mb-4">Doctor Registration - Step {step}</h3>

                    <form > 
                        {/* Step 1: Personal Information */}
                        {step === 1 && (
                                            <>
                                            <h5 className="text-center mb-4">Personal Information</h5>
                                            <div className="form-floating mb-3">
                                                <input type="text" className="form-control" id="name" name="name" value={doctorData.name} onChange={handleChange} placeholder="Full Name" />
                                                <label htmlFor="name">Full Name</label>
                                            </div>

                                            <div className="form-floating mb-3">
                                                <input type="number" className="form-control" id="age" name="age" value={doctorData.age} onChange={handleChange} placeholder="Age" />
                                                <label htmlFor="age">Age</label>
                                            </div>

                                            <div className="form-floating mb-3">
                                                <input type="text" className="form-control" id="sex" name="sex" value={doctorData.sex} onChange={handleChange} placeholder="Sex" />
                                                <label htmlFor="sex">Sex</label>
                                            </div>

                                            <div className="form-floating mb-3">
                                                <input 
                                                type="text" 
                                                className="form-control" 
                                                id="relativeName" 
                                                name="relativeName"
                                                value={doctorData.relativeName}
                                                onChange={handleChange}
                                                placeholder="Father/Mother/Spouse Name" 
                                                />
                                                <label htmlFor="relativeName">Father/Mother/Spouse Name</label>
                                            </div>

                                            <div className="form-floating mb-3">
                                                <input 
                                                type="text" 
                                                className="form-control" 
                                                id="phone" 
                                                name="phone"
                                                value={doctorData.phone}
                                                onChange={handleChange}
                                                placeholder="Phone Number" 
                                                />
                                                <label htmlFor="phone">Phone Number</label>
                                            </div>

                                            <div className="form-floating mb-3">
                                                <input 
                                                type="email" 
                                                className="form-control" 
                                                id="email" 
                                                name="email"
                                                value={doctorData.email}
                                                onChange={handleChange}
                                                placeholder="Email" 
                                                />
                                                <label htmlFor="email">Email Address</label>
                                            </div>

                                            <div className="form-floating mb-3">
                                                <input 
                                                type="text" 
                                                className="form-control" 
                                                id="registrationNo" 
                                                name="registrationNo"
                                                value={doctorData.registrationNo}
                                                onChange={handleChange}
                                                placeholder="Registration Number" 
                                                />
                                                <label htmlFor="registrationNo">Registration Number</label>
                                            </div>

                                            </>
                            )}
                        {/* Step 2: Address Information */}
                        {step === 2 && (
                                            <>
                                            <h5 className="text-center mb-4">Address</h5>
                                            <div className="form-floating mb-3">
                                                <input 
                                                type="text" 
                                                className="form-control" 
                                                id="village" 
                                                name="village"
                                                value={doctorData.village}
                                                onChange={handleChange}
                                                placeholder="Village" 
                                                />
                                                <label htmlFor="village">Village</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input 
                                                type="text" 
                                                className="form-control" 
                                                id="po" 
                                                name="po"
                                                value={doctorData.po}
                                                onChange={handleChange}
                                                placeholder="Post Office" 
                                                />
                                                <label htmlFor="po">Post Office</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input 
                                                type="text" 
                                                className="form-control" 
                                                id="ps" 
                                                name="ps"
                                                value={doctorData.ps}
                                                onChange={handleChange}
                                                placeholder="Police Station" 
                                                />
                                                <label htmlFor="ps">Police Station</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input 
                                                type="text" 
                                                className="form-control" 
                                                id="pin" 
                                                name="pin"
                                                value={doctorData.pin}
                                                onChange={handleChange}
                                                placeholder="PIN Code" 
                                                />
                                                <label htmlFor="pin">PIN Code</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input 
                                                type="text" 
                                                className="form-control" 
                                                id="district" 
                                                name="district"
                                                value={doctorData.district}
                                                onChange={handleChange}
                                                placeholder="District" 
                                                />
                                                <label htmlFor="district">District</label>
                                            </div>
                                            </>
                            )}

                        {/* Step 3: Working Address Information */}
                        {step === 3 && (
                                            <>
                                            <h5 className="text-center mb-4">Working Address</h5>
                                            <div className="form-floating mb-3">
                                                <input 
                                                type="text" 
                                                className="form-control" 
                                                id="buildingNo" 
                                                name="buildingNo"
                                                value={doctorData.buildingNo}
                                                onChange={handleChange}
                                                placeholder="Building Number" 
                                                />
                                                <label htmlFor="buildingNo">Building Number</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input 
                                                type="text" 
                                                className="form-control" 
                                                id="landmark" 
                                                name="landmark"
                                                value={doctorData.landmark}
                                                onChange={handleChange}
                                                placeholder="Landmark" 
                                                />
                                                <label htmlFor="landmark">Landmark</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input 
                                                type="text" 
                                                className="form-control" 
                                                id="workDistrict" 
                                                name="workDistrict"
                                                value={doctorData.workDistrict}
                                                onChange={handleChange}
                                                placeholder="District" 
                                                />
                                                <label htmlFor="workDistrict">District</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input 
                                                type="text" 
                                                className="form-control" 
                                                id="state" 
                                                name="state"
                                                value={doctorData.state}
                                                onChange={handleChange}
                                                placeholder="State" 
                                                />
                                                <label htmlFor="state">State</label>
                                            </div>
                                            </>
                            )}

                                
                        <div className="d-flex justify-content-center">
                            <button type="submit" onClick={adminDoctorRegistration} className="btn btn-outline-primary col-md-3">Submit</button>
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
