import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

test('should return 404 if ticket is not found', async () => {
    await request(app)
        .get(`/api/tickets/${new mongoose.Types.ObjectId().toHexString()}`)
        .send()
        .expect(404);
});

test('should return the correct ticket if the ticket is found', async () => {
    const title = 'Concert';
    const price = 20;

    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({ title, price })
        .expect(201);

    const ticketResponse = await request(app)
        .get(`/api/tickets/${response.body.id}`)
        .send()
        .expect(200);

    expect(ticketResponse.body).toMatchObject({ title, price });
})