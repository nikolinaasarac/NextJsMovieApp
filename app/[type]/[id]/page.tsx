"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import DetailedCard from "@/components/DetailedCard";

export default function MediaDetails() {
    const params = useParams();
    const router = useRouter();

    const id = params.id?.toString();
    const type = params.type?.toString();

    if (!id || !type) return null;

    return (
        <div className="p-4">
            <Button onClick={() => router.back()}>Back</Button>

            <DetailedCard
                id={id}
                type={type === "movies" ? "movie" : "tv"}
            />
        </div>
    );
}