import React from 'react'
import { useEffect, useState} from 'react';
import { customStateMethods } from '../../protected/CustomAppState/CustomState';
import axios from 'axios';



export const TestAdminMiddleware = () => {

    const [loading, setLoading] = useState(null);
    const [messages, setMessages] = useState(null);

    const [docData, setDocData] = useState(null);
    
    customStateMethods.useClearAlert(setMessages);

    let role = customStateMethods.selectStateKey('appState', 'role');
    let token = customStateMethods.selectStateKey('appState', 'token');

    // console.log(token);
    // console.log(role);


    useEffect(()=>{
        try{

            setLoading(customStateMethods.spinnerDiv(true));

            axios.get('sanctum/csrf-cookie').then(response => {
                axios.post(`/api/admin/testMw`, null, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                })
                .then((res) => {
                    console.log(res.data);
                })
                .catch((error) => {
                    // Handle error here
                    console.error(error);
                });
            });
            setLoading(false);
        }catch(error){
            console.log(error);
        }

    },[])


  return (
    <div>
        {loading}
        {messages}
        <div>TestAdminMiddleware</div>
    </div>
   
  )
}
