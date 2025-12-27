import { Router } from "express";
import { Errors } from "../errors/errors";
import { CreateTrackDto } from "../services/track.service";
import { createTracks } from "../services/track.service";

const router = Router();

router.post("/", (req, res, next) => {
    try {
        const body = req.body as CreateTrackDto;

        // validation
        if (!body.title || typeof body.title !== "string") {
            throw Errors.validation("title is required");
        }

        if (!body.artist || typeof body.artist !== "string") {
            throw Errors.validation("artist is required");
        }

        // business logic
        const track = createTracks(body);

        // success response
        res.status(201).json(track);
    } catch (err) {
        next(err);
    }
});

export default router;

