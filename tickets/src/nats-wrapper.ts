import nats, { Stan } from 'node-nats-streaming';

interface IConnectionSettings {
    clusterId: string;
    clientId: string;
    url: string;
}

class NatsWrapper {
    private _client?: Stan;

    public get client() {
        if (!this._client) {
            throw new Error('Cannot access NATS client before connecting');
        }

        return this._client;
    }

    public connect(connectionSettings: IConnectionSettings) {
        this._client = nats.connect(
            connectionSettings.clusterId,
            connectionSettings.clientId,
            { url: connectionSettings.url }
        );    

        return new Promise((resolve, reject) => {
            this.client.on('connect', () => {
                console.log('Connected to NATS');
                resolve();
            });

            this.client.on('error', err => {
                reject(err);
            });
        });
    }
}

export const natsWrapper = new NatsWrapper();