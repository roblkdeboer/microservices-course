import mongoose from 'mongoose';
import { Ticket } from '../../../models/ticket';

import { OrderCreatedEvent, OrderStatus } from '@robtickets/common';
import { OrderCreatedListener } from '../order-created-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { Message } from 'node-nats-streaming';

const setup = async () => {
  // Create an instance of the listener
  const listener = new OrderCreatedListener(natsWrapper.client);

  //   Create and save a ticket
  const ticket = Ticket.build({
    title: 'concert',
    price: 10,
    userId: new mongoose.Types.ObjectId().toHexString(),
  });

  await ticket.save();

  // Create a fake data event
  const data: OrderCreatedEvent['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    expiresAt: 'date time',
    userId: new mongoose.Types.ObjectId().toHexString(),
    ticket: {
      id: ticket.id,
      price: ticket.price,
    },
  };

  // Create a fake message object
  //   @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, ticket, msg };
};

it('sets the userId of the ticket', async () => {
  const { listener, ticket, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket!.orderId).toEqual(data.id);
});

it('acks the message', async () => {
  const { listener, ticket, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
