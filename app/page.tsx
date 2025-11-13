"use client"

import {useEffect, useState} from "react";
import TabSelector from "@/components/TabSelector";
import { Movie } from "@/models/Movie";
import {moviesService} from "@/lib/api/movieService";
import ShowCard from "@/components/ShowCard";
import {TvShow} from "@/models/TvShow";

export default function Home() {
    const [activeTab, setActiveTab] = useState("tvShows")
    const [movies, setMovies] = useState<Movie[]| null>(null);
    const [tvShows, setTvShows] = useState<TvShow[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadMovies(){
            setLoading(true);
            setError("");
            try {
                if(activeTab === "movies")
                {
                    const topMovies = await moviesService.getTopMovies();
                    console.log(topMovies);
                    setMovies(topMovies.results.slice(0, 10));
                }
                else if (activeTab === "tvShows")
                {
                    const topShows = await moviesService.getTopShows();
                    console.log(topShows);
                    setMovies(topShows.results.slice(0, 10));
                }
            }
            catch (error)
            {
                setError("Greska");
            }
            finally {
                setLoading(false);
            }
        }
        loadMovies();
    }, [activeTab]);
    console.log(activeTab);
    return (
        <div>
            <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />
            <div>
                {movies?.map((f, index) => (
                    <ShowCard key={index} data={f}></ShowCard>
                ))}
            </div>
        </div>
    )
}
