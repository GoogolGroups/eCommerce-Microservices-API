import request from 'supertest';
import { app } from './../../app';

test('should return a 201 on successful signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'email@domain.com',
            password: 'password'
        })
        .expect(201);
});

test('should return a 400 with an invalid email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'jkljlk',
            password: 'password'
        })
        .expect(400);
});

test('should return a 400 with an invalid password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'email@domain.com',
            password: ''
        })
        .expect(400);
});

test('should return a 400 with a missing email and password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({})
        .expect(400);
});

test('should disallow duplicate emails', async () => {
    const email = 'value@domain.com';

    await request(app)
        .post('/api/users/signup')
        .send({
            email,
            password: 'password'
        })
        .expect(201);

    return request(app)
        .post('/api/users/signup')
        .send({
            email,
            password: 'password2'
        })
        .expect(400);
});

test('should set a cookie after a successful signup', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'value@domain.com',
            password: 'password'
        })
        .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
});