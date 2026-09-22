import { Router } from 'express';

import { getAllOperators } from '../controllers/operator.controller.js';

const operatorRouter = Router();

operatorRouter.get('/', getAllOperators);

export default operatorRouter;
