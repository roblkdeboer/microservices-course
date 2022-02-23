import React, { useState } from 'react';
import Router from 'next/router';

// Custom hooks
import useRequest from '../../hooks/use-request';

const signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //   Custom hook to make a request
  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: { email, password },
    onSuccess: () => Router.push('/'),
  });

  const submitHandler = async (event) => {
    event.preventDefault();

    await doRequest();
  };

  return (
    <div className="container mt-3">
      <form onSubmit={submitHandler}>
        <h1>Sign Up</h1>
        <div className="form-group">
          <label>Email Address</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group mb-3">
          <label>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control"
          />
        </div>
        {/* If more than 1 error, show the div */}
        {errors}
        <button className="btn btn-primary my-3">Sign Up</button>
      </form>
    </div>
  );
};

export default signup;
