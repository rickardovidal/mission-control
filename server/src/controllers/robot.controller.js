
import { Robot } from '../models/index.js';

export async function getAllRobots(_request, response) {
    const robots = await Robot.findAll({
        order: [['robotId', 'ASC']],
    });

    return response.status(200).json({
        data: robots,
    });
}

export async function getRobotById(request, response) {
    const robot = await Robot.findByPk(request.params.robotId);

    if (!robot) {
        const error = new Error('Robot not found');
        error.statusCode = 404;
        error.code = 'ROBOT_NOT_FOUND';
        throw error;
    }

    return response.status(200).json({
        data: robot,
    });
}

export async function createRobot(request, response) {
    const { name, model, serialNumber, status, batteryLevel } = request.body;
    const robot = await Robot.create({
        name,
        model,
        serialNumber,
        status,
        batteryLevel,
    });

    return response.status(201).json({
        data: robot,
    });
}
