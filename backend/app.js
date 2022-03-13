import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { userRouter, exerciseRouter } from './routes';
import { errorHandler } from './helpers';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/exercises', exerciseRouter);
app.use('/api/users/:userId/exercises', exerciseRouter);

app.use(errorHandler);

export { app };
