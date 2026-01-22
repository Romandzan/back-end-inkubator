import { assertFieldIsValid, assertValidId, validateField, } from "./track.validation";
import type { TrackRepository } from "../repositories/track.repository.interface";
import { trackRepository } from "../repositories/track.repository";
import { Errors } from "../errors/errors";
import { CreateTrackDto, UpdateTrackDto, } from "../types/track.types";

let repo: TrackRepository = trackRepository;
export function __setTrackRepoForTests(nextRepo: TrackRepository) {
    repo = nextRepo;
}

export async function createTrack(data: CreateTrackDto) {
    const { title, artist } = data;

    assertFieldIsValid(validateField(title), "title");
    assertFieldIsValid(validateField(artist), "artist");

    return repo.create({
        title: title.trim(),
        artist: artist.trim(),
    });
}

export async function updateTrack(id: number, data: UpdateTrackDto) {
    assertValidId(id);

    const { title, artist } = data;

    assertFieldIsValid(validateField(title), "title");
    assertFieldIsValid(validateField(artist), "artist");

    const updated = await repo.update(id, {
        title: title.trim(),
        artist: artist.trim(),
    });

    if (!updated) {
        throw Errors.notFound("track not found");
    }

    return updated;
}

export async function patchTrackById(
    id: number,
    data: Partial<UpdateTrackDto>
) {
    assertValidId(id);

    if ("title" in data) {
        assertFieldIsValid(validateField(data.title), "title");
    }

    if ("artist" in data) {
        assertFieldIsValid(validateField(data.artist), "artist");
    }

    const updated = await repo.patch(id, {
        title: data.title?.trim(),
        artist: data.artist?.trim(),
    });

    if (!updated) {
        throw Errors.notFound("track not found");
    }

    return updated;
}

export async function deleteTrackById(id: number) {
    assertValidId(id);

    const deleted = await repo.delete(id);
    if (!deleted) {
        throw Errors.notFound("track not found");
    }
}

export async function getTrackById(id: number) {
    assertValidId(id);

    const track = await repo.findById(id);
    if (!track) {
        throw Errors.notFound("track not found");
    }

    return track;
}

export async function getTracks() {
    return repo.getAll();
}



