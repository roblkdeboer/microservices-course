import React, { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';

// Custom hooks
import useRequest from '../../hooks/use-request';

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const { doRequest, errors } = useRequest({
    url: '/api/payments',
    method: 'post',
    body: {
      orderId: order.id,
    },
    onSuccess: (payment) => console.log(payment),
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();

      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    // Stop timer when navigating away from the component
    return () => {
      clearInterval(timerId);
    };
    // Empty array means it will only run once, when the component first loads
  }, [order]);

  if (timeLeft < 0) {
    return <div className="my-3">Order Expired</div>;
  }

  return (
    <div className="my-3">
      {errors}
      <div className="my-3">Time left to pay: {timeLeft} seconds</div>
      <div className="my-3">
        <StripeCheckout
          token={({ id }) => doRequest({ token: id })}
          stripeKey="pk_test_51KUvAtAz6o6lO1KTManVB9E1L6E0FjMzNawSMCl9LzUAmU56pmNPlljZzdFRWgxoTRmCW6vWMHYU5RciLGUx7zds00WbL3LK8T"
          amount={order.ticket.price * 100}
          email={currentUser.email}
        />
      </div>
    </div>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  // orderId because that is what the file is called
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default OrderShow;
