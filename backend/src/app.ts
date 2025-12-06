import express from 'express';
import cors from 'cors';
import eventsRouter from './routes/events';
import usersRouter from './routes/users';
import analyticsRouter from './routes/analytics';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './utils/swagger';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/events', eventsRouter);
app.use('/api/users', usersRouter);
app.use('/api/analytics', analyticsRouter);

export default app;
