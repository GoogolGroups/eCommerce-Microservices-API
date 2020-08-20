import supertest from "supertest"
import { app } from "../../app"

test('should clear the cookie after signing out', async () => {
    await supertest(app)
        .post('/api/users/signup')
        .send({ email: 'a@b.com', password: 'password' })
        .expect(201);

    const response = await supertest(app)
        .post('/api/users/signout')
        .send()
        .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
})