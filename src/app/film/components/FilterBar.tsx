import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import {
  SortAscending,
  SortDescending,
  CaretDown,
  Warning,
  X,
  Globe,
  Clock,
  FilmSlate,
  Calendar,
  Star,
  ArrowsClockwise,
} from '@phosphor-icons/react'
import { TriggerRatings, TRIGGER_INFO } from '../lib/types'
import { LANGUAGE_NAMES } from '../lib/languages'
import { COMMON_HORROR_SUBGENRES, HorrorSubgenre } from '../lib/genres'

export type SortOption =
  | 'rating-desc'
  | 'rating-asc'
  | 'date-desc'
  | 'date-asc'
  | 'title-asc'
  | 'title-desc'

export type TriggerIntensity = 'low' | 'moderate' | 'high'

export type RuntimeFilter = 'short' | 'medium' | 'long' | null

export type RatingFilter = 'high' | 'medium' | 'low' | null

export type YearRange = {
  start: number
  end: number
  label: string
}

export interface FilterOptions {
  sortBy: SortOption
  triggerFilter: keyof TriggerRatings | null
  triggerIntensity: TriggerIntensity
  languageFilter: string | null
  runtimeFilter: RuntimeFilter
  genreFilter: HorrorSubgenre | null
  yearRange: YearRange | null
  ratingFilter: RatingFilter
}

interface FilterBarProps {
  filters: FilterOptions
  onFilterChange: (filters: FilterOptions) => void
}

const SORT_OPTIONS: { value: SortOption; label: string; icon: React.ReactNode }[] = [
  {
    value: 'rating-desc',
    label: 'Rating: High to Low',
    icon: <SortDescending size={16} />,
  },
  {
    value: 'rating-asc',
    label: 'Rating: Low to High',
    icon: <SortAscending size={16} />,
  },
  {
    value: 'date-desc',
    label: 'Date: Newest First',
    icon: <SortDescending size={16} />,
  },
  {
    value: 'date-asc',
    label: 'Date: Oldest First',
    icon: <SortAscending size={16} />,
  },
  {
    value: 'title-asc',
    label: 'Title: A to Z',
    icon: <SortAscending size={16} />,
  },
  {
    value: 'title-desc',
    label: 'Title: Z to A',
    icon: <SortDescending size={16} />,
  },
]

const YEAR_RANGES: YearRange[] = [
  { start: 2020, end: 2029, label: '2020s' },
  { start: 2010, end: 2019, label: '2010s' },
  { start: 2000, end: 2009, label: '2000s' },
  { start: 1990, end: 1999, label: '1990s' },
  { start: 1980, end: 1989, label: '1980s' },
  { start: 1970, end: 1979, label: '1970s' },
  { start: 1960, end: 1969, label: '1960s' },
  { start: 1950, end: 1959, label: '1950s' },
  { start: 1900, end: 1949, label: 'Classic (Pre-1950)' },
]

