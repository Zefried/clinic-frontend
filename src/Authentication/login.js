import React from 'react'

export const Login = () => {

    

    const redirectToAuth = async () => {

        const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
        const redirectUri = encodeURIComponent(process.env.REACT_APP_GOOGLE_REDIRECT_URI);
        const scope = encodeURIComponent('openid email profile https://www.googleapis.com/auth/calendar');

    
        const googleSignupLink = `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&access_type=offline&prompt=consent`;
      
        try {
          window.location.href = googleSignupLink;
        } catch (error) {
          console.log(error);
        }

      };
    




  return (
    <div>
        <button onClick={redirectToAuth} className='btn btn-outline-danger m-5'>Sing in with Google</button>
    </div>
  )
}
