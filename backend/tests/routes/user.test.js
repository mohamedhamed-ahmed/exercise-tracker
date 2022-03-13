import request from 'supertest';
import { app } from '../../app';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

afterEach(async () => {
  await prisma.user.deleteMany();
});

afterAll(async () => await prisma.$disconnect());

describe('User Endpoints', () => {
  describe('POST Endpoint', () => {
    it('should create a new user', async () => {
      const res = await request(app).post('/api/users').send({
        name: 'test',
      });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('id');
    });

    it('should specify json in the content type header', async () => {
      const res = await request(app).post('/api/users').send({
        name: 'test',
      });
      expect(res.headers['content-type']).toEqual(expect.stringContaining('json'));
    });

    it('should return 422 if name is missing', async () => {
      const res = await request(app).post('/api/users').send({});
      expect(res.statusCode).toEqual(422);
      expect(res.body).not.toHaveProperty('id');
    });

    it('should return 400 if user already exists', async () => {
      const res1 = await request(app).post('/api/users').send({
        name: 'test',
      });
      const res2 = await request(app).post('/api/users').send({
        name: 'test',
      });
      expect(res1.statusCode).toEqual(201);
      expect(res1.body).toHaveProperty('id');

      expect(res2.statusCode).toEqual(400);
      expect(res2.body).not.toHaveProperty('id');
    });
  });

  describe.only('GET Endpoint', () => {
    const users = [];
    beforeEach(async () => {
      const user1 = await request(app).post('/api/users').send({
        name: 'test1',
      });
      const user2 = await request(app).post('/api/users').send({
        name: 'test2',
      });
      users.push(user1, user2);
    });

    it('should return all users', async () => {
      const res = await request(app).get('/api/users').send();
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toEqual(2);
    });

    xit('should return a specific users', async () => {
      const res = await request(app).get(`/api/users/${users[0].id}`).send();
      expect(res.statusCode).toEqual(200);
    });
  });
});
