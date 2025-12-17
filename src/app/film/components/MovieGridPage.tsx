import { Movie, TriggerRatings, UserReview } from '../lib/types'
import { MovieCard } from './MovieCard'
import { MovieCardSkeleton } from './MovieCardSkeleton'
import { SearchBar } from './SearchBar'
import { FilterBar, FilterOptions } from './FilterBar'
import { Breadcrumbs } from './Breadcrumbs'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Download } from '@phosphor-icons/react'
import { useEffect, useRef, useState } from 'react'
import { useIntersectionObserver } from '../hooks/use-intersection-observer'
import { useKeyboardNavigation } from '../hooks/use-keyboard-navigation'
import { useIsMobile } from '../hooks/use-mobile'
import { toast } from 'sonner'

interface MovieGridPageProps {
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
  onLoadMore?: () => void
  hasMore?: boolean
  isLoadingMore?: boolean
  isInitialLoading?: boolean
}

export function MovieGridPage({
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
  onLoadMore,
  hasMore = false,
  isLoadingMore = false,
  isInitialLoading = false,
}: MovieGridPageProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '200px',
  })

  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const [gridColumns, setGridColumns] = useState(6)

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth
      if (width < 640) setGridColumns(2)
      else if (width < 768) setGridColumns(3)
      else if (width < 1024) setGridColumns(4)
      else if (width < 1280) setGridColumns(5)
      else setGridColumns(6)
    }

    updateColumns()
    window.addEventListener('resize', updateColumns)
    return () => window.removeEventListener('resize', updateColumns)
  }, [])

  const { focusedIndex } = useKeyboardNavigation({
    itemCount: movies.length,
    onSelect: (index) => {
      if (movies[index]) {
        onMovieClick(movies[index].id)
      }
    },
    containerRef,
    enabled: !isInitialLoading && movies.length > 0,
    columns: gridColumns,
    orientation: 'grid',
  })

  useEffect(() => {
    if (isIntersecting && hasMore && !isLoadingMore && onLoadMore) {
      onLoadMore()
    }
  }, [isIntersecting, hasMore, isLoadingMore, onLoadMore])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleExportCollection = () => {
    const exportData = {
      exportDate: new Date().toISOString(),
      collection: title,
      movieCount: movies.length,
      movies: movies,
      filters: filters,
    }

    const jsonString = JSON.stringify(exportData, null, 2)
    const blob = new Blob([jsonString], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    const fileName = title.toLowerCase().replace(/\s+/g, '-')
    link.download = `${fileName}-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    toast.success(`${title} collection exported successfully!`)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="px-6 py-8 space-y-8">
        <div className="space-y-4">
          <Breadcrumbs
            items={[
              { label: 'Home', onClick: onBack },
              { label: title }
            ]}
          />
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={onBack}
              className="flex-shrink-0 gap-2 cursor-pointer"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </Button>
            <h1 className="text-4xl font-bold text-foreground tracking-tight flex-grow">
              {title}
            </h1>
            <Button
              variant="outline"
              onClick={handleExportCollection}
              className="flex-shrink-0 gap-2 cursor-pointer"
              disabled={movies.length === 0}
              title="Export this collection as JSON"
            >
              <Download size={20} />
              <span className="hidden sm:inline">Export</span>
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <SearchBar onMovieSelect={onMovieClick} />
          <FilterBar filters={filters} onFilterChange={onFilterChange} />
        </div>

        <div ref={containerRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {isInitialLoading ? (
            Array.from({ length: 18 }).map((_, index) => (
              <MovieCardSkeleton key={index} />
            ))
          ) : (
            movies.map((movie, index) => (
              <div key={movie.id}>
                <MovieCard
                  movie={movie}
                  isFavorite={favorites.includes(movie.id)}
                  isWatchLater={watchLater.includes(movie.id)}
                  onToggleFavorite={() => onToggleFavorite(movie.id)}
                  onToggleWatchLater={() => onToggleWatchLater(movie.id)}
                  onClick={() => onMovieClick(movie.id)}
                  userRating={userRatings[movie.id]}
                  showLanguage={showLanguage}
                  isFocused={focusedIndex === index}
                />
              </div>
            ))
          )}
        </div>

        {!isInitialLoading && movies.length === 0 && !isLoadingMore && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">
              No movies match the current filters.
            </p>
          </div>
        )}

        {!isInitialLoading && hasMore && onLoadMore && (
          <div ref={ref} className="py-8 text-center">
            {isLoadingMore && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {Array.from({ length: 6 }).map((_, index) => (
                  <MovieCardSkeleton key={index} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
