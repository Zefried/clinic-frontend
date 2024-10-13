import React, { useState } from 'react';
import emailjs from 'emailjs-com';

export const Test = () => {
    const [secretCode, setSecretCode] = useState('');
    const [verificationCode, setVerificationCode] = useState('');

    const generateRandomString = () => {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        const randomString = 
            letters.charAt(Math.floor(Math.random() * letters.length)) +
            letters.charAt(Math.floor(Math.random() * letters.length)) +
            numbers.charAt(Math.floor(Math.random() * numbers.length)) +
            numbers.charAt(Math.floor(Math.random() * numbers.length));
        return randomString;
    };

    const sendEmail = (e) => {
        e.preventDefault();
        const code = generateRandomString(); // Generate the random string
        localStorage.setItem('secretCode', code); // Store the secret code in local storage

        const formData = {
            user_email: 'zeffali7@gmail.com', // Fixed recipient email
            subject: 'Your Secret Code', // Fixed subject
            message: `Your secret code is: ${code}`, // Body with the random string
        };

        emailjs.send('service_agpne1p', 'template_rqtecxa', formData, 'wqxRswgesOELOXx3E')
            .then((result) => {
                console.log(result.text);
                alert("Email sent successfully!");
            })
            .catch((error) => {
                console.log(error.text);
                alert("Error sending email!");
            });
    };

    const verify = (e) => {
        e.preventDefault();
        const storedCode = localStorage.getItem('secretCode'); // Retrieve the stored code
        if (verificationCode === storedCode) {
            alert("Verification successful!");
        } else {
            alert("Verification failed! Please try again.");
        }
    };

    return (
        <form onSubmit={sendEmail}>
            <button type="submit">Send Secret Code to Email</button>
            <input 
                type="text" 
                placeholder="Enter verification code" 
                value={verificationCode} // Controlled input
                onChange={(e) => setVerificationCode(e.target.value)} // Update state on change
            />
            <button onClick={verify}>Verify Code</button>
        </form>
    );
};