export function FilterBar({ filters, onFilterChange }: FilterBarProps) {
  const [intensityDialogOpen, setIntensityDialogOpen] = useState(false)
  const [selectedTriggerForDialog, setSelectedTriggerForDialog] = useState<keyof TriggerRatings | null>(null)

  const selectedSort = SORT_OPTIONS.find((opt) => opt.value === filters.sortBy)
  const selectedTrigger = filters.triggerFilter
    ? TRIGGER_INFO[filters.triggerFilter]
    : null
  const selectedLanguage = filters.languageFilter
    ? LANGUAGE_NAMES[filters.languageFilter] || filters.languageFilter.toUpperCase()
    : null
  const selectedGenre = filters.genreFilter
    ? COMMON_HORROR_SUBGENRES.find(g => g.id === filters.genreFilter)
    : null

  const handleSortChange = (sortBy: SortOption) => {
    onFilterChange({ ...filters, sortBy })
  }

  const handleTriggerClick = (trigger: keyof TriggerRatings) => {
    setSelectedTriggerForDialog(trigger)
    setIntensityDialogOpen(true)
  }

  const handleTriggerChange = (trigger: keyof TriggerRatings | null) => {
    onFilterChange({ ...filters, triggerFilter: trigger })
  }

  const handleIntensitySelect = (intensity: TriggerIntensity) => {
    if (selectedTriggerForDialog) {
      onFilterChange({ 
        ...filters, 
        triggerFilter: selectedTriggerForDialog,
        triggerIntensity: intensity 
      })
    }
    setIntensityDialogOpen(false)
    setSelectedTriggerForDialog(null)
  }

  const handleIntensityChange = (intensity: TriggerIntensity) => {
    onFilterChange({ ...filters, triggerIntensity: intensity })
  }

  const handleLanguageChange = (language: string | null) => {
    onFilterChange({ ...filters, languageFilter: language })
  }

  const handleRuntimeChange = (runtime: RuntimeFilter) => {
    onFilterChange({ ...filters, runtimeFilter: runtime })
  }

  const handleGenreChange = (genreId: HorrorSubgenre | null) => {
    onFilterChange({ ...filters, genreFilter: genreId })
  }

  const handleYearRangeChange = (yearRange: YearRange | null) => {
    onFilterChange({ ...filters, yearRange })
  }

  const handleRatingFilterChange = (rating: RatingFilter) => {
    onFilterChange({ ...filters, ratingFilter: rating })
  }

  const getIntensityLabel = (intensity: TriggerIntensity) => {
    switch (intensity) {
      case 'low':
        return 'Low (0-1)'
      case 'moderate':
        return 'Moderate (2-3)'
      case 'high':
        return 'High (4-5)'
    }
  }

  const getIntensityColor = (intensity: TriggerIntensity) => {
    switch (intensity) {
      case 'low':
        return 'bg-green-600 hover:bg-green-500 border-green-700'
      case 'moderate':
        return 'bg-yellow-600 hover:bg-yellow-500 border-yellow-700'
      case 'high':
        return 'bg-red-600 hover:bg-red-500 border-red-700'
    }
  }

  const getRuntimeLabel = (runtime: RuntimeFilter) => {
    switch (runtime) {
      case 'short':
        return 'Short (< 90 min)'
      case 'medium':
        return 'Medium (90-120 min)'
      case 'long':
        return 'Long (> 120 min)'
      default:
        return 'Filter by Runtime'
    }
  }

  const getRatingLabel = (rating: RatingFilter) => {
    switch (rating) {
      case 'high':
        return 'Highly Rated (7.0+)'
      case 'medium':
        return 'Well Rated (5.0-6.9)'
      case 'low':
        return 'Lower Rated (< 5.0)'
      default:
        return 'Filter by Rating'
    }
  }

  const getActiveFilterCount = () => {
    let count = 0
    if (filters.triggerFilter !== null) count++
    if (filters.languageFilter !== null) count++
    if (filters.runtimeFilter !== null) count++
    if (filters.genreFilter !== null) count++
    if (filters.yearRange !== null) count++
    if (filters.ratingFilter !== null) count++
    return count
  }

  const hasActiveFilters = () => {
    return getActiveFilterCount() > 0
  }

  const handleResetFilters = () => {
    onFilterChange({
      ...filters,
      triggerFilter: null,
      triggerIntensity: 'low',
      languageFilter: null,
      runtimeFilter: null,
      genreFilter: null,
      yearRange: null,
      ratingFilter: null,
    })
  }

  return (
    <>
    <div className="flex flex-wrap items-center gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="bg-card border-border hover:border-primary hover:bg-card/80 cursor-pointer"
          >
            {selectedSort?.icon}
            <span className="ml-2">Sort</span>
            <CaretDown className="ml-2" size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuLabel>Sort By</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {SORT_OPTIONS.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => handleSortChange(option.value)}
              className="cursor-pointer"
            >
              <span className="mr-2">{option.icon}</span>
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className={`border-border hover:bg-card/80 cursor-pointer ${
              hasActiveFilters()
                ? 'bg-primary hover:bg-primary/90 border-primary text-primary-foreground hover:text-primary-foreground'
                : 'bg-card hover:border-primary'
            }`}
          >
            <FilmSlate weight="fill" size={16} />
            <span className="ml-2">Filters</span>
            {hasActiveFilters() && (
              <Badge 
                className="ml-2 rounded-full h-5 w-5 p-0 flex items-center justify-center text-xs bg-background text-foreground"
              >
                {getActiveFilterCount()}
              </Badge>
            )}
            <CaretDown className="ml-2" size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-80 max-h-[600px] overflow-y-auto">
          <DropdownMenuLabel className="text-base">Filter Movies</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <div className="px-2 py-2">
            <DropdownMenuLabel className="text-xs text-muted-foreground px-2 py-1">
              RATING
            </DropdownMenuLabel>
            <div className="space-y-1">
              <DropdownMenuItem
                onClick={() => handleRatingFilterChange('high')}
                className={`cursor-pointer ${filters.ratingFilter === 'high' ? 'bg-accent' : ''}`}
              >
                <Star weight="fill" size={16} className="mr-2" />
                Highly Rated (7.0+)
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleRatingFilterChange('medium')}
                className={`cursor-pointer ${filters.ratingFilter === 'medium' ? 'bg-accent' : ''}`}
              >
                <Star weight="fill" size={16} className="mr-2" />
                Well Rated (5.0-6.9)
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleRatingFilterChange('low')}
                className={`cursor-pointer ${filters.ratingFilter === 'low' ? 'bg-accent' : ''}`}
              >
                <Star weight="fill" size={16} className="mr-2" />
                Lower Rated (&lt; 5.0)
              </DropdownMenuItem>
              {filters.ratingFilter && (
                <DropdownMenuItem
                  onClick={() => handleRatingFilterChange(null)}
                  className="cursor-pointer text-destructive"
                >
                  <X size={16} className="mr-2" />
                  Clear Rating Filter
                </DropdownMenuItem>
              )}
            </div>
          </div>

          <DropdownMenuSeparator />

          <div className="px-2 py-2">
            <DropdownMenuLabel className="text-xs text-muted-foreground px-2 py-1">
              RUNTIME
            </DropdownMenuLabel>
            <div className="space-y-1">
              <DropdownMenuItem
                onClick={() => handleRuntimeChange('short')}
                className={`cursor-pointer ${filters.runtimeFilter === 'short' ? 'bg-accent' : ''}`}
              >
                <Clock weight="fill" size={16} className="mr-2" />
                Short (&lt; 90 min)
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleRuntimeChange('medium')}
                className={`cursor-pointer ${filters.runtimeFilter === 'medium' ? 'bg-accent' : ''}`}
              >
                <Clock weight="fill" size={16} className="mr-2" />
                Medium (90-120 min)
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleRuntimeChange('long')}
                className={`cursor-pointer ${filters.runtimeFilter === 'long' ? 'bg-accent' : ''}`}
              >
                <Clock weight="fill" size={16} className="mr-2" />
                Long (&gt; 120 min)
              </DropdownMenuItem>
              {filters.runtimeFilter && (
                <DropdownMenuItem
                  onClick={() => handleRuntimeChange(null)}
                  className="cursor-pointer text-destructive"
                >
                  <X size={16} className="mr-2" />
                  Clear Runtime Filter
                </DropdownMenuItem>
              )}
            </div>
          </div>

          <DropdownMenuSeparator />

          <div className="px-2 py-2">
            <DropdownMenuLabel className="text-xs text-muted-foreground px-2 py-1">
              GENRE
            </DropdownMenuLabel>
            <div className="space-y-1 max-h-60 overflow-y-auto">
              {COMMON_HORROR_SUBGENRES.map((genre) => (
                <DropdownMenuItem
                  key={genre.id}
                  onClick={() => handleGenreChange(genre.id)}
                  className={`cursor-pointer ${filters.genreFilter === genre.id ? 'bg-accent' : ''}`}
                >
                  <FilmSlate weight="fill" size={16} className="mr-2" />
                  {genre.name}
                </DropdownMenuItem>
              ))}
              {filters.genreFilter && (
                <DropdownMenuItem
                  onClick={() => handleGenreChange(null)}
                  className="cursor-pointer text-destructive sticky bottom-0 bg-popover"
                >
                  <X size={16} className="mr-2" />
                  Clear Genre Filter
                </DropdownMenuItem>
              )}
            </div>
          </div>

          <DropdownMenuSeparator />

          <div className="px-2 py-2">
            <DropdownMenuLabel className="text-xs text-muted-foreground px-2 py-1">
              DECADE
            </DropdownMenuLabel>
            <div className="space-y-1">
              {YEAR_RANGES.map((range) => (
                <DropdownMenuItem
                  key={range.label}
                  onClick={() => handleYearRangeChange(range)}
                  className={`cursor-pointer ${filters.yearRange?.label === range.label ? 'bg-accent' : ''}`}
                >
                  <Calendar weight="fill" size={16} className="mr-2" />
                  {range.label}
                </DropdownMenuItem>
              ))}
              {filters.yearRange && (
                <DropdownMenuItem
                  onClick={() => handleYearRangeChange(null)}
                  className="cursor-pointer text-destructive"
                >
                  <X size={16} className="mr-2" />
                  Clear Decade Filter
                </DropdownMenuItem>
              )}
            </div>
          </div>

          <DropdownMenuSeparator />

          <div className="px-2 py-2">
            <DropdownMenuLabel className="text-xs text-muted-foreground px-2 py-1">
              LANGUAGE
            </DropdownMenuLabel>
            <div className="space-y-1 max-h-60 overflow-y-auto">
              {Object.entries(LANGUAGE_NAMES)
                .sort(([, nameA], [, nameB]) => nameA.localeCompare(nameB))
                .map(([code, name]) => (
                  <DropdownMenuItem
                    key={code}
                    onClick={() => handleLanguageChange(code)}
                    className={`cursor-pointer ${filters.languageFilter === code ? 'bg-accent' : ''}`}
                  >
                    <Globe weight="fill" size={16} className="mr-2" />
                    {name}
                  </DropdownMenuItem>
                ))}
              {filters.languageFilter && (
                <DropdownMenuItem
                  onClick={() => handleLanguageChange(null)}
                  className="cursor-pointer text-destructive sticky bottom-0 bg-popover"
                >
                  <X size={16} className="mr-2" />
                  Clear Language Filter
                </DropdownMenuItem>
              )}
            </div>
          </div>

          <DropdownMenuSeparator />

          <div className="px-2 py-2">
            <DropdownMenuLabel className="text-xs text-muted-foreground px-2 py-1 flex items-center gap-2">
              <Warning weight="fill" size={16} className="text-red-600" />
              TRIGGER WARNINGS
            </DropdownMenuLabel>
            <div className="space-y-1 max-h-60 overflow-y-auto">
              {(Object.keys(TRIGGER_INFO) as Array<keyof TriggerRatings>).map((key) => {
                const info = TRIGGER_INFO[key]
                return (
                  <DropdownMenuItem
                    key={key}
                    onClick={() => handleTriggerClick(key)}
                    className={`cursor-pointer flex-col items-start gap-1 py-3 ${filters.triggerFilter === key ? 'bg-accent' : ''}`}
                  >
                    <div className="font-semibold text-sm flex items-center gap-2">
                      <Warning weight="fill" size={14} />
                      {info.label}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {info.description}
                    </div>
                  </DropdownMenuItem>
                )
              })}
              {filters.triggerFilter && (
                <DropdownMenuItem
                  onClick={() => handleTriggerChange(null)}
                  className="cursor-pointer text-destructive"
                >
                  <X size={16} className="mr-2" />
                  Clear Trigger Filter
                </DropdownMenuItem>
              )}
            </div>
          </div>

          {hasActiveFilters() && (
            <>
              <DropdownMenuSeparator />
              <div className="px-2 py-2">
                <Button
                  variant="outline"
                  onClick={handleResetFilters}
                  className="w-full bg-card border-border hover:border-destructive hover:bg-destructive/10 hover:text-destructive cursor-pointer"
                >
                  <ArrowsClockwise size={16} />
                  <span className="ml-2">Reset All Filters</span>
                </Button>
              </div>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {hasActiveFilters() && (
        <div className="flex flex-wrap gap-2">
          {filters.ratingFilter && (
            <Badge
              variant="secondary"
              className="gap-2 px-3 py-1.5 cursor-pointer hover:bg-secondary/80"
              onClick={() => handleRatingFilterChange(null)}
            >
              <Star weight="fill" size={12} />
              <span>{getRatingLabel(filters.ratingFilter)}</span>
              <X size={14} />
            </Badge>
          )}
          {filters.runtimeFilter && (
            <Badge
              variant="secondary"
              className="gap-2 px-3 py-1.5 cursor-pointer hover:bg-secondary/80"
              onClick={() => handleRuntimeChange(null)}
            >
              <Clock weight="fill" size={12} />
              <span>{getRuntimeLabel(filters.runtimeFilter)}</span>
              <X size={14} />
            </Badge>
          )}
          {selectedGenre && (
            <Badge
              variant="secondary"
              className="gap-2 px-3 py-1.5 cursor-pointer hover:bg-secondary/80"
              onClick={() => handleGenreChange(null)}
            >
              <FilmSlate weight="fill" size={12} />
              <span>{selectedGenre.name}</span>
              <X size={14} />
            </Badge>
          )}
          {filters.yearRange && (
            <Badge
              variant="secondary"
              className="gap-2 px-3 py-1.5 cursor-pointer hover:bg-secondary/80"
              onClick={() => handleYearRangeChange(null)}
            >
              <Calendar weight="fill" size={12} />
              <span>{filters.yearRange.label}</span>
              <X size={14} />
            </Badge>
          )}
          {selectedLanguage && (
            <Badge
              variant="secondary"
              className="gap-2 px-3 py-1.5 cursor-pointer hover:bg-secondary/80"
              onClick={() => handleLanguageChange(null)}
            >
              <Globe weight="fill" size={12} />
              <span>{selectedLanguage}</span>
              <X size={14} />
            </Badge>
          )}
          {selectedTrigger && (
            <Badge
              className={`gap-2 px-3 py-1.5 cursor-pointer border text-white ${getIntensityColor(filters.triggerIntensity)}`}
              onClick={() => handleTriggerChange(null)}
            >
              <Warning weight="fill" size={12} />
              <span>{selectedTrigger.label} ({getIntensityLabel(filters.triggerIntensity)})</span>
              <X size={14} />
            </Badge>
          )}
        </div>
      )}
    </div>

    <Dialog open={intensityDialogOpen} onOpenChange={setIntensityDialogOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select Intensity Level</DialogTitle>
          <DialogDescription>
            {selectedTriggerForDialog && TRIGGER_INFO[selectedTriggerForDialog]?.label}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 py-4">
          <Button
            variant="outline"
            className="w-full h-auto py-4 flex-col gap-2 items-start cursor-pointer hover:bg-accent"
            onClick={() => handleIntensitySelect('low')}
          >
            <Badge className="bg-green-600 hover:bg-green-600 border-green-700 text-white">
              Low Risk
            </Badge>
            <span className="text-sm text-muted-foreground">Intensity: 0-1</span>
          </Button>
          <Button
            variant="outline"
            className="w-full h-auto py-4 flex-col gap-2 items-start cursor-pointer hover:bg-accent"
            onClick={() => handleIntensitySelect('moderate')}
          >
            <Badge className="bg-yellow-600 hover:bg-yellow-600 border-yellow-700 text-white">
              Caution
            </Badge>
            <span className="text-sm text-muted-foreground">Intensity: 2-3</span>
          </Button>
          <Button
            variant="outline"
            className="w-full h-auto py-4 flex-col gap-2 items-start cursor-pointer hover:bg-accent"
            onClick={() => handleIntensitySelect('high')}
          >
            <Badge className="bg-red-600 hover:bg-red-600 border-red-700 text-white">
              Warning
            </Badge>
            <span className="text-sm text-muted-foreground">Intensity: 4-5</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
    </>
  )
}
