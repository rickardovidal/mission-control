
import { Router } from 'express';

import { createRobot, getAllRobots, getRobotById } from '../controllers/robot.controller.js';
import { validateRequest } from '../middleware/validate-request.js';
import { createRobotValidator, robotIdValidator } from '../validators/robot.validator.js';

const robotRouter = Router();

robotRouter.get('/', getAllRobots);
robotRouter.get('/:robotId', robotIdValidator, validateRequest, getRobotById);
robotRouter.post('/', createRobotValidator, validateRequest, createRobot);

export default robotRouter;
