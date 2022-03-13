import request from 'supertest';
import { app } from '../../app';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


describe('Exercise Endpoints', () => {
    const users=[];
    beforeAll(async () => {
        const res1 = await request(app).post('/api/users').send({
            name: 'test1',
        });
        const res2 = await request(app).post('/api/users').send({
            name: 'test2',
        });
        users.push(res1.body, res2.body);
    });
    beforeEach(async () => await new Promise((r) => setTimeout(r, 300)));
    afterEach(async () => await prisma.exercise.deleteMany());
    afterAll(async () => await prisma.$disconnect());

    describe('POST Endpoint', () => {
        it('should successfully create a new exercise', async () => {
            const res = await request(app).post(`/api/users/${users[0].id}/exercises`).send({
                user_id:users[0].id,
                description: 'Test Exercise',
                date: '2050-01-01',
                duration: 2
            });
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('id');
        });

        it('should return 404 if user doesnt exist', async () => {
            const res = await request(app).post(`/api/users/99999/exercises`).send({
                user_id:99999,
                description: 'Test Exercise',
                date: '2050-01-01',
                duration: 2
            });
            expect(res.statusCode).toEqual(404);
            expect(res.body).not.toHaveProperty('id');
        });

        it('should return 422 if validation fails', async () => {
            const res = await request(app).post(`/api/users/${users[0].id}/exercises`).send({
                user_id:users[0].id,
                duration: 2
            });
            console.log(JSON.stringify(res))
            expect(res.statusCode).toEqual(422);
            expect(res.body).not.toHaveProperty('id');
        });
    });
    describe('DELETE Endpoint', () => {
        let exerciseRes;
        beforeEach(async () => {
             exerciseRes = await request(app).post(`/api/users/${users[0].id}/exercises`).send({
                user_id: users[0].id,
                description: 'Test Exercise',
                date: '2050-01-01',
                duration: 2
            });
        })

        it('should successfully delete an exercise', async () => {
             const res =await request(app).delete(`/api/users/${users[0].id}/exercises/${exerciseRes.body.id}`).send({});
            expect(res.statusCode).toEqual(200);
        });
        it('should return 404 if user is not found', async () => {
            const res =await request(app).delete(`/api/users/9999/exercises/${exerciseRes.body.id}`).send({});
            expect(res.statusCode).toEqual(404);
        });
    });
});
