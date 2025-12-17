import { Movie, TriggerRatings } from '@/lib/types'
import { MovieCard } from './MovieCard'
import { SearchBar } from './SearchBar'
import { FilterBar, FilterOptions } from './FilterBar'
import { Button } from '@/components/ui/button'
import { ArrowLeft, DotsSixVertical } from '@phosphor-icons/react'
import { motion, Reorder, useDragControls } from 'framer-motion'

interface DraggableMovieGridPageProps {
  title: string
  movies: Movie[]
  userRatings: Record<number, number>
  favorites: number[]
  watchLater: number[]
  triggers: Record<number, TriggerRatings>
  filters: FilterOptions
  onFilterChange: (filters: FilterOptions) => void
  onToggleFavorite: (movieId: number) => void
  onToggleWatchLater: (movieId: number) => void
  onMovieClick: (movieId: number) => void
  onBack: () => void
  showLanguage?: boolean
  onReorder: (reorderedMovies: Movie[]) => void
}

function DraggableGridMovieItem({
  movie,
  userRatings,
  favorites,
  watchLater,
  onToggleFavorite,
  onToggleWatchLater,
  onMovieClick,
  triggers,
  showLanguage,
}: {
  movie: Movie
  userRatings: Record<number, number>
  favorites: number[]
  watchLater: number[]
  onToggleFavorite: (movieId: number) => void
  onToggleWatchLater: (movieId: number) => void
  onMovieClick: (movieId: number) => void
  triggers: Record<number, TriggerRatings>
  showLanguage: boolean
}) {
  const dragControls = useDragControls()

  return (
    <Reorder.Item
      value={movie}
      dragListener={false}
      dragControls={dragControls}
      className="relative group/drag"
    >
      <motion.div
        className="absolute -left-3 top-2 z-10 opacity-0 group-hover/drag:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
        onPointerDown={(e) => {
          e.preventDefault()
          dragControls.start(e)
        }}
      >
        <div className="bg-primary/90 text-primary-foreground p-2 rounded-md shadow-lg backdrop-blur-sm">
          <DotsSixVertical weight="bold" size={20} />
        </div>
      </motion.div>
      <MovieCard
        movie={movie}
        userRating={userRatings[movie.id]}
        isFavorite={favorites.includes(movie.id)}
        isWatchLater={watchLater.includes(movie.id)}
        onToggleFavorite={() => onToggleFavorite(movie.id)}
        onToggleWatchLater={() => onToggleWatchLater(movie.id)}
        onClick={() => onMovieClick(movie.id)}
        triggers={triggers[movie.id]}
        showLanguage={showLanguage}
      />
    </Reorder.Item>
  )
}

export function DraggableMovieGridPage({
  title,
  movies,
  userRatings,
  favorites,
  watchLater,
  triggers,
  filters,
  onFilterChange,
  onToggleFavorite,
  onToggleWatchLater,
  onMovieClick,
  onBack,
  showLanguage = false,
  onReorder,
}: DraggableMovieGridPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="px-6 py-8 space-y-8">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={onBack}
            className="flex-shrink-0"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-4xl font-bold text-foreground tracking-tight">
            {title}
          </h1>
        </div>

        <div className="space-y-6">
          <SearchBar onMovieSelect={onMovieClick} />
          <FilterBar filters={filters} onFilterChange={onFilterChange} />
        </div>

        {movies.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">
              No movies in your Watch Later list.
            </p>
          </div>
        ) : (
          <Reorder.Group
            values={movies}
            onReorder={onReorder}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
            as="div"
          >
            {movies.map((movie) => (
              <DraggableGridMovieItem
                key={movie.id}
                movie={movie}
                userRatings={userRatings}
                favorites={favorites}
                watchLater={watchLater}
                onToggleFavorite={onToggleFavorite}
                onToggleWatchLater={onToggleWatchLater}
                onMovieClick={onMovieClick}
                triggers={triggers}
                showLanguage={showLanguage}
              />
            ))}
          </Reorder.Group>
        )}
      </div>
    </div>
  )
}
