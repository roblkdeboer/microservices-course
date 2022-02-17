import { OrderCreatedEvent, Listener, Subjects } from '@robtickets/common';
import { queueGroupName } from './queue-group-name';
import { Message } from 'node-nats-streaming';
import { expirationQueue } from '../../queues/expiration-queue';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;

  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    //   Expires at expiration time set in orders new ticket route
    //   getTime returns in ms
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
    console.log('Waiting this many miliseconds to process the job,', delay);

    await expirationQueue.add(
      {
        orderId: data.id,
      }
      //   {
      //     delay: delay,
      //   }
    );

    // Ack the message
    msg.ack();
  }
}
