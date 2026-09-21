
import { Robot } from '../models/index.js'
import AppError from '../errors/app-error.js'

export async function findAllRobots(){
    return Robot.findAll({
        order: [['robotId', 'ASC']]
    });
}

export async function findRobotById(robotId){
    const robot = await Robot.findByPk(robotId);

    if (!robot) {
        throw new AppError(
            'Robot not found',
            404,
            'ROBOT_NOT_FOUND',
        );
    }
    return robot;
}

export async function createRobot({
    name,
    model,
    serialNumber,
    status,
    batteryLevel,
}) {
    return Robot.create({
        name,
        model,
        serialNumber,
        status,
        batteryLevel,
    });
}


/*

findAllRobots()
    → Robot.findAll()
    → SELECT através do Sequelize
    → lista de robots

    async indica que a função realiza uma operação assíncrona;
Robot.findAll() substitui o SELECT escrito manualmente;
order ordena os robots pelo identificador;
não usamos SQL direto.


-------------------------------------------------------------------------

findByPk() procura pela chave primária;
se não encontrar, lança o nosso AppError;
esse erro chegará automaticamente ao errorHandler;
o service continua sem conhecer request ou response.

*/