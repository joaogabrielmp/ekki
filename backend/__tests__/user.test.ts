import request from 'supertest';
import app from '@shared/infra/http/server';

describe('User', () => {
  it('/POST - should be able to create a user', async () => {
    const user = {
      cellphone: '99811223344',
      cpf: '11111111111',
      name: 'John Doe',
    };

    const response = await request(app).post('/users').send({
      cellphone: user.cellphone,
      cpf: user.cpf,
      name: user.name,
    });

    expect(response.status).toBe(200);
  });
});
