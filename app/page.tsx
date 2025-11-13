"use client"

import {useEffect, useState} from "react";
import TabSelector from "@/components/TabSelector";
import {Movie} from "@/models/Movie";
import {moviesService} from "@/lib/api/movieService";
import ShowCard from "@/components/ShowCard";
import {TvShow} from "@/models/TvShow";
import Search from "@/components/Search";

export default function Home() {
    const [activeTab, setActiveTab] = useState("tvShows")
    const [movies, setMovies] = useState<Movie[] | null>(null);
    const [tvShows, setTvShows] = useState<TvShow[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState<Movie[] | TvShow[] | null>(null);

    async function performSearch(searchTerm: string) {
        if (searchTerm.length < 3) {
            setSearchResults(null);
            return;
        }

        setLoading(true);
        setError("");

        try {
            if (activeTab === "movies") {
                const res = await moviesService.searchMovies(searchTerm);
                setSearchResults(res.results);
            } else {
                const res = await moviesService.searchTvShows(searchTerm);
                setSearchResults(res.results);
            }
        } catch {
            setError("Greška pri pretrazi");
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        setSearchResults(null);
        setMovies(null);
        setTvShows(null);
        setError("");

        async function loadTop10() {
            if (searchTerm.length >= 3) return;

            setLoading(true);
            try {
                if (activeTab === "movies") {
                    const topMovies = await moviesService.getTopMovies();
                    setMovies(topMovies.results.slice(0, 10));
                } else if (activeTab === "tvShows") {
                    const topShows = await moviesService.getTopShows();
                    setTvShows(topShows.results.slice(0, 10));
                }
            } catch {
                setError("Greška pri učitavanju top 10");
            } finally {
                setLoading(false);
            }
        }

        loadTop10();
    }, [activeTab, searchTerm]);

    useEffect(() => {
        performSearch(searchTerm);
    }, [searchTerm, activeTab]);

    console.log(activeTab);
    return (
        <div>
            <TabSelector activeTab={activeTab} onTabChange={setActiveTab}/>
            <Search onSearch={(term) => setSearchTerm(term)} />

            <div>
                {(searchResults || (activeTab === "movies" ? movies : tvShows))?.map((f, i) => (
                    <ShowCard key={i} data={f}/>
                ))}
            </div>
        </div>
    )
}
