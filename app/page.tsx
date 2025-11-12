"use client"

import {useEffect, useState} from "react";
import TabSelector from "@/components/TabSelector";
import { Movie } from "@/models/Movie";
import {moviesService} from "@/lib/api/movieService";
import ShowCard from "@/components/ShowCard";

export default function Home() {
    const [activeTab, setActiveTab] = useState("tvShows")
    const [movies, setMovies] = useState<Movie[]| null>(null);
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
                    setMovies(topMovies.results);
                }
                else if (activeTab === "tvShows")
                {
                    console.log("TvShows active movies");
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
