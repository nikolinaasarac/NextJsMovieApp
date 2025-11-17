"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function DetailedCardSkeleton() {
    return (
        <div className="max-w-5xl mx-auto p-6 space-y-8">

            {/* VIDEO / POSTER */}
            <div className="rounded-xl overflow-hidden shadow-lg">
                <Skeleton className="w-full aspect-video rounded-xl" />
            </div>

            {/* HEADER */}
            <div className="space-y-2">
                <Skeleton className="h-6 w-1/3" /> {/* tagline */}
                <Skeleton className="h-10 w-3/4" /> {/* title */}
            </div>

            {/* INFO GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className="p-3 bg-gray-200 rounded-lg">
                        <Skeleton className="h-3 w-1/2 mb-2" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                ))}
            </div>

            {/* GENRES */}
            <div className="space-y-2">
                <Skeleton className="h-6 w-24" /> {/* Section title */}
                <div className="flex gap-2 flex-wrap">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="h-6 w-16 rounded-full" />
                    ))}
                </div>
            </div>

            {/* CREATOR */}
            <div className="space-y-2">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-5 w-3/4" />
            </div>

            {/* PRODUCTION */}
            <div className="space-y-2">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-5 w-3/4" />
            </div>

            {/* OVERVIEW */}
            <div className="space-y-2">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
            </div>
        </div>
    );
}