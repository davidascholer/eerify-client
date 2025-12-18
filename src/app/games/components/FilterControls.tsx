import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { X } from '@phosphor-icons/react'
import type { Genre, Platform } from '../lib/types'

interface FilterControlsProps {
  genres: Genre[]
  platforms: Platform[]
  selectedGenre: string
  selectedPlatform: string
  onGenreChange: (value: string) => void
  onPlatformChange: (value: string) => void
  onClearFilters: () => void
}

export function FilterControls({
  genres,
  platforms,
  selectedGenre,
  selectedPlatform,
  onGenreChange,
  onPlatformChange,
  onClearFilters,
}: FilterControlsProps) {
  const hasActiveFilters = selectedGenre !== 'all' || selectedPlatform !== 'all'

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
      <Select value={selectedGenre} onValueChange={onGenreChange}>
        <SelectTrigger className="w-full sm:w-48 bg-card border-border">
          <SelectValue placeholder="All Genres" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Genres</SelectItem>
          {genres.map((genre) => (
            <SelectItem key={genre.id} value={String(genre.id)}>
              {genre.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedPlatform} onValueChange={onPlatformChange}>
        <SelectTrigger className="w-full sm:w-48 bg-card border-border">
          <SelectValue placeholder="All Platforms" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Platforms</SelectItem>
          {platforms.map((platform) => (
            <SelectItem key={platform.id} value={String(platform.id)}>
              {platform.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <Button
          variant="outline"
          size="icon"
          onClick={onClearFilters}
          className="shrink-0"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
