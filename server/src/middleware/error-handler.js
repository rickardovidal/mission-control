
import { UniqueConstraintError, ValidationError } from "sequelize";
import AppError from "../errors/app-error.js";

export function errorHandler(error, _request, response, _next) {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            error: {
                code: error.code,
                message: error.message
            },
        });
    }

    if (error instanceof UniqueConstraintError) {
    return response.status(409).json({
        error: {
            code: 'RESOURCE_CONFLICT',
            message: 'A resource with the same unique value already exists',

            //um serialNumber ou email repetido devolve 409 Conflict;
        },
    });
}

if (error instanceof ValidationError) {
    return response.status(422).json({
        error: {
            code: 'MODEL_VALIDATION_ERROR',
            message: 'The provided data is invalid',
        },
    });
}

    console.error(error);

    return response.status(500).json({
        error: {
            code: 'INTERNAL_ERROR',
            message: 'An unexpect error occurred',
        },
    });
}


/* 

um serialNumber ou email repetido devolve 409 Conflict;
uma validação do modelo Sequelize devolve 422;
nenhum detalhe interno da base de dados é exposto.

*/