import { TrackRepository } from "./track.repository.interface";
import { Track } from "../types/track.types";

const tracks: Track[] = [
    {id: 1, title: "Track 1", artist: "string"},
    {id: 2, title: "Track 1", artist: "string"},
    {id: 3, title: "Track 1", artist: "string"},
    {id: 4, title: "Track 1", artist: "string"},
]

let nextId = 5


export const trackRepository: TrackRepository = {
    async getAll() {
        return tracks;
    },

    async findById(id: number) {
        return tracks.find(t => t.id === id) ?? null;
    },

    async create(data) {
        const newTrack = {
            id: nextId++,
            title: data.title,
            artist: data.artist,
        };

        tracks.push(newTrack);
        return newTrack;
    },

    async update(id, data) {
        const index = tracks.findIndex(t => t.id === id);
        if (index === -1) return null;

        tracks[index] = {
            ...tracks[index],
            title: data.title,
            artist: data.artist,
        };

        return tracks[index];
    },

    async patch(id, data) {
        const index = tracks.findIndex(t => t.id === id);
        if (index === -1) return null;

        tracks[index] = {
            ...tracks[index],
            ...data,
        };

        return tracks[index];
    },

    async delete(id) {
        const index = tracks.findIndex(t => t.id === id);
        if (index === -1) return false;

        tracks.splice(index, 1);
        return true;
    },
};


