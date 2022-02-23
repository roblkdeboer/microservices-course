import { Publisher, Subjects, TicketUpdatedEvent } from '@robtickets/common';

// Generic class so need to specify what kind of publisher event we are using
export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
