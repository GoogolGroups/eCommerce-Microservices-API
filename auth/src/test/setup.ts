import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from './../app';
import request from 'supertest';

declare global {
    namespace NodeJS {
        interface Global {
            signin: (emailOverride?: string, passwordOverride?: string) => Promise<string[]>;
        }
    }
}

let mongo: any;
beforeAll(async () => {
    process.env.JWT_KEY = 'secret';
    
    mongo = new MongoMemoryServer();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});

global.signin = async (emailOverride?: string, passwordOverride?: string) => {
    const email = emailOverride || 'test@test.com';
    const password = passwordOverride || 'password';

    const response = await request(app)
        .post('/api/users/signup')
        .send({ email, password })
        .expect(201);

    const cookie = response.get('Set-Cookie');

    return cookie;
}