"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function ShowCardSkeleton() {
    return (
        <div
            className="p-0 overflow-hidden transition-all duration-300
                       rounded-xl border border-transparent
                       w-[160px] sm:w-[200px] md:w-[258px]"
        >
            <div className="w-full aspect-[2/3] relative overflow-hidden">
                <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
            </div>

            {/* Title placeholder */}
            <div className="p-4">
                <Skeleton className="h-5 w-3/4 rounded-md mx-auto" />
            </div>
        </div>
    );
}