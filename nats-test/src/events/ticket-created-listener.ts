import { Listener } from "./base-listener";
import { Message } from "node-nats-streaming";
import { ITicketCreatedEvent } from './ticket-created-event';
import { Subjects } from "./subjects";

export class TicketCreatedListener extends Listener<ITicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
    readonly queueGroupName = 'payments-service';

    protected onMessage(data: ITicketCreatedEvent['data'], msg: Message): void {
        console.log('Event data:', data);
        msg.ack();
    }
}