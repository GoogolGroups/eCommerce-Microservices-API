import { Subjects } from "./subjects";
import { Stan } from "node-nats-streaming";

interface IEvent {
    subject: Subjects;
    data: any;
}

export abstract class Publisher<T extends IEvent> {
    protected readonly abstract subject: T['subject'];
    private readonly client: Stan;

    constructor (client: Stan) {
        this.client = client;
    }

    publish(data: T['data']): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client.publish(this.subject, JSON.stringify(data), (err) => {
                if (err) {
                    return reject(err);
                }

                return resolve();
            });
        });
    }
}