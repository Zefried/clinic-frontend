import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import axios from 'axios';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'jquery';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../src/Assets/css/sb-admin-2.min.css';
import '../src/Assets/vendor/fontawesome-free/css/all.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';




axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.baseURL = 'http://localhost:8000/';

// Add a global error interceptor
axios.interceptors.response.use(
  response => response, 
  error => {
    if (error.response) {
    
      if (error.response.status === 404) {
        console.error("Resource not found!"); 
        alert("The resource you are looking for cannot be found."); // Custom message

        return Promise.reject(new Error("Page or API not found | No Issue contact developer - 7827379351"));
      }
     
    } else {
      console.error("Network error or request blocked");
      alert("The resource is either blocked or click Okay!.");
    }
    return Promise.reject(error); 
  }
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <BrowserRouter>
    <App />
  </BrowserRouter>
   
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
