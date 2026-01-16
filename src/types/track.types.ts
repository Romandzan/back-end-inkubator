export interface Track {
    id: number;
    title: string;
    artist: string;
}

export interface CreateTrackDto {
    title: string;
    artist: string;
}

export interface UpdateTrackDto {
    title: string;
    artist: string;
}