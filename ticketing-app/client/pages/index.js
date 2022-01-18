import React from 'react';
import axios from 'axios';

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  axios.get('/api/users/currentuser').catch((err) => {
    console.log(err.message);
  });

  return <h1>Landing Page</h1>;
};

// LandingPage.getInitialProps = async () => {
//   // Check if the user is signed in/authenticated
//   const response = await axios.get('/api/users/currentuser');

//   return response.data;
// };

export default LandingPage;
