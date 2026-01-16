import { Track } from "../types/track.types";

export interface TrackRepository {
    getAll(): Promise<Track[]>;

    findById(id: number): Promise<Track | null>;

    create(data: {
        title: string;
        artist: string;
    }): Promise<Track>;

    update(
        id: number,
        data: {
            title: string;
            artist: string;
        }
    ): Promise<Track | null>;

    patch(
        id: number,
        data: {
            title?: string;
            artist?: string;
        }
    ): Promise<Track | null>;

    delete(id: number): Promise<boolean>;
}
