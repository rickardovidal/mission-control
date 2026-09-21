
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import robotRouter from './routes/robot.routes.js';
import { errorHandler } from './middleware/error-handler.js';

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
app.use(errorHandler);

export default app;

/*

express() cria a aplicação;
helmet() adiciona cabeçalhos de segurança;
cors() permite pedidos apenas do endereço do frontend indicado no .env;
express.json() permite receber JSON;
GET /api/health será o nosso primeiro endpoint;
export default app permite iniciar esta aplicação noutro ficheiro.


*/