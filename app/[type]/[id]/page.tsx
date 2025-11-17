"use client";

import {notFound, useParams, useRouter} from "next/navigation";
import { Button } from "@/components/ui/button";
import DetailedCard from "@/components/DetailedCard";
import DetailedCardSkeleton from "@/components/skeleton/DetailedCardSkeleton";
import { useMediaDetails } from "@/app/hooks/useMediaDetails";
import { useEffect, useState } from "react";
import { moviesService } from "@/lib/api/movieService";
import { Video } from "@/models/Video";

export default function MediaDetails() {
    const params = useParams();
    const router = useRouter();

    const id = params.id?.toString();
    const type = params.type?.toString();
    const mediaType = type === "movies" ? "movie" : "tv";

    const { details, loading: detailsLoading } = useMediaDetails(id!, mediaType);
    const [trailer, setTrailer] = useState<Video | null>(null);
    const [loadingTrailer, setLoadingTrailer] = useState(true);

    useEffect(() => {
        async function fetchTrailer() {
            if (!id) return;
            setLoadingTrailer(true);
            try {
                const trailers =
                    mediaType === "movie"
                        ? await moviesService.getMovieTrailer(id)
                        : await moviesService.getTvShowTrailer(id);

                setTrailer(trailers.length > 0 ? trailers[0] : null);
            } catch {
                setTrailer(null);
            } finally {
                setLoadingTrailer(false);
            }
        }

        fetchTrailer();
    }, [id, mediaType]);

    const loading = detailsLoading || loadingTrailer || !details;

    if (!details && !detailsLoading) {
        notFound();
    }

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <Button onClick={() => router.back()} className="ml-4 mb-4 cursor-pointer">
                Back
            </Button>

            {loading ? (
                <DetailedCardSkeleton />
            ) : (
                <DetailedCard details={details} trailer={trailer} />
            )}
        </div>
    );
}