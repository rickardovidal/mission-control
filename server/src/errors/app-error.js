
export default class AppError extends Error {
    constructor (message, statusCode = 500, code = 'INTERNAL_ERROR'){
        super(message);

        this.name = 'AppError';
        this.statusCode = statusCode;
        this.code = code;
    }

    //Esta classe prolonga o erro normal do JavaScript com informação útil para a API.
}