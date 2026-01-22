import { describe, it, expect, beforeEach } from "vitest";
import {
    getTrackById,
    createTrack,
    patchTrackById,
    updateTrack,
    deleteTrackById,
    __setTrackRepoForTests,
} from "./track.service";
import type { TrackRepository } from "../repositories/track.repository.interface";

describe("track.service - getTrackById", () => {
    let mockRepo: TrackRepository;

    beforeEach(() => {
        mockRepo = {
            create: async () => {
                throw new Error("not used");
            },
            update: async () => {
                throw new Error("not used");
            },
            patch: async () => {
                throw new Error("not used");
            },
            delete: async () => false,
            getAll: async () => [],
            findById: async () => null,
        };

        __setTrackRepoForTests(mockRepo);
    });

    it("throws validation error for invalid id", async () => {
        await expect(getTrackById(-1)).rejects.toThrow("id");
    });

    it("throws notFound error if track does not exist", async () => {
        await expect(getTrackById(1)).rejects.toThrow("track not found");
    });

    it("returns track if found", async () => {
        const track = {
            id: 1,
            title: "Song",
            artist: "Artist",
        };

        mockRepo.findById = async () => track;

        const result = await getTrackById(1);

        expect(result).toEqual(track);
    });
});

describe("track.service - createTrack", () => {
    let mockRepo: TrackRepository;

    beforeEach(() => {
        mockRepo = {
            create: async () => {
                throw new Error("not mocked");
            },
            update: async () => {
                throw new Error("not used");
            },
            patch: async () => {
                throw new Error("not used");
            },
            delete: async () => false,
            getAll: async () => [],
            findById: async () => null,
        };

        __setTrackRepoForTests(mockRepo);
    });

    it("throws error if title is not a string", async () => {
        await expect(
            createTrack({title: 123 as any, artist: "Artist"})
        ).rejects.toThrow();
    });

    it("throws error if title is empty", async () => {
        await expect(
            createTrack({title: "", artist: "Artist"})
        ).rejects.toThrow();
    });

    it("throws error if artist is not a string", async () => {
        await expect(
            createTrack({title: "Song", artist: 123 as any})
        ).rejects.toThrow();
    });

    it("throws error if artist is empty", async () => {
        await expect(
            createTrack({title: "Song", artist: ""})
        ).rejects.toThrow();
    });

    it("creates track with trimmed fields", async () => {
        const createdTrack = {
            id: 1,
            title: "Song",
            artist: "Artist",
        };

        mockRepo.create = async (data) => {
            return {id: 1, ...data};
        };

        const result = await createTrack({
            title: "  Song  ",
            artist: "  Artist  ",
        });

        expect(result).toEqual(createdTrack);
    });
});

describe("track.service - patchTrackById", () => {
    let mockRepo: TrackRepository;

    beforeEach(() => {
        mockRepo = {
            create: async () => {
                throw new Error("not used");
            },
            update: async () => {
                throw new Error("not used");
            },
            patch: async () => {
                throw new Error("not mocked");
            },
            delete: async () => false,
            getAll: async () => [],
            findById: async () => null,
        };

        __setTrackRepoForTests(mockRepo);
    });

    it("throws validation error for invalid id", async () => {
        await expect(
            patchTrackById(-1, { title: "Song" })
        ).rejects.toThrow();
    });

    it("throws error if title is invalid", async () => {
        await expect(
            patchTrackById(1, { title: "" })
        ).rejects.toThrow();
    });

    it("throws error if artist is invalid", async () => {
        await expect(
            patchTrackById(1, { artist: "" })
        ).rejects.toThrow();
    });

    it("updates only title if only title is provided", async () => {
        mockRepo.patch = async (_id, data) => {
            return {
                id: 1,
                title: data.title ?? "Old title",
                artist: "Old artist",
            };
        };

        const result = await patchTrackById(1, {
            title: "  New title  ",
        });

        expect(result).toEqual({
            id: 1,
            title: "New title",
            artist: "Old artist",
        });
    });

    it("updates only artist if only artist is provided", async () => {
        mockRepo.patch = async (_id, data) => {
            return {
                id: 1,
                title: "Old title",
                artist: data.artist ?? "Old artist",
            };
        };

        const result = await patchTrackById(1, {
            artist: "  New artist  ",
        });

        expect(result).toEqual({
            id: 1,
            title: "Old title",
            artist: "New artist",
        });
    });

    it("throws notFound error if track does not exist", async () => {
        mockRepo.patch = async () => null;

        await expect(
            patchTrackById(999, { title: "Song" })
        ).rejects.toThrow("track not found");
    });
});

describe("track.service - updateTrack", () => {
    let mockRepo: TrackRepository;

    beforeEach(() => {
        mockRepo = {
            create: async () => {
                throw new Error("not used");
            },
            update: async () => {
                throw new Error("not mocked");
            },
            patch: async () => {
                throw new Error("not used");
            },
            delete: async () => false,
            getAll: async () => [],
            findById: async () => null,
        };

        __setTrackRepoForTests(mockRepo);
    });

    it("throws validation error for invalid id", async () => {
        await expect(
            updateTrack(-1, { title: "Song", artist: "Artist" })
        ).rejects.toThrow();
    });

    it("throws error if title is missing", async () => {
        await expect(
            updateTrack(1, { artist: "Artist" } as any)
        ).rejects.toThrow();
    });

    it("throws error if artist is missing", async () => {
        await expect(
            updateTrack(1, { title: "Song" } as any)
        ).rejects.toThrow();
    });

    it("throws error if title is empty", async () => {
        await expect(
            updateTrack(1, { title: "", artist: "Artist" })
        ).rejects.toThrow();
    });

    it("throws error if artist is empty", async () => {
        await expect(
            updateTrack(1, { title: "Song", artist: "" })
        ).rejects.toThrow();
    });

    it("updates track when both fields are valid", async () => {
        mockRepo.update = async (_id, data) => {
            return {
                id: 1,
                title: data.title,
                artist: data.artist,
            };
        };

        const result = await updateTrack(1, {
            title: "  New title  ",
            artist: "  New artist  ",
        });

        expect(result).toEqual({
            id: 1,
            title: "New title",
            artist: "New artist",
        });
    });

    it("throws notFound error if track does not exist", async () => {
        mockRepo.update = async () => null;

        await expect(
            updateTrack(999, { title: "Song", artist: "Artist" })
        ).rejects.toThrow("track not found");
    });


});

describe("track.service - deleteTrackById", () => {
    let mockRepo: TrackRepository;

    beforeEach(() => {
        mockRepo = {
            create: async () => {
                throw new Error("not used");
            },
            update: async () => {
                throw new Error("not used");
            },
            patch: async () => {
                throw new Error("not used");
            },
            delete: async () => {
                throw new Error("not mocked");
            },
            getAll: async () => [],
            findById: async () => null,
        };

        __setTrackRepoForTests(mockRepo);
    });

    it("throws validation error for invalid id", async () => {
        await expect(
            deleteTrackById(0)
        ).rejects.toThrow();
    });

    it("throws notFound error if track does not exist", async () => {
        mockRepo.delete = async () => false;

        await expect(
            deleteTrackById(999)
        ).rejects.toThrow("track not found");
    });

    it("resolves successfully when track is deleted", async () => {
        mockRepo.delete = async () => true;

        await expect(
            deleteTrackById(1)
        ).resolves.toBeUndefined();
    });


});




