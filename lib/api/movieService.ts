import baseApi from "@/lib/api/baseApi";

export const moviesService = {
    async getTopMovies() {
        const response = await baseApi.get("movie/popular");
        return response.data;
    },
    async getTopShows() {
        const response = await baseApi.get("tv/popular");
        return response.data;
    }
}