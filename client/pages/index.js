import React from 'react';
import Link from 'next/link';

const LandingPage = ({ currentUser, tickets }) => {
  const ticketList = tickets.map((ticket) => {
    return (
      <tr key={ticket.id}>
        <td className="align-middle">{ticket.title}</td>
        <td className="align-middle">{ticket.price}</td>
        <td>
          <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
            <a className="nav-link">View</a>
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <h1 className="my-3">Available Tickets</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>{ticketList}</tbody>
      </table>
    </div>
  );
};

// Executed when the page first loads
// Executed on the server when page is refreshed, accessed via a link from a different domain or typed into the search bar
// Executed on the client when navigating between pages within the app
// Information fetching just for an individual page
LandingPage.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get('/api/tickets');

  return { tickets: data };
};

export default LandingPage;
