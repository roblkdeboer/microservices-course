import React from 'react';
import axios from 'axios';

const LandingPage = ({ currentUser }) => {
  //   console.log(currentUser);
  //   axios.get('/api/users/currentuser').catch((err) => {
  //     console.log(err.message);
  //   });
  return <h1>Landing Page</h1>;
};

// Executed when the page first loads
// Executed on the server when page is refreshed, accessed via a link from a different domain or typed into the search bar
// Executed on the client when navigating between pages within the app

LandingPage.getInitialProps = async ({ req }) => {
  // Check if the user is signed in/authenticated
  if (typeof window === 'undefined') {
    // If undefined, means accessing via the server
    // Requests are made to ingress
    const { data } = await axios.get(
      'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
      {
        // Request header contains the cookie
        headers: req.headers,
      }
    );
    return data;
  } else {
    //Accessing via the browser
    // Requests are made directly to the service
    const { data } = await axios.get('/api/users/currentuser');
    return data;
  }
};

export default LandingPage;
