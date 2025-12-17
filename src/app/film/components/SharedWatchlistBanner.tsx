import { Movie, TriggerRatings } from '../lib/types'
import { MovieCard } from './MovieCard'
import { Button } from '@/components/ui/button'
import { X, Eye } from '@phosphor-icons/react'
import { ScrollArea } from '@/components/ui/scroll-area'

interface SharedWatchlistBannerProps {
  sharedMovies: Movie[]
  onClose: () => void
  onMovieClick: (movieId: number) => void
  onToggleFavorite: (movieId: number) => void
  onToggleWatchLater: (movieId: number) => void
  favorites: number[]
  watchLater: number[]
  userRatings: Record<number, number>
  triggers: Record<number, TriggerRatings>
}

export function SharedWatchlistBanner({
  sharedMovies,
  onClose,
  onMovieClick,
  onToggleFavorite,
  onToggleWatchLater,
  favorites,
  watchLater,
  userRatings,
  triggers
}: SharedWatchlistBannerProps) {
  return (
    <div className="bg-accent/20 border border-accent rounded-lg p-6 space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-accent text-accent-foreground p-2 rounded-lg">
            <Eye size={24} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Shared Watchlist
            </h2>
            <p className="text-sm text-muted-foreground">
              {sharedMovies.length} movie{sharedMovies.length === 1 ? '' : 's'} to watch
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="shrink-0"
        >
          <X size={20} />
        </Button>
      </div>

      <ScrollArea className="w-full">
        <div className="flex gap-4 pb-4 touch-pan-x">
          {sharedMovies.map((movie) => (
            <div key={movie.id} className="w-[200px] shrink-0">
              <MovieCard
                movie={movie}
                userRating={userRatings[movie.id]}
                isFavorite={favorites.includes(movie.id)}
                isWatchLater={watchLater.includes(movie.id)}
                onToggleFavorite={() => onToggleFavorite(movie.id)}
                onToggleWatchLater={() => onToggleWatchLater(movie.id)}
                onClick={() => onMovieClick(movie.id)}
                triggers={triggers[movie.id]}
              />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
