import supertest from "supertest"
import { app } from "../../app"

test('should fail when an email that does not exist is supplied', async () => {
    return supertest(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(400);
})


test('should fail when an incorrect password is supplied', async () => {
    await supertest(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    return supertest(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'wrong-password'
        })
        .expect(400);
})

test('should respond with a cookie when passed valid credentials', async () => {
    await supertest(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    const response = await supertest(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
})