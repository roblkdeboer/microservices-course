import { Publisher, Subjects, TicketCreatedEvent } from '@robtickets/common';

// Generic class so need to specify what kind of publisher event we are using
export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
