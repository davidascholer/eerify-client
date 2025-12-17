import { Movie, MovieDetails } from '@/lib/types'

const DEFAULT_TMDB_API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MDYyNTdhYzIyOGZkYmUwMjI5ZTQ4NjBkZTM2NTIwZCIsIm5iZiI6MTcwMTU1MzY0NS43OTYsInN1YiI6IjY1NmJhNWVkMDVmOWNmMDEzYzU3YTdlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zKh60brdw_OccU2DlvEVP3xju2XmpRLnVXQU6tIf-YE'
// const DEFAULT_TMDB_API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZDAxOTdmOTQ3YTA2YmJkZGRhOGJmNzY0MDc0YTM3ZSIsIm5iZiI6MTczNjk2Mjg4My4yOTcsInN1YiI6IjY3ODcwYWEzZmE0NDk3MDFjNGEyOTkwYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KlHGvvQoCEIGqEk2OZB-TQ78Wm4AQmIxtLa7jd8FW1I'
const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'

let cachedApiKey: string | null = null

export const setApiKey = (key: string) => {
  cachedApiKey = key
}

export const getApiKey = (): string => {
  return cachedApiKey || DEFAULT_TMDB_API_TOKEN
}

export const getImageUrl = (path: string | null, size: 'w185' | 'w342' | 'w500' | 'w780' | 'original' = 'w500') => {
  if (!path) return null
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
}

export const getHorrorMovies = async (page = 1): Promise<Movie[]> => {
  try {
    const apiKey = getApiKey()
    console.log('[API] Fetching horror movies, page:', page)
    const response = await fetch(
      `${TMDB_BASE_URL}/discover/movie?with_genres=27&sort_by=popularity.desc&page=${page}&vote_count.gte=100`,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    )
    
    if (!response.ok) {
      console.error('[API] Failed to fetch horror movies. Status:', response.status, response.statusText)
      const errorText = await response.text()
      console.error('[API] Error response:', errorText)
      return []
    }
    
    const data = await response.json()
    console.log('[API] Successfully fetched horror movies:', data.results?.length || 0, 'movies')
    return data.results || []
  } catch (error) {
    console.error('[API] Error fetching horror movies:', error)
    return []
  }
}

export const getTopRatedHorrorMovies = async (): Promise<Movie[]> => {
  try {
    const apiKey = getApiKey()
    const response = await fetch(
      `${TMDB_BASE_URL}/discover/movie?with_genres=27&sort_by=vote_average.desc&vote_count.gte=500&page=1`,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    )
    const data = await response.json()
    return data.results || []
  } catch (error) {
    console.error('Error fetching top rated horror movies:', error)
    return []
  }
}

export const getRecentHorrorMovies = async (page = 1): Promise<{ movies: Movie[], totalPages: number }> => {
  try {
    const apiKey = getApiKey()
    const currentYear = new Date().getFullYear()
    console.log('[API] Fetching recent horror movies for year:', currentYear, 'page:', page)
    const response = await fetch(
      `${TMDB_BASE_URL}/discover/movie?with_genres=27&sort_by=release_date.desc&primary_release_year=${currentYear}&vote_count.gte=20&page=${page}`,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    )
    
    if (!response.ok) {
      console.error('[API] Failed to fetch recent horror movies. Status:', response.status, response.statusText)
      const errorText = await response.text()
      console.error('[API] Error response:', errorText)
      return { movies: [], totalPages: 1 }
    }
    
    const data = await response.json()
    console.log('[API] Successfully fetched recent horror movies:', data.results?.length || 0, 'movies')
    return {
      movies: data.results || [],
      totalPages: data.total_pages || 1
    }
  } catch (error) {
    console.error('[API] Error fetching recent horror movies:', error)
    return { movies: [], totalPages: 1 }
  }
}

