import React from 'react'
import { useLocation } from 'react-router-dom';

export const AssignPatientStepTwo = () => {

    const location = useLocation();
    const { patientId, labId } = location.state || {};  // Safely access state

  return (
    <div>
        AssignPatientStepTwo
         <p>Patient ID: {patientId}</p>
         <p>Lab ID: {labId}</p>
    </div>
  )
}
