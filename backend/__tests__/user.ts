import request from 'supertest';
import app from '../../src/app';

import truncate from './util/truncate';
import factory from './util/factories';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able refresh token', async () => {
    await factory.create('Action');
    await factory.create('Achievement');

    const user = await factory.attrs('User');

    await request(app).post('/users').send({
      name: user.name,
      email: user.email,
      password: user.password,
    });

    const responseSession = await request(app).post('/sessions').send({
      email: user.email,
      password: user.password,
    });

    const response = await request(app)
      .get('/token')
      .set('Authorization', `Bearer ${responseSession.body.token}`);

    expect(response.status).toBe(200);
  });

  it('should not be able to refresh token with when user is not found', async () => {
    const response = await request(app).put('/token');

    expect(response.status).toBe(401);
  });
});
