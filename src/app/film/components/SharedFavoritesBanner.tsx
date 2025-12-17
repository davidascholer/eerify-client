import { Movie } from '../lib/types'
import { MovieList } from './MovieList'
import { TriggerRatings } from '../lib/types'
import { X } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'

interface SharedFavoritesBannerProps {
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

export function SharedFavoritesBanner({
  sharedMovies,
  onClose,
  onMovieClick,
  onToggleFavorite,
  onToggleWatchLater,
  favorites,
  watchLater,
  userRatings,
  triggers,
}: SharedFavoritesBannerProps) {
  return (
    <div className="bg-card border-b border-border">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <span className="text-primary">📬</span>
              Shared Favorites
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              A friend shared {sharedMovies.length} horror movie{sharedMovies.length === 1 ? '' : 's'} with you
            </p>
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
        <MovieList
          title=""
          movies={sharedMovies}
          userRatings={userRatings}
          favorites={favorites}
          watchLater={watchLater}
          onToggleFavorite={onToggleFavorite}
          onToggleWatchLater={onToggleWatchLater}
          onMovieClick={onMovieClick}
          triggers={triggers}
          totalCount={sharedMovies.length}
        />
      </div>
    </div>
  )
}
