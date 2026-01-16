import {AppError} from './app-error';
import {HTTP_STATUS} from './http-status';
import {ERROR_CODES} from './error-codes';


export const Errors = {
    notFound(message: string) {
        return new AppError(
            HTTP_STATUS.NOT_FOUND,
            ERROR_CODES.TRACK_NOT_FOUND,
            message
        )
    },
    validation(message: string) {
        return new AppError(
            HTTP_STATUS.BAD_REQUEST,
            ERROR_CODES.VALIDATION_ERROR,
            message
        );
    }

}