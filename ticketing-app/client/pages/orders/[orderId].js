import React, { useEffect, useState } from 'react';

const OrderShow = ({ order }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - newDate();

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
    return <div>Order Expired</div>;
  }

  return <div>Time left to pay: {timeLeft} seconds</div>;
};

TicketShow.getInitialProps = async (context, client) => {
  // orderId because that is what the file is called
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default OrderShow;
