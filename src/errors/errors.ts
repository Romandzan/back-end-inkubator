import {AppError} from './app-error';
import {HTTP_STATUS} from './http-status';
import {ERROR_CODES} from './error-codes';


export const Errors = {
    validation(message: string): AppError {
        return new AppError(
            HTTP_STATUS.BAD_REQUEST,
            ERROR_CODES.VALIDATION_ERROR,
            message
        );

    }
}