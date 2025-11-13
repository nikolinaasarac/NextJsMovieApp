import { useEffect, useState } from "react";
import { moviesService } from "@/lib/api/movieService";
import { Movie } from "@/models/Movie";
import { TvShow } from "@/models/TvShow";
import {MediaDetails} from "@/models/MediaDetails";



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