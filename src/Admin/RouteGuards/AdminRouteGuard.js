import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { customStateMethods } from '../protected/CustomAppState/CustomState';

export const AdminRouteGuard = ({ children }) => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    
    // Initialize the state
    customStateMethods.initializeState();
    customStateMethods.dispatch({ isAuthenticated: true, role: 'admin' }); //testing protected route


    useEffect(() => {
        try {
            // Retrieve appState from localStorage
            let appState = JSON.parse(localStorage.getItem('appState'));

            console.log(appState);

            // Check if appState is valid
            if (appState && appState.isAuthenticated) {
                if (appState.role === 'admin') {
                    setIsAdmin(true);
                } else {
                    navigate('/'); 
                    console.log('Role is not recognized. Redirecting...');
                }
            } else {
                navigate('/'); // Redirecting if not authenticated
                console.log('appState is not found or invalid. Redirecting...');
            }

        } catch (error) {
            console.log('Error parsing appState:', error);
            navigate('/'); 
        }
    }, [navigate]); 

    return (
        <div>
            {isAdmin ? children : null} 
        </div>
    );
};
