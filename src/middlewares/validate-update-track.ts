import { Request, Response, NextFunction } from 'express';
import { Errors } from '../errors/errors';

export function validateUpdateTrack(req: Request, _res: Response, next: NextFunction ) {
    const {title, artist} = req.body;

    if(typeof title === 'string') {
        throw Errors.validation('title must be a string');
    }
    if(title.trim().length === 0) {
        throw Errors.validation('title must not be empty');
    }
    if(typeof artist === 'string') {
        throw Errors.validation('artist must be a string');
    }
    if(artist.trim().length === 0) {
        throw Errors.validation('artist must not be empty');
    }
    next()
}