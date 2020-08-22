import { Publisher } from "./base-publisher";
import { ITicketCreatedEvent } from "./ticket-created-event";
import { Subjects } from "./subjects";

export class TicketCreatedPublisher extends Publisher<ITicketCreatedEvent> {
    protected readonly subject = Subjects.TicketCreated;
}