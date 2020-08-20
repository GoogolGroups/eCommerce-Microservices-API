import request from "supertest";
import { app } from "../../app";

test('should respond with details about the current user', async () => {
    const cookie = await global.signin('a@b.com');

    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie)
        .send()
        .expect(200);

    expect(response.body.currentUser.email).toEqual('a@b.com');
});

test('should respond with null if not authenticated', async () => {
    const response = await request(app)
        .get('/api/users/currentuser')
        .expect(200);

    expect(response.body.currentUser).toBeNull();
})