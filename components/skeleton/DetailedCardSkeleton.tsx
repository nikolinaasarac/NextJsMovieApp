"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function DetailedCardSkeleton() {
    return (
        <div className="max-w-4xl mx-auto p-4 space-y-4 animate-pulse">
            {/* Video / Image placeholder */}
            <div className="w-full mb-6 h-80 md:h-96 rounded-lg bg-gray-200" />

            {/* Text placeholders */}
            <div className="space-y-2">
                <Skeleton className="h-8 w-3/4 rounded-md" /> {/* Title */}
                <Skeleton className="h-5 w-1/7 rounded-md" />  {/* Date */}
                <Skeleton className="h-5 w-1/9 rounded-md" />  {/* Rating */}
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-5/6 rounded-md" />
            </div>
        </div>
    );
}