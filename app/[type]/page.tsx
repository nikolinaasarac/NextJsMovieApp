"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import TabSelector from "@/components/TabSelector";
import Search from "@/components/Search";
import ShowCard from "@/components/ShowCard";
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
    const [searchResults, setSearchResults] = useState<Movie[] | TvShow[] | null>(null);
    const [movies, setMovies] = useState<Movie[] | null>(null);
    const [tvShows, setTvShows] = useState<TvShow[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (searchTerm.length < 3) {
            router.replace(`/${activeTab}`);
            return;
        }
        const query = searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : "";
        router.replace(`/${activeTab}${query}`);
    }, [activeTab, searchTerm, router]);


    useEffect(() => {
        async function loadData() {
            setLoading(true);
            setError("");
            try {
                if (searchTerm.length >= 3) {
                    if (activeTab === "movies") {
                        const res = await moviesService.searchMovies(searchTerm);
                        setSearchResults(res.results);
                    } else {
                        const res = await moviesService.searchTvShows(searchTerm);
                        setSearchResults(res.results);
                    }
                } else {
                    setSearchResults(null);
                    if (activeTab === "movies") {
                        const res = await moviesService.getTopMovies();
                        setMovies(res.results.slice(0, 10));
                    } else {
                        const res = await moviesService.getTopShows();
                        setTvShows(res.results.slice(0, 10));
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


    useEffect(() => {
        if (!typeParam) {
            router.replace("/shows");
        }
        setActiveTab(typeParam || "shows");
        setSearchTerm(querySearch);
    }, [typeParam, querySearch, router]);

    const dataToShow = searchResults || (activeTab === "movies" ? movies : tvShows);

    return (
        <div className="p-4">
            <TabSelector activeTab={activeTab} searchTerm={searchTerm} />
            <Search onSearch={setSearchTerm} value={searchTerm} />

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {dataToShow?.map((f) => (
                    <ShowCard key={f.id} data={f} />
                ))}
            </div>
        </div>
    );
}