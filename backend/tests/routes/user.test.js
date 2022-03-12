import request from 'supertest';
import { app } from '../../app';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

afterEach(async () => {
  await prisma.user.deleteMany();
});

afterAll(async () => await prisma.$disconnect());

describe('User Endpoints', () => {
  it('should create a new user', async () => {
    const res = await request(app).post('/api/users').send({
      name: 'hamada',
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });
});
