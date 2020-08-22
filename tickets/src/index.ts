import mongoose from 'mongoose';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';

const start = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI must be defined')
    }

    try {
        await natsWrapper.connect({
            clusterId: 'ticketing',
            clientId: 'lasfj',
            url: 'http://nats-srv:4222'
        });
        
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
    } catch (e) {
        console.error(e);
    }

    app.listen(5000, () => {
        console.log('Listening on port 5000')
    });
}

start();