import { Publisher, TicketCreatedEvent, Subjects } from "@jcsgtickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    protected readonly subject = Subjects.TicketCreated;
}