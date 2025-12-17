import { Movie, TriggerRatings } from '../lib/types'
import { MovieCard } from './MovieCard'
import { MovieCardSkeleton } from './MovieCardSkeleton'
import { MovieListHeader } from './MovieListHeader'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useIntersectionObserver } from '../hooks/use-intersection-observer'
import { useKeyboardNavigation } from '../hooks/use-keyboard-navigation'
import { useEffect, useRef } from 'react'

interface MovieListProps {
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
  onLoadMore?: () => void
  hasMore?: boolean
  isLoadingMore?: boolean
  totalCount?: number
  isLoading?: boolean
}

export function MovieList({
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
  onLoadMore,
  hasMore = false,
  isLoadingMore = false,
  totalCount,
  isLoading = false,
}: MovieListProps) {
  const { ref: loadMoreRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.5,
    rootMargin: '200px',
  })

  const containerRef = useRef<HTMLDivElement>(null)

  const { focusedIndex } = useKeyboardNavigation({
    itemCount: movies.length,
    onSelect: (index) => {
      if (movies[index]) {
        onMovieClick(movies[index].id)
      }
    },
    containerRef,
    enabled: !isLoading && movies.length > 0,
    orientation: 'horizontal',
  })

  useEffect(() => {
    if (isIntersecting && hasMore && !isLoadingMore && onLoadMore) {
      onLoadMore()
    }
  }, [isIntersecting, hasMore, isLoadingMore, onLoadMore])

  return (
    <div className="space-y-4">
      <MovieListHeader 
        title={title}
        onViewAll={onTitleClick}
        totalCount={totalCount}
      />
      <ScrollArea className="w-full whitespace-nowrap touch-pan-x">
        <div ref={containerRef} className="flex gap-4 py-2 pb-6">
          {isLoading ? (
            Array.from({ length: 10 }).map((_, index) => (
              <div key={`skeleton-${index}`} className="w-[200px] flex-shrink-0">
                <MovieCardSkeleton />
              </div>
            ))
          ) : (
            <>
              {movies.map((movie, index) => (
                <div key={movie.id} className="w-[200px] flex-shrink-0">
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
                    isFocused={focusedIndex === index}
                  />
                </div>
              ))}
              {isLoadingMore && (
                Array.from({ length: 5 }).map((_, index) => (
                  <div key={`loading-skeleton-${index}`} className="w-[200px] flex-shrink-0">
                    <MovieCardSkeleton />
                  </div>
                ))
              )}
              {hasMore && onLoadMore && !isLoadingMore && (
                <div 
                  ref={loadMoreRef}
                  className="w-[200px] flex-shrink-0 flex items-center justify-center"
                >
                  <div className="h-full min-h-[300px] w-full flex items-center justify-center">
                    <div className="text-sm text-muted-foreground">
                      {isLoadingMore ? 'Loading more...' : ''}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
