"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function ShowCardSkeleton() {
    return (
        <div
            className="p-0 overflow-hidden transition-all duration-300
                       rounded-xl border border-transparent
                       w-full cursor-pointer"
        >
            <div className="w-full aspect-[2/3] relative overflow-hidden flex-shrink-0">
                <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
            </div>

            <div className="p-2 sm:p-3">
                <Skeleton className="h-4 sm:h-5 md:h-6 w-3/4 rounded-md mb-2 mx-auto" />
                <Skeleton className="h-4 sm:h-5 w-1/2 rounded-md mx-auto" />
            </div>

            <div className="p-2 sm:p-3">
                <Skeleton className="h-3 sm:h-4 w-1/3 rounded-md mx-auto" />
            </div>
        </div>
    );
}