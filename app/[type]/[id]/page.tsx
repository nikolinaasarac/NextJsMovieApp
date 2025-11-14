"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DetailedCard from "@/components/DetailedCard";

export default function MediaDetails() {
    const params = useParams();

    const id = params.id?.toString();     // <-- FIX
    const type = params.type?.toString(); // <-- FIX

    if (!id || !type) return null;

    return (
        <div className="p-4">
            <Link href={`/${type}`}>
                <Button>Back</Button>
            </Link>

            <DetailedCard
                id={id}
                type={type === "movies" ? "movie" : "tv"}
            />
        </div>
    );
}