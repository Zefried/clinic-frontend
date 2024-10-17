import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { customStateMethods } from '../../protected/CustomAppState/CustomState';
import userIcon from '../../../Assets/img/registration/userIcon.jpeg';

export const ViewLab = () => {
    let token = customStateMethods.selectStateKey('appState', 'token');
    
    const [loading, setLoading] = useState(null);
    const [messages, setMessages] = useState(null);

    const [labData, setLabData] = useState(null);
    
    customStateMethods.useClearAlert(setMessages);

  
    useEffect(()=>{
        try{

            setLoading(customStateMethods.spinnerDiv(true));

            axios.get('sanctum/csrf-cookie').then(response => {
                axios.get(`/api/admin/fetch-lab-account-data`,{
                    headers: {
                      Authorization: `Bearer ${token}`,
                    }
                  })
                  .then((res) => {
                       
                       if(res.data.status === 200){
                        setLabData(res.data.lab_account_data);
                        setMessages(customStateMethods.getAlertDiv(res.data.message))
                       }else{
                        setMessages(customStateMethods.getAlertDiv(res.data.message))
                       }

                      if(res.data){
                        setLoading(false);
                      }
                  })
            });
        }catch(error){
            setLoading(false);
            console.log(error);
        }

    },[])


    const labTable = labData ? labData.map((items, index) => (
        <tr key={items.id}>
            <td>{index + 1}</td>
            <td>
                <img className='userIcon' src={userIcon} alt="User Icon" />
            </td>
            <td>{items.name}</td>
            <td>{items.email}</td>
            <td>{items.phone}</td>
            <td>{items.district}</td>
            <td>{items.registrationNo}</td>
            <td>
                <Link to={`/admin/lab-full-info/${items.id}`} className='btn btn-outline-primary btn-sm'>Full Info</Link>
            </td>
            <td>
                <Link to={`/admin/lab-credentials/${items.user_id}`} className='btn btn-outline-primary btn-sm'>Credentials</Link>
            </td>
            <td>
           
                <button className='btn btn-outline-danger btn-sm'>Delete</button>
            </td>
            
        </tr>
    )) : null;

    return (
        <div>
            {loading}
            {messages}
            <p className="h3 text-center">View Lab Accounts</p>
    
            <div className="table-responsive table-container">
                <table className="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Profile</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Location</th>
                            <th>Registration No</th>
                            <th>Full Info</th>
                            <th>Acc Cred</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {labTable}
                    </tbody>
                </table>
            </div>
        </div>
    );
    
}
