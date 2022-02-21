import React from 'react';
import Router from 'next/router';

// Custom hooks
import useRequest from '../../hooks/use-request';

const TicketShow = ({ ticket }) => {
  const { doRequest, errors } = useRequest({
    url: '/api/orders',
    method: 'post',
    body: {
      ticketId: ticket.id,
    },
    onSuccess: (order) =>
      Router.push('/orders/[orderId]', `/orders/${order.id}`),
  });

  return (
    <div className="my-3">
      <h1 className="my-3">{ticket.title}</h1>
      <h4 className="my-3">Price: {ticket.price}</h4>
      {errors}
      <button className="btn btn-primary my-3" onClick={doRequest}>
        Purchase
      </button>
    </div>
  );
};

TicketShow.getInitialProps = async (context, client) => {
  // ticketId because that is what the file is called
  const { ticketId } = context.query;
  const { data } = await client.get(`/api/tickets/${ticketId}`);

  return { ticket: data };
};

export default TicketShow;
