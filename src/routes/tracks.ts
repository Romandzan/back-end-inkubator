import { Router } from "express";
import { validateCreateTrack } from '../middlewares/validate-create-track'
import { validateUpdateTrack } from '../middlewares/validate-update-track'
import { asyncHandler } from '../middlewares/async-handler'
import { createTrack, deleteTrackById, getTracks, getTrackById, updateTrack, patchTrackById } from '../services/track.service';
import { Errors } from "../errors/errors";

const router = Router()

router.post(
    '/',
    validateCreateTrack,
    asyncHandler(async (req, res) => {
        const track = await createTrack(req.body);
        res.status(201).json(track);
    }),
)

router.get(
    '/',
    asyncHandler(async (req, res) => {
        const track = await getTracks();
        res.status(200).json(track);
    })
)

router.get(
    '/:id',
    asyncHandler(async (req, res) => {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            throw Errors.validation('id must be a number');
        }

        const track = await getTrackById(id);
        res.status(200).json(track);
    })
);

router.delete(
    '/:id',
    asyncHandler(async (req, res) => {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            throw Errors.validation('id must be a number');
        }
        await deleteTrackById(id);

        res.status(204).send();
    })
);

router.put(
    '/:id',
    validateUpdateTrack,
    asyncHandler(async (req, res) => {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            throw Errors.validation('id must be a number');
        }
        const updatedTrack = await updateTrack(id, req.body)

        res.status(200).json(updatedTrack);
    })
);

router.patch(
    '/:id',
    asyncHandler(async (req, res) => {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            throw Errors.validation('id must be a number');
        }
        const updatedTrack = await patchTrackById(id, req.body)

        res.status(200).json(updatedTrack);
    })
);


export default router;