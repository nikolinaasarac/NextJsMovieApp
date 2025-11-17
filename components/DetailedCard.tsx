"use client";

import Image from "next/image";
import { Video } from "@/models/Video";
import { MediaDetails } from "@/models/MediaDetails";

interface Props {
    details: MediaDetails;
    trailer: Video | null;
}

export default function DetailedCard({ details, trailer }: Props) {
    if (!details) return null;
    console.log(details);
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
                        src={`https://image.tmdb.org/t/p/w780${details.image}`}
                        alt={details.title}
                        fill
                        className="object-cover"
                        sizes="100vw"
                    />
                )}
            </div>

            {/* HEADER INFO */}
            <div className="space-y-2">
                {details.tagline && (
                    <p className="text-gray-400 italic text-lg">{details.tagline}</p>
                )}
                <h1 className="text-4xl font-bold tracking-tight">{details.title}</h1>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                {details.date && <InfoBadge label="Release" value={details.date} />}
                {details.rating && <InfoBadge label="Rating" value={`${details.rating}/10`} />}
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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
            {children}
        </div>
    );
}

function InfoBadge({ label, value }: { label: string; value: string }) {
    return (
        <div className="bg-gray-800 text-gray-200 p-3 rounded-lg shadow flex flex-col">
            <span className="text-xs opacity-70">{label}</span>
            <span className="font-semibold">{value}</span>
        </div>
    );
}