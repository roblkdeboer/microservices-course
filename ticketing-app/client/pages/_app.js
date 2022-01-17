import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';

// Defined our own custom app component with bootstrap
const _app = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default _app;
