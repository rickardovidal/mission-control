import { Operator } from '../models/index.js';

export async function getAllOperators(_request, response) {
    const operators = await Operator.findAll({
        order: [['operatorId', 'ASC']],
    });

    return response.status(200).json({
        data: operators,
    });
}
