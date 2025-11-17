export interface MediaDetails {
    title: string;
    date: string;
    overview: string;
    image: string;
    rating: number;
    genres: string[]; // Drama, Mystery
    creators?: string[],
    production?: string[],
    status: string,
    originalLanguage: string,
    popularity: number,
    tagline: string,
    seasons?: number,
    episodes?: number
}