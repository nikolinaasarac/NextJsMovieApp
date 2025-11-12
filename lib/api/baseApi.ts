import axios from "axios";

const baseApi = axios.create(
    {
        baseURL: "https://api.themoviedb.org/3",
        headers: {
            "Content-Type": "application/json",
        }
    }
)
baseApi.interceptors.request.use((config) => {
    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

    if(!config.params) config.params = {};
    config.params["api_key"] = API_KEY;
    return config;
});
export default baseApi;