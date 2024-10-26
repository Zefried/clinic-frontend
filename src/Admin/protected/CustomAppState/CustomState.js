import React, { useEffect } from 'react';


function defaultStates(param){
    
    let authState = {
        email_status:null,
        loading:false,
        server_response:null,
        role: 'user', // or 'admin'
        isAuthenticated:null,
        token: '',
    };

    return authState;

   // In the future, if there are multiple states, use parameters and switch cases to handle logical changes in the dispatch function.
}

// Function to fetch appState
function initializeState(){
    const savedStates = localStorage.getItem('appState');
   
    if (!savedStates) {
        // initializing and saving default state 
        const defaultState = defaultStates();
        localStorage.setItem('appState', JSON.stringify(defaultState));
    }
    try {

        // fetching post-initialized state to maintain previous state
        const postInitializedState = localStorage.getItem('appState');
        let fetchedState = JSON.parse(postInitializedState);

        return fetchedState;

    } catch (error) {
        return 'Error parsing JSON from localStorage:';
    }
};


// Function to update the store in localStorage
function dispatch(newState) {

    //checking for newState when dispatch() is called
    if (newState) {
        let oldState = initializeState();
        // Updating the localStorage with the new app state
        let updatedState = {...oldState, ...newState};  // Merging current and new states
        localStorage.setItem('appState', JSON.stringify(updatedState)); // Saving updated state

        return updatedState;
    }
    
    console.error('No new state provided.');
    return;
}


function selectStateKey(stateName, key) {
    try {
        const state = localStorage.getItem(stateName);
        
        if (!state) {
            console.warn(`State "${stateName}" not found in localStorage.`);
            return 'state does not exist'; // for debugging 
        }
        
        const parsedState = JSON.parse(state);
        
        if (key in parsedState) {
            return parsedState[key]; // Returning the value associated with the key
        } else {
            console.warn(`Key "${key}" not found in state "${stateName}".`);
            return 'key not found please check typo'; // for debugging 
        }
    } catch (error) {
        console.error('Error retrieving value from state:', error);
        return null;
    }
}


// Function to reset the store state in localStorage
function resetState() {
    const defaultState = defaultStates();
    localStorage.setItem('appState', JSON.stringify(defaultState));
    return defaultState; 
}


// additional functions for devEase 

function spinnerDiv(state) {
    if (state) {
      return (
        <>
          <div className="spinner-grow text-primary" role="status" />
          <span className='text-primary m-1'>Loading...</span>
        </>
      );
    }
    return null;
}

function getAlertDiv(message){
    if(message) {
      return (
        <>
       <div class="alert alert-warning" role="alert">
        <h5>{`${message} 💬`}</h5>
      </div> 
        </>
      );
    }
}
  
function useClearAlert(setMessages, timeout = 4000) {
    
    useEffect(() => {
      if (setMessages) {
        // console.log(setMessages); // why its not showing with other compos check ltr.
        const timer = setTimeout(() => {
          setMessages(null);
        }, timeout);
  
        // Cleanup the timer
        return () => clearTimeout(timer);
      }
    }, [setMessages, timeout]);
}



// state methods module
export const customStateMethods = {
    initializeState,
    dispatch,
    selectStateKey,
    resetState,
    spinnerDiv,
    getAlertDiv,
    useClearAlert,
};

