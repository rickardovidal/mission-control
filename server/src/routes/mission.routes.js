import { Router } from 'express';

import { getAllMissions } from '../controllers/mission.controller.js';

const missionRouter = Router();

missionRouter.get('/', getAllMissions);

export default missionRouter;
