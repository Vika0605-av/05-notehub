
import axios from 'axios';

import type { Movie } from "../types/movie";

export interface MovieResponse {
    results: Movie[];
    total_pages: number;
    
}

const BASE_URL = import.meta.env.VITE_BASE_URL;

const API_TOKEN = import.meta.env.VITE_API_TOKEN;

export const fetchMovies = async (

    query: string,
    page: number

): Promise<MovieResponse> => {

    const response = await axios.get<MovieResponse>(

        `${BASE_URL}/search/movie`,

        {

            params: {
                query,
                page,
                include_adult: false,
            },

            headers: {

                Authorization: `Bearer ${API_TOKEN}`,

            },

        }

    );

    return response.data;
};