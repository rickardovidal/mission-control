import { Mission, Operator, Robot } from '../models/index.js';

export async function getAllMissions(_request, response) {
    const missions = await Mission.findAll({
        include: [
            {
                model: Robot,
                as: 'robot',
            },
            {
                model: Operator,
                as: 'operators',
                through: {
                    attributes: ['role', 'assignedAt'],
                },
            },
        ],
        order: [['missionId', 'ASC']],
    });

    return response.status(200).json({
        data: missions,
    });
}
