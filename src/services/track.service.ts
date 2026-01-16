import { trackRepository } from "../repositories/track.repository";
import {Errors} from "../errors/errors";

import {
    CreateTrackDto,
    UpdateTrackDto,
} from "../types/track.types";

export async function patchTrackById(
    id: number,
    data: Partial<UpdateTrackDto>
) {
    if (data.title !== undefined) {
        if (typeof data.title !== "string") {
            throw Errors.validation("title must be a string");
        }
        if (data.title.trim().length === 0) {
            throw Errors.validation("title must not be empty");
        }
    }

    if (data.artist !== undefined) {
        if (typeof data.artist !== "string") {
            throw Errors.validation("artist must be a string");
        }
        if (data.artist.trim().length === 0) {
            throw Errors.validation("artist must not be empty");
        }
    }

    const updated = await trackRepository.patch(id, {
        title: data.title?.trim(),
        artist: data.artist?.trim(),
    });

    if (!updated) {
        throw Errors.notFound("track not found");
    }

    return updated;
}


export async function updateTrack(id: number, data: UpdateTrackDto) {
    const { title, artist } = data;

    if (typeof title !== "string") {
        throw Errors.validation("title must be a string");
    }
    if (title.trim().length === 0) {
        throw Errors.validation("title must not be empty");
    }
    if (typeof artist !== "string") {
        throw Errors.validation("artist must be a string");
    }
    if (artist.trim().length === 0) {
        throw Errors.validation("artist must not be empty");
    }

    const updated = await trackRepository.patch(id, {
        title: title.trim(),
        artist: artist.trim(),
    });

    if (!updated) {
        throw Errors.notFound("track not found");
    }

    return updated;
}

export async function deleteTrackById(id: number) {
    const deleted = await trackRepository.delete(id);

    if (!deleted) {
        throw Errors.notFound("track not found");
    }
}

export async function getTrackById(id: number) {
    const track = await trackRepository.delete(id);

    if (!track) {
        throw Errors.notFound("track not found");
    }

    return track;
}

export async function getTracks() {
    return trackRepository.getAll();
}

export async function createTrack(data: CreateTrackDto) {
    const { title, artist } = data;

    if (typeof title !== "string") {
        throw Errors.validation("title must be a string");
    }
    if (title.trim().length === 0) {
        throw Errors.validation("title must not be empty");
    }
    if (typeof artist !== "string") {
        throw Errors.validation("artist must be a string");
    }
    if (artist.trim().length === 0) {
        throw Errors.validation("artist must not be empty");
    }

    return trackRepository.create({
        title: title.trim(),
        artist: artist.trim(),
    });
}


