import { Publisher, TicketUpdatedEvent, Subjects } from "@jcsgtickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    protected readonly subject = Subjects.TicketUpdated;
}