"use client";

import Image from "next/image";
import {useMediaDetails} from "@/app/hooks/useMediaDetails";
import {moviesService} from "@/lib/api/movieService";
import {useEffect, useState} from "react";
import {Video} from "@/models/Video";

interface Props {
    id: string;
    type: "movie" | "tv";
}

export default function DetailedCard({ id, type }: Props) {
    const { details, loading } = useMediaDetails(id, type);
    const [trailer, setTrailer] = useState<Video | null>(null);

    useEffect(() => {
        async function fetchTrailer() {
            try {
                const trailers =
                    type === "movie"
                        ? await moviesService.getMovieTrailer(id)
                        : await moviesService.getTvShowTrailer(id);

                setTrailer(trailers.length > 0 ? trailers[0] : null);

            } catch (err) {
                setTrailer(null);
            }
        }

        fetchTrailer();
    }, [id, type]);

    if (loading) return <p>Loading...</p>;
    if (!details) return <p>Error</p>;

    return (
    <div className="max-w-4xl mx-auto p-4">
{trailer ? (
    <div className="w-full mb-6">
        <iframe
            className="rounded-lg w-full h-80 md:h-96"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            allowFullScreen
        />
    </div>
) : (
    <div className="w-full mb-6">
        <Image
            src={`https://image.tmdb.org/t/p/w780${details.image}`}
            alt={details.title}
            width={1000}
            height={500}
            className="rounded-lg object-cover w-full h-80 md:h-96"
        />
    </div>
)}

<div className="space-y-2">
    <h1 className="text-3xl font-bold">{details.title}</h1>
    <p className="text-gray-500">📅 {details.date}</p>
    <p className="text-yellow-500 font-semibold">⭐ {details.rating}/10</p>
    <p className="text-gray-700 leading-relaxed">{details.overview}</p>
</div>
</div>
);
}