import request from 'supertest';
import app from '../src/shared/infra/http/server';

describe('User', () => {
  it('should be able refresh token', async () => {
    const user = { name: 'John Doe' };

    const response = await request(app).post('/users').send({
      name: user.name,
    });

    expect(response.status).toBe(200);
  });
});
