import { Message } from 'node-nats-streaming';
import { Subjects, Listener, TicketCreatedEvent } from '@robtickets/common';
import { Ticket } from '../../models/ticket';
import { queueGroupName } from './queue-group-name';

// Generic class to listen for ticket created event
export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    const { id, title, price } = data;
    const ticket = Ticket.build({
      id,
      title,
      price,
    });
    await ticket.save();

    msg.ack();
  }
}
