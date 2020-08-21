import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';


test('should have a route handler listening to /api/tickets for post requests', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .send({});

    expect(response.status).not.toEqual(404);
});

test('should only be accessible when a user is signed in', async () => {
    return request(app)
        .post('/api/tickets')
        .send({})
        .expect(401);
});

test('should return non-401 status if user is signed in', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({});

    expect(response.status).not.toBe(401);
});

test('should return an error if an invalid title is provided', async () => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: '',
            price: 10
        })
        .expect(400);

    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            price: 10
        })
        .expect(400);
});

test('should return an error if an invalid price is provided', async () => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'A title',
            price: -10
        })
        .expect(400);

    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'A title',
        })
        .expect(400);
});

test('should create a ticket with valid parameters', async () => {
    let tickets = await Ticket.find({});
    expect(tickets.length).toBe(0);

    const title = 'Title';
    const price = 20;

    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title,
            price
        })
        .expect(201);

    tickets = await Ticket.find({});
    expect(tickets.length).toBe(1);
    expect(tickets[0]).toMatchObject({ title, price });
});