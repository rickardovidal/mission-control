
import { validationResult } from 'express-validator';

export function validateRequest (request, response, next){
    const errors =  validationResult(request);


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

/*
este middleware

recolhe os resultados dos validadores executados anteriormente;
se existirem erros, interrompe o pedido com HTTP 422;
devolve os detalhes necessários para corrigir os dados;
se estiver tudo válido, chama next() e permite chegar ao controller.

*/