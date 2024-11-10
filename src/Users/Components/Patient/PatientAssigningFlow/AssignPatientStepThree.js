import React from 'react'
import { useLocation } from 'react-router-dom';

export const AssignPatientStepThree = () => {


    const location = useLocation();
    const { patientId, labId, selectedEmployeeId, selectedEmployeeData, patientData } = location.state || {};



  return (
    <div>
        AssignPatientStepThree

        <div>
            <h3>Step Three: Assigning Patient to Lab</h3>
            <p>Patient ID: {patientId}</p>
            <p>Lab ID: {labId}</p>
            <p>Employee ID: {selectedEmployeeId}</p>
            <p>Employee Name: {selectedEmployeeData?.name}</p>
            <p>Lab Name: {patientData?.labName}</p>
            <p>Patient Name: {patientData?.patient_name}</p>
        </div>

    </div>
  )
}
