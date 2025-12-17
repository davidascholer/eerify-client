import { Movie, MovieDetails } from './types'
import { getKV } from '@/lib/storage/useKV'

const DEFAULT_TMDB_API_KEY = '***REMOVED***'
const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'

let cachedApiKey: string | null = null

export const setApiKey = (key: string) => {
  cachedApiKey = key
}

export const getApiKey = async (): Promise<string> => {
  if (cachedApiKey) return cachedApiKey
  
  try {
    const storedKey = getKV<string>('tmdb-api-key', DEFAULT_TMDB_API_KEY)
    cachedApiKey = storedKey
    return storedKey
  } catch (error) {
    console.error('Error getting API key from storage:', error)
  }
  
  return DEFAULT_TMDB_API_KEY
}

export const getImageUrl = (path: string | null, size: 'w185' | 'w342' | 'w500' | 'w780' | 'original' = 'w500') => {
  if (!path) return null
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
}

export const getHorrorMovies = async (page = 1): Promise<Movie[]> => {
  try {
    const apiKey = await getApiKey()
    const response = await fetch(
      `${TMDB_BASE_URL}/discover/movie?api_key=${apiKey}&with_genres=27&sort_by=popularity.desc&page=${page}&vote_count.gte=100`
    )
    const data = await response.json()
    return data.results || []
  } catch (error) {
    console.error('Error fetching horror movies:', error)
    return []
  }
}

export const getTopRatedHorrorMovies = async (): Promise<Movie[]> => {
  try {
    const apiKey = await getApiKey()
    const response = await fetch(
      `${TMDB_BASE_URL}/discover/movie?api_key=${apiKey}&with_genres=27&sort_by=vote_average.desc&vote_count.gte=500&page=1`
    )
    const data = await response.json()
    return data.results || []
  } catch (error) {
    console.error('Error fetching top rated horror movies:', error)
    return []
  }
}

export const getRecentHorrorMovies = async (): Promise<Movie[]> => {
  try {
    const apiKey = await getApiKey()
    const currentYear = new Date().getFullYear()
    const response = await fetch(
      `${TMDB_BASE_URL}/discover/movie?api_key=${apiKey}&with_genres=27&sort_by=release_date.desc&primary_release_year=${currentYear}&vote_count.gte=20&page=1`
    )
    const data = await response.json()
    return data.results || []
  } catch (error) {
    console.error('Error fetching recent horror movies:', error)
    return []
  }
}

export const getMovieDetails = async (movieId: number): Promise<MovieDetails | null> => {
  try {
    const apiKey = await getApiKey()
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${movieId}?api_key=${apiKey}&append_to_response=credits,videos`
    )
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching movie details:', error)
    return null
  }
}

export const searchHorrorMovies = async (query: string): Promise<Movie[]> => {
  try {
    const apiKey = await getApiKey()
    const response = await fetch(
      `${TMDB_BASE_URL}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&with_genres=27`
    )
    const data = await response.json()
    return data.results || []
  } catch (error) {
    console.error('Error searching movies:', error)
    return []
  }
}
