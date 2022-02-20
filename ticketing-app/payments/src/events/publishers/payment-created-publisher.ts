import { Subjects, PaymentCreatedEvent, Publisher } from '@robtickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
