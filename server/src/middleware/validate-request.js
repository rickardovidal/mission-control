
import { validationResult } from 'express-validator';

export function validateRequest (request, response, next){
    const errors = validationResult(request);

    if(!errors.isEmpty()){
        return response.status(422).json({
            error: {
                code: 'VALIDATION_ERROR',
                message: 'Invalid request data',
                details: errors.array(),
            },
        });
    }
    return next();
}
