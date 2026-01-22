import { Request, Response, NextFunction } from "express";
import { Errors } from "../errors/errors";

export function validateCreateTrack(
    req: Request,
    _res: Response,
    next: NextFunction
) {
    const body = req.body;

    if (body === null || body === undefined) {
        throw Errors.validation("body is required");
    }

    if (typeof body !== "object" || Array.isArray(body)) {
        throw Errors.validation("body must be an object");
    }

    if (!("title" in body)) {
        throw Errors.validation("title is required");
    }

    if (!("artist" in body)) {
        throw Errors.validation("artist is required");
    }

    next();
}






