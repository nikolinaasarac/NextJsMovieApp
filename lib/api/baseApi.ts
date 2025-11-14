import axios from "axios";

const baseApi = axios.create(
    {
        baseURL: "https://api.themoviedb.org/3",

            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
                accept: "application/json",
            "Content-Type": "application/json",
        }
    }
);
export default baseApi;