import { Request, Response, NextFunction } from 'express';
import { Errors } from '../errors/errors';

        export function validateCreateTrack(
            req: Request,
            _res: Response,
            next: NextFunction,
        ) {
            const body = req.body;
            const title = body.title;
            const artist = body.artist

            if (body.title === null || body.title === undefined) {
                throw Errors.validation('body is required');
            }

            if (typeof body !== 'object' || Array.isArray(body)) {
                throw Errors.validation("body must be an object");
            }

            if (title === undefined) {
                throw Errors.validation('title is required');
            }

            if (typeof title !== 'string') {
                throw Errors.validation('title must be a string');
            }

            if (title.trim().length === 0) {
                throw Errors.validation('title must not be empty');
            }

            if (artist === undefined) {
                throw Errors.validation('artist is required');
            }

            if (typeof artist !== 'string') {
                throw Errors.validation('artist must be a string');
            }

            if (artist.trim().length === 0) {
                throw Errors.validation('artist must not be empty');
            }

            next()
        }





