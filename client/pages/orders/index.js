import React from 'react';

const OrderIndex = ({ orders }) => {
  const orderList = orders.map((order) => {
    return (
      <tr key={order.id}>
        <td className="align-middle">{order.ticket.title}</td>
        <td className="align-middle">${order.ticket.price}</td>
        <td className="align-middle">{order.status}</td>
      </tr>
    );
  });

  return (
    <div>
      <h1 className="my-3">Orders</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Ticket</th>
            <th>Price</th>
            <th>Order Status</th>
          </tr>
        </thead>
        <tbody>{orderList}</tbody>
      </table>
    </div>
  );
};

OrderIndex.getInitialProps = async (context, client) => {
  // orderId because that is what the file is called
  const { data } = await client.get('/api/orders');

  return { orders: data };
};

export default OrderIndex;
