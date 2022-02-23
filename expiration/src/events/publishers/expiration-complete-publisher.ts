import {
  Publisher,
  ExpirationCompleteEvent,
  Subjects,
} from '@robtickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
