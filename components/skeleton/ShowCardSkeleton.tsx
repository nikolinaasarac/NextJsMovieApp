"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function ShowCardSkeleton() {
    return (
        <div
            className="p-0 overflow-hidden rounded-xl border border-transparent
                       w-full aspect-auto"
        >
            <div className="w-full aspect-[2/3] relative overflow-hidden">
                <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
            </div>

            <div className="p-6">
                <Skeleton className="h-5 w-3/4 rounded-md mx-auto" />
            </div>
        </div>
    );
}