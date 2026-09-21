
import { createRobot as createRobotService, findAllRobots, findRobotById } from '../services/robot.service.js';

/*

Usamos createRobotService apenas para distinguir:
- createRobot — função do controller;
- createRobotService — função que grava na base de dados.


*/

export async function getAllRobots(_request, response){
    const robots = await findAllRobots();

    return response.status(200).json({
        data: robots,
    });
}

export async function getRobotById(request, response){
    const robot = await findRobotById(request.params.robotId)

    return response.status(200).json({
        data: robot,
    });

    //request.params.robotId receberá o valor colocado no endereço. Por exemplo:

    /**
     
    GET /api/robots/2          
    request.params.robotId === '2'

     */
}

export async function createRobot(request, response) {
    const robot = await createRobotService(request.body);

    return response.status(201).json({
        data: robot,
    });
}



/*

- o controller não utiliza diretamente o modelo Sequelize;
- chama o service;
- define o código HTTP 200;
- devolve os robots dentro da propriedade data;
- _request tem underscore porque este pedido não necessita de parâmetros.
Não colocamos try/catch em cada controller. Como usamos Express 5, os erros assíncronos serão encaminhados para o middleware central de erros que criaremos.


*/