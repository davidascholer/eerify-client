import { Movie, UserProfile, ViewingHistoryEntry } from './types'
import { detectMovieSubgenres, HorrorSubgenre } from './genres'

export function calculateProfileStats(
  viewingHistory: ViewingHistoryEntry[],
  favorites: number[],
  reviews: Record<number, { rating?: number }>,
  allMovies: Record<number, Movie>
): UserProfile['stats'] {
  const totalMoviesWatched = viewingHistory.filter(h => h.completed).length
  const totalReviews = Object.keys(reviews).length
  const favoriteCount = favorites.length

  const ratings = Object.values(reviews)
    .map(r => r.rating)
    .filter((r): r is number => typeof r === 'number' && r > 0)
  
  const averageRating = ratings.length > 0
    ? ratings.reduce((sum, r) => sum + r, 0) / ratings.length
    : 0

  const subgenreCounts: Record<string, number> = {}
  viewingHistory.forEach(entry => {
    const movie = allMovies[entry.movieId]
    if (movie && entry.completed) {
      const subgenres = detectMovieSubgenres(movie)
      subgenres.forEach(subgenre => {
        subgenreCounts[subgenre] = (subgenreCounts[subgenre] || 0) + 1
      })
    }
  })

  const mostWatchedSubgenre = Object.entries(subgenreCounts)
    .sort(([, a], [, b]) => b - a)[0]?.[0]

  return {
    totalMoviesWatched,
    totalReviews,
    favoriteCount,
    averageRating,
    mostWatchedSubgenre,
  }
}

export function generatePersonalizedRecommendations(
  profile: UserProfile,
  allMovies: Movie[],
  favorites: number[],
  reviews: Record<number, { rating?: number }>,
  viewingHistory: ViewingHistoryEntry[]
): Movie[] {
  const viewedMovieIds = new Set(viewingHistory.map(h => h.movieId))
  const favoriteMovieIds = new Set(favorites)
  
  const availableMovies = allMovies.filter(m => !viewedMovieIds.has(m.id))
  
  const scoredMovies = availableMovies.map(movie => {
    let score = movie.vote_average * 2
    
    const subgenres = detectMovieSubgenres(movie)
    const matchingSubgenres = subgenres.filter(s => 
      profile.favoriteSubgenres.includes(s)
    )
    score += matchingSubgenres.length * 15
    
    const favoriteMovies = Array.from(favoriteMovieIds)
      .map(id => allMovies.find(m => m.id === id))
      .filter((m): m is Movie => m !== undefined)
    
    favoriteMovies.forEach(favMovie => {
      const favSubgenres = detectMovieSubgenres(favMovie)
      const commonSubgenres = subgenres.filter(s => favSubgenres.includes(s))
      score += commonSubgenres.length * 8
    })
    
    const highRatedMovies = Object.entries(reviews)
      .filter(([, review]) => review.rating && review.rating >= 7)
      .map(([movieId]) => allMovies.find(m => m.id === parseInt(movieId)))
      .filter((m): m is Movie => m !== undefined)
    
    highRatedMovies.forEach(ratedMovie => {
      const ratedSubgenres = detectMovieSubgenres(ratedMovie)
      const commonSubgenres = subgenres.filter(s => ratedSubgenres.includes(s))
      score += commonSubgenres.length * 5
    })
    
    const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 0
    const currentYear = new Date().getFullYear()
    const yearDiff = currentYear - releaseYear
    if (yearDiff <= 3) {
      score += 5
    }
    
    if (movie.vote_count > 1000) {
      score += 3
    }
    
    return { movie, score }
  })
  
  return scoredMovies
    .sort((a, b) => b.score - a.score)
    .slice(0, 50)
    .map(item => item.movie)
}

export function getSimilarMovies(
  movie: Movie,
  allMovies: Movie[],
  excludeIds: number[] = []
): Movie[] {
  const excludeSet = new Set(excludeIds)
  const movieSubgenres = detectMovieSubgenres(movie)
  
  const scoredMovies = allMovies
    .filter(m => m.id !== movie.id && !excludeSet.has(m.id))
    .map(m => {
      const subgenres = detectMovieSubgenres(m)
      const commonSubgenres = subgenres.filter(s => movieSubgenres.includes(s))
      
      let score = commonSubgenres.length * 10
      
      score += m.vote_average
      
      const releaseYearMovie = movie.release_date ? new Date(movie.release_date).getFullYear() : 0
      const releaseYearCandidate = m.release_date ? new Date(m.release_date).getFullYear() : 0
      const yearDiff = Math.abs(releaseYearMovie - releaseYearCandidate)
      if (yearDiff <= 5) {
        score += 5 - yearDiff
      }
      
      return { movie: m, score }
    })
    .filter(item => item.score > 0)
  
  return scoredMovies
    .sort((a, b) => b.score - a.score)
    .slice(0, 20)
    .map(item => item.movie)
}
