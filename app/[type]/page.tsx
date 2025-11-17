"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import TabSelector from "@/components/TabSelector";
import Search from "@/components/Search";
import ShowCard from "@/components/ShowCard";
import ShowCardSkeleton from "@/components/skeleton/ShowCardSkeleton";
import { moviesService } from "@/lib/api/movieService";
import { Movie } from "@/models/Movie";
import { TvShow } from "@/models/TvShow";

export default function Home() {
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();

    const typeParam = params.type?.toString();
    const querySearch = searchParams.get("search") || "";

    const [activeTab, setActiveTab] = useState(typeParam || "shows");
    const [searchTerm, setSearchTerm] = useState(querySearch);
    const [data, setData] = useState<Movie[] | TvShow[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setActiveTab(typeParam || "shows");
        setSearchTerm(querySearch);
    }, [typeParam, querySearch]);

    useEffect(() => {
        const query = searchTerm.length >= 3 ? `?search=${encodeURIComponent(searchTerm)}` : "";
        router.replace(`/${activeTab}${query}`);
    }, [activeTab, searchTerm, router]);

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            setError("");
            setData(null); // reset data da se odmah pokaže skeleton

            try {
                if (searchTerm.length >= 3) {
                    if (activeTab === "movies") {
                        const res = await moviesService.searchMovies(searchTerm);
                        setData(res.results);
                    } else {
                        const res = await moviesService.searchTvShows(searchTerm);
                        setData(res.results);
                    }
                } else {
                    if (activeTab === "movies") {
                        const res = await moviesService.getTopMovies();
                        setData(res.results.slice(0, 10));
                    } else {
                        const res = await moviesService.getTopShows();
                        setData(res.results.slice(0, 10));
                    }
                }
            } catch {
                setError("Greška pri učitavanju podataka");
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, [activeTab, searchTerm]);

    return (
        <div className="p-4">
            <div className="max-w-[1470px] mx-auto">
                {/* Tabovi i search */}
                <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />
                <Search onSearch={setSearchTerm} value={searchTerm} />

                {error && <p className="text-red-500">{error}</p>}

                {/* Grid sa karticama */}
                <div className="pt-6 grid gap-4 justify-center
    grid-cols-[repeat(auto-fit,minmax(250px,1fr))] items-stretch">
                    {loading || !data
                        ? Array.from({ length: 10 }).map((_, i) => <ShowCardSkeleton key={i} />)
                        : data.length > 0
                            ? data.map((d) => <ShowCard key={d.id} data={d} />)
                            : <p>No results found.</p>
                    }
                </div>
            </div>
        </div>
    );
}