import baseApi from "@/lib/api/baseApi";

export const moviesService = {
    async getTopMovies() {
        const response = await baseApi.get("movie/popular");
        return response.data;
    }
}