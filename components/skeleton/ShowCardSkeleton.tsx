"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function ShowCardSkeleton() {
    return (
        <div className="flex flex-col gap-2">
            <Skeleton className="w-full h-64 rounded-md" />
            <Skeleton className="h-5 w-3/4 rounded-md mx-2" />
        </div>
    );
}