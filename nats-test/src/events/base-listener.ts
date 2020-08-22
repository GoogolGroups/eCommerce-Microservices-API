import { Message, Stan } from 'node-nats-streaming';
import { Subjects } from './subjects';

interface IEvent {
    subject: Subjects;
    data: any;
}

export abstract class Listener<T extends IEvent> {
    protected readonly abstract subject: T['subject'];
    protected readonly abstract queueGroupName: string;
    protected abstract onMessage(data: T['data'], msg: Message): void;

    protected ackWait = 5 * 1000;

    private readonly client: Stan;

    public constructor (client: Stan) {
        this.client = client;
    }

    protected subscriptionOptions() {
        return this.client
            .subscriptionOptions()
            .setDeliverAllAvailable()
            .setManualAckMode(true)
            .setAckWait(this.ackWait)
            .setDurableName(this.queueGroupName);
    }

    public listen() {
        const subscription = this.client.subscribe(
            this.subject,
            this.queueGroupName,
            this.subscriptionOptions()
        );

        subscription.on('message', (msg: Message) => {
            console.log(
                `Message received: ${this.subject} / ${this.queueGroupName}`
            );

            const parsedData = this.parseMessage(msg);
            this.onMessage(parsedData, msg);
        });
    }

    private parseMessage(msg: Message) {
        const data = msg.getData();
        return typeof data === 'string'
            ? JSON.parse(data)
            : JSON.parse(data.toString('utf-8'));
    }
}