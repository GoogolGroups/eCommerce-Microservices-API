import request from 'supertest';
import { app } from '../../app';

const createTicket = () => {
    return request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({ title: 'Title', price: 20 });
}

test('should return the correct list of tickets', async () => {
    await Promise.all([createTicket(), createTicket(), createTicket()]);

    const response = await request(app)
        .get('/api/tickets')
        .send()
        .expect(200);

    expect(response.body.length).toBe(3);
})