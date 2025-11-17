import { useEffect, useState } from "react";
import { moviesService } from "@/lib/api/movieService";
import { Movie } from "@/models/Movie";
import { TvShow } from "@/models/TvShow";
import {MediaDetails} from "@/models/MediaDetails";
import {notFound} from "next/navigation";



export function useMediaDetails(id: string, type: "movie" | "tv") {
    const [details, setDetails] = useState<MediaDetails | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMedia = async () => {
            try {
                let data: Movie | TvShow;
                if (type === "movie") {
                    data = await moviesService.getMovie(id);
                } else {
                    data = await moviesService.getTvShow(id);
                }

                const media: MediaDetails = {
                    title: "title" in data ? data.title : data.name,
                    date: "release_date" in data ? data.release_date : data.first_air_date,
                    overview: data.overview,
                    image: data.backdrop_path || data.poster_path,
                    rating: data.vote_average,
                    genres: data.genres.map(g => g.name),
                    creators: "created_by" in data ? data.created_by.map(c => c.name) : undefined,
                    production: "production_companies" in data ?
                        data.production_companies.map(p => p.name) : undefined,
                    status: data.status,
                    originalLanguage: data.original_language,
                    popularity: data.popularity,
                    tagline: data.tagline,
                    seasons: "seasons" in data ? data.seasons.length : undefined,
                    episodes: "seasons" in data && Array.isArray(data.seasons)
                        ? data.seasons.reduce((sum, s) => sum + (s.episode_count || 0), 0)
                        : undefined,
                };

                setDetails(media);
            } catch (error) {
                console.error("Error: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMedia();
    }, [id, type]);


    return { details, loading };
}