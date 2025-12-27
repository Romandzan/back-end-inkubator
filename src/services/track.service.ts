export interface Tracks {
    id: number;
    title: string;
    artist: string;
}

export interface CreateTrackDto {
    id: number;
    title: string;
    artist: string;
}

interface UpdateTrackDto {
    id: number;
    title: string;
    artist: string;
}

const track: Tracks[] = [
    {id: 1, title: "Track 1", artist: "string"},
    {id: 1, title: "Track 1", artist: "string"},
    {id: 1, title: "Track 1", artist: "string"},
    {id: 1, title: "Track 1", artist: "string"},
]

let nextId = 5

export function createTracks(dto: CreateTrackDto) {
    const Tracks = {
        id: nextId,
        title: dto.title,
        artist: dto.artist,
    };
    nextId++
    track.push(Tracks);
    return track;
}
