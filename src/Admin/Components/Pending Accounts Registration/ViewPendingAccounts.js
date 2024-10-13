import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { customStateMethods } from '../../protected/CustomAppState/CustomState';
import userIcon from '../../../Assets/img/registration/userIcon.jpeg';

export const ViewPendingAccounts = () => {
    let token = customStateMethods.selectStateKey('appState', 'token');
    const [loading, setLoading] = useState(null);
    const [messages, setMessages] = useState(null);

    const [docData, setDocData] = useState(null);
    
    customStateMethods.useClearAlert(setMessages);

  
    useEffect(()=>{
        try{

            setLoading(customStateMethods.spinnerDiv(true));

            axios.get('sanctum/csrf-cookie').then(response => {
                axios.get(`/api/admin/fetch-pending-accounts`,{
                    headers: {
                      Authorization: `Bearer ${token}`,
                    }
                  })
                  .then((res) => {
                       
                       if(res.data.status === 200){
                        setDocData(res.data.doc_data);
                        setMessages(customStateMethods.getAlertDiv(res.data.message))
                       }else{
                        setMessages(customStateMethods.getAlertDiv(res.data.message))
                        setLoading(false);
                       }
                       setLoading(false);
                  })
            });
        }catch(error){
            console.log(error);
        }

    },[])

    const generatePassword = (name, phone) => {
        const namePart = name.slice(0, 4);  // Get first 4 characters of name
        const phonePart = phone.slice(-4);  // Get last 4 digits of phone
        return namePart + phonePart;        // Combine to form password
    };

    function acceptAccount(id, name, phone){
      
        try{

            let strName = String(name);
            let strPhone = String(phone);

            const autoPassword = generatePassword(strName, strPhone);

            let userData = {'id':id, 'password':autoPassword}

            setLoading(customStateMethods.spinnerDiv(true));

            axios.get('sanctum/csrf-cookie').then(response => {
                axios.post(`/api/admin/accept-pending-account`,{userData},{
                    headers: {
                      Authorization: `Bearer ${token}`,
                    }
                  })
                  .then((res) => {
                       
                       if(res.data.status === 200){
                        setDocData(res.data.doc_data);
                        setMessages(customStateMethods.getAlertDiv(res.data.message))
                       }else{
                        setMessages(customStateMethods.getAlertDiv(res.data.message))
                        setLoading(false);
                       }
                       setLoading(false);
                  })
            });
        }catch(error){
            console.log(error);
        }

        
    }


    const docTable = docData ? docData.map((items, index) => (
        <tr key={items.id}>
            <td>{index + 1}</td>
            <td>
                <img className='userIcon' src={userIcon} alt="User Icon" />
            </td>
            <td>{items.name}</td>
            <td>{items.age}</td>
            <td>{items.sex}</td>
            <td>{items.phone}</td>
            <td>{items.email}</td>
            <td>{items.registrationNo}</td>
            <td>
                <Link to={`/admin/edit/pending-accounts/${items.id}`} className='btn btn-outline-success btn-sm'>Edit</Link>
            </td>
            <td>
                <Link to={`/admin/doc-credentials/${items.user_id}`} className='btn btn-outline-primary btn-sm'>Credentials</Link>
            </td>
            <td>
                <Link to={`/admin/pending-accounts/full-info/${items.id}`} className='btn btn-outline-primary btn-sm'>Full Info</Link>
            </td>
            <td>
                <button className='btn btn-outline-success btn-sm' onClick={() => acceptAccount(items.id, items.name, items.phone)}>Accept Request</button>
            </td>
        </tr>
    )) : null;

    return (
        <div>
            {loading}
            {messages}
            <p className="h3 text-center">Pending Accounts</p>
    
            <div className="table-responsive table-container">
                <table className="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Profile</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Sex</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Registration No</th>
                            <th>Edit</th>
                            <th>Acc Cred</th>
                            <th>Full Info</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {docTable}
                    </tbody>
                </table>
            </div>
        </div>
    );
    
}
