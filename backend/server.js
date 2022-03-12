import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { userRouter, exerciseRouter } from './routes';
import { errorHandlingMidleware } from './helpers';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/users/:user_id/exercises', exerciseRouter);

app.use(errorHandlingMidleware);

app.listen(port, () => console.log(`server is running on port: ${port}`));
