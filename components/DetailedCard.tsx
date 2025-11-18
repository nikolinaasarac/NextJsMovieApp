"use client";

import Image from "next/image";
import { Video } from "@/models/Video";
import { MediaDetails } from "@/models/MediaDetails";
import {Section} from "@/components/Section";
import {InfoBadge} from "@/components/InfoBadge";

interface Props {
    details: MediaDetails;
    trailer: Video | null;
}

export default function DetailedCard({ details, trailer }: Props) {
    return (
        <div className="max-w-5xl mx-auto p-6 space-y-8">

            <div className="rounded-xl overflow-hidden shadow-lg w-full aspect-video relative">
                {trailer ? (
                    <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${trailer.key}`}
                        allowFullScreen
                    />
                ) : (
                    <Image
                        src={details.image ? `https://image.tmdb.org/t/p/w780${details.image}` : "/noImagePlaceholder.jpg"}
                        alt={details.title}
                        fill
                        className="object-cover"
                        sizes="100vw"
                    />
                )}
            </div>

            <div className="space-y-2">
                {details.tagline && (
                    <p className="text-gray-400 italic text-lg">{details.tagline}</p>
                )}
                <h1 className="text-4xl font-bold tracking-tight">{details.title}</h1>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                {details.date && <InfoBadge label="Release" value={details.date} />}
                {details.rating && <InfoBadge label="Rating" value={`${details.rating.toFixed(1)}/10`} />}
                {details.status && <InfoBadge label="Status" value={details.status} />}
                {details.originalLanguage && <InfoBadge label="Language" value={details.originalLanguage} />}
                {details.popularity !== undefined && <InfoBadge label="Popularity" value={details.popularity.toString()} />}
                {details.seasons && <InfoBadge label="Seasons" value={`${details.seasons}`} />}
                {details.episodes && <InfoBadge label="Episodes" value={`${details.episodes}`} />}
            </div>

            {details.genres && (
                <Section title="Genres">
                    <div className="flex gap-2 flex-wrap">
                        {details.genres.map(g => (
                            <span
                                key={g}
                                className="px-3 py-1 bg-gray-800 text-white text-xs rounded-full"
                            >
                                {g}
                            </span>
                        ))}
                    </div>
                </Section>
            )}

            {details.creators && (
                <Section title="Creators">
                    <p className="text-black">{details.creators.join(", ")}</p>
                </Section>
            )}

            {details.production && (
                <Section title="Production">
                    <p className="text-black">{details.production.join(", ")}</p>
                </Section>
            )}

            <Section title="Overview">
                <p className="text-black leading-relaxed">{details.overview}</p>
            </Section>
        </div>
    );
}