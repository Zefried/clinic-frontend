import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { customStateMethods } from '../../protected/CustomAppState/CustomState';
import { Link, useParams } from 'react-router-dom';

export const LabInformation = () => {

    let token = customStateMethods.selectStateKey('appState', 'token');

    const [loading, setLoading] = useState(null);
    const [messages, setMessages] = useState(null);

    const [labData, setLabData] = useState(null);
    
    customStateMethods.useClearAlert(setMessages);

    const {id } = useParams();

    useEffect(()=>{
        try{

            setLoading(customStateMethods.spinnerDiv(true));

            axios.get('sanctum/csrf-cookie').then(response => {
                axios.get(`api/admin/fetch-lab-single-account-data/${id}`, {
                    headers: { 'Content-Type': 'application/',
                        Authorization:`Bearer ${token}`
                    }
                })
                  .then((res) => {
                       if(res.data.status === 200){
                        setLabData(res.data.lab_account_data);
                        setMessages(customStateMethods.getAlertDiv(res.data.message))
                       }else{
                        setMessages(customStateMethods.getAlertDiv(res.data.message))
                        setLoading(false);
                       }

                       if(res.data){
                        setLoading(false)
                       }
                  })
            });
        }catch(error){
            setLoading(false);
            console.log(error);
        }

    },[])

    let labCards = '';
   
    if (labData) {

        labCards = labData.map((item, index) => {

        return (
            <div key={index} className="card my-3">
                <div className="card-header d-flex justify-content-between  bg-primary text-white">
                    <h5 className="card-title mb-0">Lab Details: {item.name}</h5>
                    <Link className='btn btn-outline-light' to={'/admin/view-lab'} >Back</Link>
                </div>
                <div className="card-body">
            
                    {/* Lab Information */}
                    <h6 className="text-uppercase fw-bold mt-3">Lab Complete Information</h6>
                    <div className="row">
                        <div className="col-md-6">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item"><strong>ID:</strong> {item.id}</li>
                                <li className="list-group-item"><strong>Name:</strong> {item.name}</li>
                                <li className="list-group-item"><strong>Lab Unique ID:</strong> {item.lab_unique_id}</li>
                                <li className="list-group-item"><strong>Registration No:</strong> {item.registrationNo}</li>
                            </ul>
                        </div>
                        <div className="col-md-6">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item"><strong>Building No:</strong> {item.buildingNo}</li>
                                <li className="list-group-item"><strong>Landmark:</strong> {item.landmark}</li>
                                <li className="list-group-item"><strong>District:</strong> {item.district}</li>
                                <li className="list-group-item"><strong>State:</strong> {item.state}</li>
                            </ul>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="row mt-5">
                        <div className="col-md-6">
                            <h6 className="text-uppercase fw-bold mt-4">Contact Information</h6>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item"><strong>Phone:</strong> {item.phone}</li>
                                <li className="list-group-item"><strong>Email:</strong> {item.email}</li>
                            </ul>
                        </div>
                    </div>
                   
                </div>
            </div>
        );
    });
    }

  return (
    <div>
        {loading}
        {messages}
        <p className="h3 text-center">Complete Information</p>

        {labCards}

    </div>
  )
}
