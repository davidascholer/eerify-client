import { Movie, TriggerRatings, TRIGGER_INFO } from '../lib/types'
import { getImageUrl } from '../api/tmdb'
import { getTriggerDataForMovie } from '../lib/triggerData'
import { getLanguageName } from '../lib/languages'
import { Star, StarHalf, CaretDown, Eye, EyeClosed, Warning, ShieldWarning, ShieldCheck, Calendar, Clock, Globe } from '@phosphor-icons/react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { FavoriteIcon } from './FavoriteIcon'
import { useDevTools } from './DevTools'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

interface MovieCardProps {
  movie: Movie
  userRating?: number
  isFavorite?: boolean
  isWatchLater?: boolean
  onToggleFavorite?: () => void
  onToggleWatchLater?: () => void
  onClick: () => void
  triggers?: TriggerRatings
  showLanguage?: boolean
  isFocused?: boolean
}

const getTriggerColor = (intensity: number | null) => {
  if (intensity === null) return 'bg-muted'
  if (intensity >= 0 && intensity <= 1) return 'bg-green-600'
  if (intensity >= 2 && intensity <= 3) return 'bg-yellow-500'
  return 'bg-accent'
}

const getTriggerLabel = (intensity: number | null) => {
  if (intensity === null) return 'No Review'
  return intensity.toString()
}

const getTriggerButtonInfo = (triggers: TriggerRatings) => {
  const values = Object.values(triggers).filter((val): val is number => val !== null)
  
  if (values.length === 0) {
    return {
      text: 'No triggers set...',
      bgColor: 'bg-muted',
      borderColor: 'border-border',
      hoverColor: 'hover:bg-muted/80',
      textColor: 'text-muted-foreground',
      icon: null,
    }
  }
  
  const maxValue = Math.max(...values)
  
  if (maxValue >= 4) {
    return {
      text: 'WARNING',
      bgColor: 'bg-red-600',
      borderColor: 'border-red-700',
      hoverColor: 'hover:bg-red-500',
      textColor: 'text-white',
      icon: Warning,
    }
  }
  
  if (maxValue >= 2) {
    return {
      text: 'CAUTION',
      bgColor: 'bg-yellow-500',
      borderColor: 'border-yellow-600',
      hoverColor: 'hover:bg-yellow-400',
      textColor: 'text-white',
      icon: ShieldWarning,
    }
  }
  
  return {
    text: 'LOW RISK',
    bgColor: 'bg-green-600',
    borderColor: 'border-green-700',
    hoverColor: 'hover:bg-green-500',
    textColor: 'text-white',
    icon: ShieldCheck,
  }
}

const renderStars = (rating: number) => {
  const stars = Math.floor(rating / 2)
  const hasHalf = rating % 2 >= 1
  const elements: React.ReactElement[] = []

  for (let i = 0; i < stars; i++) {
    elements.push(<Star key={`star-${i}`} weight="fill" className="text-primary" />)
  }

  if (hasHalf && stars < 5) {
    elements.push(<StarHalf key="star-half" weight="fill" className="text-primary" />)
  }

  const remaining = 5 - elements.length
  for (let i = 0; i < remaining; i++) {
    elements.push(<Star key={`star-empty-${i}`} className="text-muted-foreground/30" />)
  }

  return elements
}