export const getMovieDetails = async (movieId: number): Promise<MovieDetails | null> => {
  try {
    const apiKey = getApiKey()
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${movieId}?append_to_response=credits,videos`,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
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
    const apiKey = getApiKey()
    const response = await fetch(
      `${TMDB_BASE_URL}/search/movie?language=en-US&query=${encodeURIComponent(query)}`,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    )
    const data = await response.json()
    const results = data.results || []
    return results.filter((movie: Movie) => movie.genre_ids?.includes(27))
  } catch (error) {
    console.error('Error searching movies:', error)
    return []
  }
}

export const searchMoviesByPerson = async (query: string, role: 'actor' | 'director' | 'writer'): Promise<Movie[]> => {
  try {
    const apiKey = getApiKey()
    const personResponse = await fetch(
      `${TMDB_BASE_URL}/search/person?query=${encodeURIComponent(query)}`,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    )
    const personData = await personResponse.json()
    const people = personData.results || []
    
    if (people.length === 0) return []
    
    const person = people[0]
    const creditsResponse = await fetch(
      `${TMDB_BASE_URL}/person/${person.id}/movie_credits`,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    )
    const creditsData = await creditsResponse.json()
    
    let movies: Movie[] = []
    if (role === 'actor') {
      movies = creditsData.cast || []
    } else {
      const crew = creditsData.crew || []
      if (role === 'director') {
        movies = crew.filter((credit: any) => credit.job === 'Director')
      } else if (role === 'writer') {
        movies = crew.filter((credit: any) => credit.department === 'Writing')
      }
    }
    
    return movies.filter((movie: Movie) => movie.genre_ids?.includes(27))
  } catch (error) {
    console.error(`Error searching movies by ${role}:`, error)
    return []
  }
}

export const searchMoviesByCompany = async (query: string): Promise<Movie[]> => {
  try {
    const apiKey = getApiKey()
    const companyResponse = await fetch(
      `${TMDB_BASE_URL}/search/company?query=${encodeURIComponent(query)}`,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    )
    const companyData = await companyResponse.json()
    const companies = companyData.results || []
    
    if (companies.length === 0) return []
    
    const company = companies[0]
    const moviesResponse = await fetch(
      `${TMDB_BASE_URL}/discover/movie?with_companies=${company.id}&with_genres=27&sort_by=popularity.desc`,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    )
    const moviesData = await moviesResponse.json()
    
    return moviesData.results || []
  } catch (error) {
    console.error('Error searching movies by company:', error)
    return []
  }
}

export const getTrendingMovies = async (page = 1): Promise<{ movies: Movie[], totalPages: number }> => {
  try {
    const apiKey = getApiKey()
    console.log('[API] Fetching trending movies, page:', page)
    const response = await fetch(
      `${TMDB_BASE_URL}/trending/all/week?page=${page}`,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    )
    
    if (!response.ok) {
      console.error('[API] Failed to fetch trending movies. Status:', response.status, response.statusText)
      const errorText = await response.text()
      console.error('[API] Error response:', errorText)
      return { movies: [], totalPages: 1 }
    }
    
    const data = await response.json()
    const results = data.results || []
    const movies = results.filter((item: any) => item.media_type === 'movie' && item.genre_ids?.includes(27))
    console.log('[API] Successfully fetched trending movies:', movies.length, 'horror movies out of', results.length, 'total')
    return {
      movies,
      totalPages: data.total_pages || 1
    }
  } catch (error) {
    console.error('[API] Error fetching trending movies:', error)
    return { movies: [], totalPages: 1 }
  }
}

export const getNewReleaseHorrorMovies = async (page = 1): Promise<{ movies: Movie[], totalPages: number }> => {
  try {
    const apiKey = getApiKey()
    const today = new Date()
    const threeMonthsAgo = new Date()
    threeMonthsAgo.setMonth(today.getMonth() - 3)
    
    const releaseGte = threeMonthsAgo.toISOString().split('T')[0]
    const releaseLte = today.toISOString().split('T')[0]
    
    console.log('[API] Fetching new release horror movies from', releaseGte, 'to', releaseLte, 'page:', page)
    const response = await fetch(
      `${TMDB_BASE_URL}/discover/movie?with_genres=27&sort_by=release_date.desc&release_date.gte=${releaseGte}&release_date.lte=${releaseLte}&vote_count.gte=10&page=${page}`,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    )
    
    if (!response.ok) {
      console.error('[API] Failed to fetch new release horror movies. Status:', response.status, response.statusText)
      const errorText = await response.text()
      console.error('[API] Error response:', errorText)
      return { movies: [], totalPages: 1 }
    }
    
    const data = await response.json()
    console.log('[API] Successfully fetched new release horror movies:', data.results?.length || 0, 'movies')
    return {
      movies: data.results || [],
      totalPages: data.total_pages || 1
    }
  } catch (error) {
    console.error('[API] Error fetching new release horror movies:', error)
    return { movies: [], totalPages: 1 }
  }
}

export const getUpcomingHorrorMovies = async (page = 1): Promise<{ movies: Movie[], totalPages: number }> => {
  try {
    const apiKey = getApiKey()
    const today = new Date()
    const sixMonthsFromNow = new Date()
    sixMonthsFromNow.setMonth(today.getMonth() + 6)
    
    const releaseGte = today.toISOString().split('T')[0]
    const releaseLte = sixMonthsFromNow.toISOString().split('T')[0]
    
    console.log('[API] Fetching upcoming horror movies from', releaseGte, 'to', releaseLte, 'page:', page)
    const response = await fetch(
      `${TMDB_BASE_URL}/discover/movie?with_genres=27&sort_by=release_date.asc&release_date.gte=${releaseGte}&release_date.lte=${releaseLte}&page=${page}`,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    )
    
    if (!response.ok) {
      console.error('[API] Failed to fetch upcoming horror movies. Status:', response.status, response.statusText)
      const errorText = await response.text()
      console.error('[API] Error response:', errorText)
      return { movies: [], totalPages: 1 }
    }
    
    const data = await response.json()
    console.log('[API] Successfully fetched upcoming horror movies:', data.results?.length || 0, 'movies')
    return {
      movies: data.results || [],
      totalPages: data.total_pages || 1
    }
  } catch (error) {
    console.error('[API] Error fetching upcoming horror movies:', error)
    return { movies: [], totalPages: 1 }
  }
}

export const enrichMovieWithRuntime = async (movie: Movie): Promise<Movie> => {
  try {
    const apiKey = getApiKey()
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${movie.id}`,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    )
    
    if (!response.ok) {
      console.warn(`[API] Failed to enrich movie ${movie.id} with runtime. Status:`, response.status)
      return movie
    }
    
    const data = await response.json()
    return { ...movie, runtime: data.runtime }
  } catch (error) {
    console.error('[API] Error enriching movie with runtime:', error)
    return movie
  }
}

