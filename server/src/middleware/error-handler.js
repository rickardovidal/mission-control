
import { UniqueConstraintError, ValidationError } from 'sequelize';

export function errorHandler(error, _request, response, _next) {
    if (error.statusCode) {
        return response.status(error.statusCode).json({
            error: {
                code: error.code || 'REQUEST_ERROR',
                message: error.message,
            },
        });
    }

    if (error instanceof UniqueConstraintError) {
        return response.status(409).json({
            error: {
                code: 'RESOURCE_CONFLICT',
                message: 'A resource with the same unique value already exists',
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
            message: 'An unexpected error occurred',
        },
    });
}
