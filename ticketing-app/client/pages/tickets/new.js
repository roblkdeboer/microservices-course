import React, { useState } from 'react';

// Custom hooks
import useRequest from '../../hooks/use-request';

const newTicket = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');

  const onBlur = () => {
    const value = parseFloat(price);

    if (isNaN(value)) {
      return;
    }

    setPrice(value.toFixed(2));
  };

  //   Custom hook to make a request
  const { doRequest, errors } = useRequest({
    url: '/api/tickets',
    method: 'post',
    body: { title, price },
    onSuccess: (ticket) => console.log(ticket),
  });

  const submitHandler = async (event) => {
    event.preventDefault();

    await doRequest();
  };

  return (
    <div>
      <h1 className="my-3">Create a ticket</h1>
      <form onSubmit={submitHandler}>
        <div className="my-3 form-group">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="my-3 form-group">
          <label>Price</label>
          <input
            value={price}
            onBlur={onBlur}
            onChange={(e) => setPrice(e.target.value)}
            className="form-control"
          />
        </div>
        {/* If more than 1 error, show the div */}
        {errors}
        <button className="btn btn-primary my-3">Submit</button>
      </form>
    </div>
  );
};

export default newTicket;
