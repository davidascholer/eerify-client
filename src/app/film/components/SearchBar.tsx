import { useState, useEffect, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { MagnifyingGlass, X } from '@phosphor-icons/react'
import { Movie } from '../lib/types'
import { searchHorrorMovies, getImageUrl } from '../api/tmdb'
import { Card } from '@/components/ui/card'

interface SearchBarProps {
  onMovieSelect: (movieId: number) => void
}

export function SearchBar({ onMovieSelect }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<Movie[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const searchMovies = async () => {
      if (query.trim().length < 2) {
        setSuggestions([])
        setIsOpen(false)
        return
      }

      setIsLoading(true)
      const results = await searchHorrorMovies(query)
      
      setSuggestions(results.slice(0, 8))
      setIsOpen(results.length > 0)
      setIsLoading(false)
    }

    const debounceTimer = setTimeout(searchMovies, 300)
    return () => clearTimeout(debounceTimer)
  }, [query])

  const handleMovieClick = (movieId: number) => {
    onMovieSelect(movieId)
    setQuery('')
    setSuggestions([])
    setIsOpen(false)
  }

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      <div className="relative">
        <MagnifyingGlass
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          size={20}
        />
        <Input
          type="text"
          placeholder="Search horror movies by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-12 pr-10 h-12 bg-card border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('')
              setSuggestions([])
              setIsOpen(false)
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {isOpen && suggestions.length > 0 && (
        <Card className="absolute top-full mt-2 w-full max-h-96 overflow-y-auto z-50 bg-card border-border shadow-lg">
          {suggestions.map((movie) => (
            <button
              key={movie.id}
              onClick={() => handleMovieClick(movie.id)}
              className="w-full p-3 flex items-center gap-3 hover:bg-muted transition-colors cursor-pointer border-b border-border last:border-b-0"
            >
              <div className="w-12 h-16 rounded overflow-hidden flex-shrink-0 bg-muted">
                {movie.poster_path ? (
                  <img
                    src={getImageUrl(movie.poster_path, 'w185') || ''}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                    No Image
                  </div>
                )}
              </div>
              <div className="flex-1 text-left">
                <div className="font-semibold text-foreground text-sm">{movie.title}</div>
                <div className="text-xs text-muted-foreground">
                  {movie.release_date?.split('-')[0] || 'Unknown'} • ⭐{' '}
                  {movie.vote_average.toFixed(1)}
                </div>
              </div>
            </button>
          ))}
        </Card>
      )}

      {isLoading && query.length >= 2 && (
        <div className="absolute top-full mt-2 w-full bg-card border-border rounded-lg p-4 text-center text-muted-foreground text-sm">
          Searching...
        </div>
      )}
    </div>
  )
}
