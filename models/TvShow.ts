export interface TvShow {
    id: number;
    name: string;
    original_name: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    first_air_date: string;
    vote_average: number;
    vote_count: number;
    popularity: number;
    genre_ids: number[];
    origin_country: string[];
    original_language: string;
    genres: {
        id: number;
        name: string;
    }[]
    created_by: {
        id: number
        credit_id: string
        name: string
        original_name: string
        gender: number
        profile_path: string
    }[]
    status: string;
    tagline: string,
    seasons: {
        air_date: string
        episode_count: number
        id: number
        name: string
        overview: string
        poster_path: string
        season_number: number
        vote_average: number
    }[],
    episodes: number
}