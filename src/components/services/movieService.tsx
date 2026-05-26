
import  type { Movie } from '../../types/movie.ts';

interface MovieResponse  {

  results: Movie[];
  total_pages: number;

}
const API_TOKEN = import.meta.env.VITE_TMDB_API_KEY;

const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

export const fetchMovies = async (query: string, page: number): Promise<MovieResponse> => {

  const response = await fetch(

    `${BASE_URL}/search/movie?query=${query}&page=${page}`,

    {
      headers: {

        Authorization: `Bearer ${API_TOKEN}`,
      },

    }

  );

  if (!response.ok) {

    throw new Error('Failed to fetch movies');

  }

  const data = await response.json();

  return data;
};