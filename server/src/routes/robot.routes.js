
import { Router } from 'express';

import { createRobot, getAllRobots, getRobotById } from '../controllers/robot.controller.js';

import { validateRequest } from '../middleware/validate-request.js';
import { createRobotValidator, robotIdValidator } from '../validators/robot.validator.js';

const robotRouter = Router();

robotRouter.get('/', getAllRobots);
robotRouter.get('/:robotId', robotIdValidator, validateRequest, getRobotById, );
robotRouter.post('/', createRobotValidator, validateRequest, createRobot,);

//validar robotId → verificar os resultados → executar controller

export default robotRouter;


/*
Router() cria um pequeno conjunto de rotas dedicado aos robots;
get('/', ...) responde a pedidos GET;
o / será combinado com o prefixo /api/robots;
portanto, o endereço final será GET /api/robots.

*/