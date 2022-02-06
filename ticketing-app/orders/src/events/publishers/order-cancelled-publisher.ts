import { Publisher, OrderCancelledEvent, Subjects } from '@robtickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
