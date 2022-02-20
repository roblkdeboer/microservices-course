import React from 'react';

const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are NOT signed in</h1>
  );
};

// Executed when the page first loads
// Executed on the server when page is refreshed, accessed via a link from a different domain or typed into the search bar
// Executed on the client when navigating between pages within the app
// Information fetching just for an individual page
LandingPage.getInitialProps = async (context, client, currentUser) => {
  return {};
};

export default LandingPage;