export function MovieCard({
  movie,
  userRating,
  isFavorite,
  isWatchLater,
  onToggleFavorite,
  onToggleWatchLater,
  onClick,
  triggers,
  showLanguage = false,
  isFocused = false,
}: MovieCardProps) {
  const posterUrl = getImageUrl(movie.poster_path, 'w342')
  const displayRating = userRating ?? movie.vote_average
  const globalTriggers = getTriggerDataForMovie(movie.id)
  const triggerButtonInfo = getTriggerButtonInfo(globalTriggers)
  const { isDevToolsEnabled, copyToClipboard } = useDevTools()

  const handleCardClick = () => {
    if (isDevToolsEnabled) {
      copyToClipboard(movie, `Movie: ${movie.title}`)
    }
    onClick()
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group flex-shrink-0 w-full cursor-pointer"
      data-movie-card
      animate={isFocused ? { scale: 1.05 } : { scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className={`overflow-hidden bg-card border-border hover:border-primary/50 transition-all hover:shadow-[0_8px_30px_rgb(0,126,210,0.3)] ${
          isFocused ? 'ring-4 ring-primary shadow-[0_8px_30px_rgb(0,126,210,0.5)]' : ''
        }`}
        onClick={handleCardClick}
      >
        <div className="relative aspect-[2/3] bg-secondary overflow-hidden">
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={movie.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm text-center p-4">
              {movie.title}
            </div>
          )}
          {movie.original_language && movie.original_language.toLowerCase() !== 'en' && (
            <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 bg-black/80 rounded-md">
              <Globe weight="fill" className="text-white" size={14} />
              <span className="text-white text-xs font-semibold uppercase">
                {getLanguageName(movie.original_language)}
              </span>
            </div>
          )}
          {onToggleFavorite && (
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onToggleFavorite()
                  if (isFavorite) {
                    toast.success(`Removed "${movie.title}" from Favorites`)
                  } else {
                    toast.success(`Added "${movie.title}" to Favorites`)
                  }
                }}
                className="p-2 bg-black/60 rounded-full hover:bg-black/80 transition-colors cursor-pointer"
                title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              >
                <FavoriteIcon isFavorite={isFavorite} size={20} />
              </button>
            </div>
          )}
        </div>
      </Card>

      <div className="mt-2 space-y-2" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-sm font-medium text-foreground line-clamp-2 leading-tight">
          {movie.title}
        </h3>

        <div className="space-y-2">
          <div className="flex items-center gap-1 text-xs">
            {renderStars(displayRating)}
            <span className="ml-1 text-muted-foreground">
              {displayRating.toFixed(1)}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {movie.release_date && (
              <div className="flex items-center gap-1">
                <Calendar size={14} weight="bold" />
                <span>{new Date(movie.release_date).getFullYear()}</span>
              </div>
            )}
            {movie.runtime && (
              <div className="flex items-center gap-1">
                <Clock size={14} weight="bold" />
                <span>{movie.runtime}m</span>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex-1 min-w-0 cursor-pointer">
                <div className={`flex items-center justify-center gap-2 px-3 py-2 ${triggerButtonInfo.bgColor} rounded-md ${triggerButtonInfo.hoverColor} transition-colors border-2 ${triggerButtonInfo.borderColor} text-xs shadow-md w-full`}>
                  {triggerButtonInfo.icon && <triggerButtonInfo.icon weight="fill" className={triggerButtonInfo.textColor} size={16} />}
                  <span className={`${triggerButtonInfo.textColor} uppercase tracking-wider font-bold truncate`}>
                    {triggerButtonInfo.text}
                  </span>
                  <CaretDown className={`${triggerButtonInfo.textColor} shrink-0`} size={14} />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[240px] p-3 bg-popover border-border">
                <div className="space-y-2">
                  {(Object.keys(globalTriggers) as Array<keyof TriggerRatings>).map((key) => {
                    const info = TRIGGER_INFO[key]
                    const intensity = globalTriggers[key]
                    return (
                      <div key={key} className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="text-xs font-semibold text-foreground uppercase tracking-wide">
                            {info.label}
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            {info.description}
                          </div>
                        </div>
                        <Badge
                          className={`${getTriggerColor(intensity)} ${intensity === null ? 'text-muted-foreground' : 'text-white'} shrink-0 text-xs px-2`}
                        >
                          {getTriggerLabel(intensity)}
                        </Badge>
                      </div>
                    )
                  })}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            {onToggleWatchLater && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onToggleWatchLater()
                  if (isWatchLater) {
                    toast.success(`Removed "${movie.title}" from Watch Later`)
                  } else {
                    toast.success(`Added "${movie.title}" to Watch Later`)
                  }
                }}
                className="px-3 py-2 rounded-md hover:bg-primary/80 transition-colors border-2 border-primary shadow-md shrink-0 cursor-pointer"
                title={isWatchLater ? "Remove from Watch Later" : "Add to Watch Later"}
              >
                {isWatchLater ? (
                  <Eye weight="fill" className="text-primary-foreground" size={16} />
                ) : (
                  <EyeClosed className="text-primary-foreground" size={16} />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