export const enrichMoviesWithRuntime = async (movies: Movie[]): Promise<Movie[]> => {
  const enrichedMovies = await Promise.all(
    movies.slice(0, 20).map(movie => enrichMovieWithRuntime(movie))
  )
  return enrichedMovies
}

export const getForeignHorrorMovies = async (page = 1): Promise<{ movies: Movie[], totalPages: number }> => {
  try {
    const apiKey = getApiKey()
    console.log('[API] Fetching foreign horror movies, page:', page)
    const response = await fetch(
      `${TMDB_BASE_URL}/discover/movie?with_genres=27&sort_by=popularity.desc&vote_count.gte=50&page=${page}`,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    )
    
    if (!response.ok) {
      console.error('[API] Failed to fetch foreign horror movies. Status:', response.status, response.statusText)
      const errorText = await response.text()
      console.error('[API] Error response:', errorText)
      return { movies: [], totalPages: 1 }
    }
    
    const data = await response.json()
    const allResults = data.results || []
    const filteredMovies = allResults.filter((movie: Movie) => movie.original_language !== 'en')
    console.log('[API] Successfully fetched foreign horror movies:', filteredMovies.length, 'non-English out of', allResults.length, 'total')
    return {
      movies: filteredMovies,
      totalPages: data.total_pages || 1
    }
  } catch (error) {
    console.error('[API] Error fetching foreign horror movies:', error)
    return { movies: [], totalPages: 1 }
  }
}

export const getSimilarMovies = async (movieId: number): Promise<Movie[]> => {
  try {
    const apiKey = getApiKey()
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${movieId}/similar?page=1`,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    )
    const data = await response.json()
    const results = data.results || []
    return results.filter((movie: Movie) => movie.genre_ids?.includes(27)).slice(0, 12)
  } catch (error) {
    console.error('Error fetching similar movies:', error)
    return []
  }
}

export const getTopRatedHorrorByDecade = async (startYear: number, endYear: number): Promise<Movie[]> => {
  try {
    const apiKey = getApiKey()
    console.log('[API] Fetching top rated horror movies for decade:', startYear, '-', endYear)
    const response = await fetch(
      `${TMDB_BASE_URL}/discover/movie?with_genres=27&sort_by=vote_average.desc&vote_count.gte=100&primary_release_date.gte=${startYear}-01-01&primary_release_date.lte=${endYear}-12-31&page=1`,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    )
    
    if (!response.ok) {
      console.error(`[API] Failed to fetch top rated horror movies for ${startYear}-${endYear}. Status:`, response.status, response.statusText)
      const errorText = await response.text()
      console.error('[API] Error response:', errorText)
      return []
    }
    
    const data = await response.json()
    console.log(`[API] Successfully fetched top rated horror movies for ${startYear}-${endYear}:`, data.results?.length || 0, 'movies')
    return data.results || []
  } catch (error) {
    console.error(`[API] Error fetching top rated horror movies for ${startYear}-${endYear}:`, error)
    return []
  }
}

export interface WatchProvider {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface WatchProviders {
  link?: string
  flatrate?: WatchProvider[]
  rent?: WatchProvider[]
  buy?: WatchProvider[]
}

export const getWatchProviders = async (movieId: number): Promise<WatchProviders | null> => {
  try {
    const apiKey = getApiKey()
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${movieId}/watch/providers`,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    )
    const data = await response.json()
    return data.results?.US || null
  } catch (error) {
    console.error('Error fetching watch providers:', error)
    return null
  }
}
