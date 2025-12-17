import { Movie, TriggerRatings } from '@/lib/types'
import { MovieCard } from './MovieCard'

interface MovieGridProps {
  title: string
  movies: Movie[]
  userRatings?: Record<number, number>
  favorites?: number[]
  onToggleFavorite?: (movieId: number) => void
  onMovieClick: (movieId: number) => void
  triggers?: Record<number, TriggerRatings>
  showLanguage?: boolean
}

export function MovieGrid({
  title,
  movies,
  userRatings = {},
  favorites = [],
  onToggleFavorite,
  onMovieClick,
  triggers = {},
  showLanguage = false,
}: MovieGridProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-foreground tracking-tight">{title}</h2>
      {movies.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">No movies found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-12 gap-4 max-h-[calc(3*350px)] overflow-hidden">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              userRating={userRatings[movie.id]}
              isFavorite={favorites.includes(movie.id)}
              onToggleFavorite={onToggleFavorite ? () => onToggleFavorite(movie.id) : undefined}
              onClick={() => onMovieClick(movie.id)}
              triggers={triggers[movie.id]}
              showLanguage={showLanguage}
            />
          ))}
        </div>
      )}
      {movies.length > 36 && (
        <p className="text-sm text-muted-foreground text-center">
          Showing first {Math.min(movies.length, 144)} of {movies.length} results
        </p>
      )}
    </div>
  )
}
