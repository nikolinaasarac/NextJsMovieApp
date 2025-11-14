import baseApi from "@/lib/api/baseApi";
import {Video} from "@/models/Video";

export const moviesService = {
    async getTopMovies() {
        const response = await baseApi.get("movie/popular");
        return response.data;
    },
    async getTopShows() {
        const response = await baseApi.get("tv/popular");
        return response.data;
    },
    async searchMovies(searchTerm: string) {
        const response = await baseApi.get("search/movie",{
            params: {
                query: searchTerm
            }
        });
        return response.data;
    },
    async searchTvShows(searchTerm: string) {
        const response = await baseApi.get("search/tv",{
            params: {
                query: searchTerm
            }
        });
        return response.data;
    },
    async getMovie(id: string) {
        const response = await baseApi.get(`movie/${id}`);
        return response.data;
    },

    async getTvShow(id: string) {
        const response = await baseApi.get(`tv/${id}`);
        return response.data;
    },

    async getMovieTrailer(id: string): Promise<Video[]> {
        const res = await baseApi.get<{ results: Video[] }>(`/movie/${id}/videos`);
        return res.data.results.filter((v) => v.type === "Trailer" && v.name === "Official Trailer");
    },

    async getTvShowTrailer(id: string): Promise<Video[]> {
        const res = await baseApi.get<{ results: Video[] }>(`/tv/${id}/videos`);
        return res.data.results.filter((v) => v.type === "Trailer" && v.name === "Official Trailer");
    }
}