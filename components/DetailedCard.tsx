"use client";

import Image from "next/image";
import { Video } from "@/models/Video";

interface Props {
    details: any; // možeš tipizirati prema svom interfejsu
    trailer: Video | null;
}

export default function DetailedCard({ details, trailer }: Props) {
    if (!details) return null;

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