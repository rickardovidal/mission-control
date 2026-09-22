
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { errorHandler } from './middleware/error-handler.js';
import missionRouter from './routes/mission.routes.js';
import operatorRouter from './routes/operator.routes.js';
import robotRouter from './routes/robot.routes.js';

const app = express();

app.use(helmet());

app.use(
    cors({
        origin: process.env.CLIENT_URL,
    }),
);

app.use(express.json());

app.get('/api/health', (request, response) => {
    response.status(200).json({
        status: 'ok',
        message: 'Mission Control API is running',
    });
});

app.use('/api/robots', robotRouter);
app.use('/api/operators', operatorRouter);
app.use('/api/missions', missionRouter);
app.use(errorHandler);

export default app;
