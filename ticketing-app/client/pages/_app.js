import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import buildClient from '../api/build-client';
import Header from '../components/header';

// Defined our own custom app component with bootstrap
const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  );
};

// Executed when the page first loads
// Executed on the server when page is refreshed, accessed via a link from a different domain or typed into the search bar
// Executed on the client when navigating between pages within the app
// Information fetching for the whole app
AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');

  let pageProps = {};
  //   Prevent other pages from crashing because pageProps is undefined
  //   If this is defined:
  if (appContext.Component.getInitialProps) {
    //   Specifically to pass props to the component tree
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  console.log(pageProps);

  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
