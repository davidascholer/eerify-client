import { Movie, TriggerRatings } from '@/lib/types'
import { MovieCard } from './MovieCard'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { ArrowRight, DotsSixVertical } from '@phosphor-icons/react'
import { motion, Reorder, useDragControls } from 'framer-motion'
import { useState, useEffect } from 'react'

interface DraggableMovieListProps {
  title: string
  movies: Movie[]
  userRatings?: Record<number, number>
  favorites?: number[]
  watchLater?: number[]
  onToggleFavorite?: (movieId: number) => void
  onToggleWatchLater?: (movieId: number) => void
  onMovieClick: (movieId: number) => void
  triggers?: Record<number, TriggerRatings>
  onTitleClick?: () => void
  showLanguage?: boolean
  totalCount?: number
  onReorder: (reorderedMovies: Movie[]) => void
}

function DraggableMovieItem({
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
  onToggleFavorite?: (movieId: number) => void
  onToggleWatchLater?: (movieId: number) => void
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
      className="w-[200px] flex-shrink-0 relative group/drag"
    >
      <motion.div
        className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover/drag:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
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
        onToggleFavorite={onToggleFavorite ? () => onToggleFavorite(movie.id) : undefined}
        onToggleWatchLater={onToggleWatchLater ? () => onToggleWatchLater(movie.id) : undefined}
        onClick={() => onMovieClick(movie.id)}
        triggers={triggers[movie.id]}
        showLanguage={showLanguage}
      />
    </Reorder.Item>
  )
}

export function DraggableMovieList({
  title,
  movies,
  userRatings = {},
  favorites = [],
  watchLater = [],
  onToggleFavorite,
  onToggleWatchLater,
  onMovieClick,
  triggers = {},
  onTitleClick,
  showLanguage = false,
  totalCount,
  onReorder,
}: DraggableMovieListProps) {
  const [localMovies, setLocalMovies] = useState(movies)

  useEffect(() => {
    setLocalMovies(movies)
  }, [movies])

  const handleReorder = (newOrder: Movie[]) => {
    setLocalMovies(newOrder)
    onReorder(newOrder)
  }

  const showViewAll = totalCount !== undefined && totalCount > 20

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h2 
          className={`text-2xl font-bold text-foreground tracking-tight ${
            onTitleClick ? 'cursor-pointer hover:text-primary transition-colors' : ''
          }`}
          onClick={onTitleClick}
        >
          {title}
        </h2>
        {showViewAll && onTitleClick && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onTitleClick}
            className="gap-2"
          >
            View All
            <ArrowRight size={16} />
          </Button>
        )}
      </div>
      <ScrollArea className="w-full whitespace-nowrap touch-pan-x">
        <Reorder.Group
          axis="x"
          values={localMovies}
          onReorder={handleReorder}
          className="flex gap-4 py-2 pb-6"
        >
          {localMovies.map((movie) => (
            <DraggableMovieItem
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
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
