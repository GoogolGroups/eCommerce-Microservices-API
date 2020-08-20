import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
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