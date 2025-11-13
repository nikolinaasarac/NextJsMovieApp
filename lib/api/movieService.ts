import baseApi from "@/lib/api/baseApi";

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
    }
}