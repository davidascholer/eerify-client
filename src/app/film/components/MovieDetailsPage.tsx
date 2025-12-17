import { useState, useEffect, useCallback } from 'react'
import { Movie, MovieDetails, TriggerRatings, TRIGGER_INFO, UserReview } from '../lib/types'
import { getImageUrl, getMovieDetails, getSimilarMovies, getWatchProviders, WatchProvider } from '../api/tmdb'
import { getTriggerDataForMovie } from '../lib/triggerData'
import { fetchTriggerData } from '../api/triggers'
import { generateAmazonLink, generateAmazonPrimeVideoLink, generateAmazonRentBuyLink } from '../lib/amazonLink'
import { detectMovieSubgenres, HORROR_SUBGENRE_DEFINITIONS } from '../lib/genres'
import { getLanguageName } from '../lib/languages'
import { ArrowLeft, Star, Eye, EyeClosed, ShoppingCart, CheckCircle, Warning, WarningCircle, Globe, ShareNetwork, TelevisionSimple } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Slider } from '@/components/ui/slider'
import { CreepsterButton } from './CreepsterButton'
import { FavoriteIcon } from './FavoriteIcon'
import { Breadcrumbs } from './Breadcrumbs'
import { ShareMovieDialog } from './ShareMovieDialog'
import { WhereToWatchDialog } from './WhereToWatchDialog'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { cn } from '../lib/utils'

interface MovieDetailsPageProps {
  movieId: number
  onBack: () => void
  onSaveReview: (review: UserReview) => void
  existingReview?: UserReview
  allReviews?: UserReview[]
  isFavorite?: boolean
  onToggleFavorite?: () => void
  isWatchLater?: boolean
  onToggleWatchLater?: () => void
  onMovieClick?: (movieId: number) => void
  favorites?: number[]
  watchLater?: number[]
  userRatings?: Record<number, number>
  triggers?: Record<number, TriggerRatings>
}

const DEFAULT_TRIGGERS: TriggerRatings = {
  doesTheDogDie: null,
  jumpScare: null,
  blood: null,
  bodyHorror: null,
  surgery: null,
  isolation: null,
  doom: null,
  possession: null,
  torture: null,
  claustrophobia: null,
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

const getSliderTriggerColor = (value: number) => {
  if (value === 3) return 'bg-muted'
  if (value >= 0 && value <= 1) return 'bg-green-600'
  if (value === 2 || value === 4) return 'bg-yellow-500'
  if (value >= 5 && value <= 6) return 'bg-accent'
  return 'bg-muted'
}

const getSliderTriggerLabel = (value: number) => {
  if (value === 3) return 'No Review'
  if (value <= 3) return value.toString()
  return (value - 1).toString()
}

const getSliderDisplayValue = (value: number) => {
  if (value === 3) return null
  if (value <= 3) return value
  return value - 1
}

export function MovieDetailsPage({
  movieId,
  onBack,
  onSaveReview,
  existingReview,
  allReviews = [],
  isFavorite,
  onToggleFavorite,
  isWatchLater,
  onToggleWatchLater,
  onMovieClick,
  favorites = [],
  watchLater = [],
  userRatings = {},
  triggers = {},
}: MovieDetailsPageProps) {
  const [movie, setMovie] = useState<MovieDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [rating, setRating] = useState<number | null>(existingReview?.rating ?? null)
  const [reviewText, setReviewText] = useState(existingReview?.reviewText ?? '')
  const [apiTriggerData, setApiTriggerData] = useState<TriggerRatings | null>(null)
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([])
  const [loadingSimilar, setLoadingSimilar] = useState(false)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [whereToWatchOpen, setWhereToWatchOpen] = useState(false)
  const [amazonProviders, setAmazonProviders] = useState<{
    stream?: WatchProvider[]
    rent?: WatchProvider[]
    buy?: WatchProvider[]
  }>({})
  
  const REVIEW_CHARACTER_LIMIT = 500
  
  const convertOldToNewTrigger = (oldValue: number | null): number => {
    if (oldValue === null) return 3
    if (oldValue === 0) return 1
    if (oldValue === 1) return 4
    return 6
  }
  
  const convertNewToOldTrigger = (newValue: number): number | null => {
    if (newValue === 3) return null
    if (newValue >= 0 && newValue <= 1) return 0
    if (newValue === 2 || newValue === 4) return 1
    return 2
  }
  
  const [triggerSliderValues, setTriggerSliderValues] = useState<Record<keyof TriggerRatings, number>>(() => {
    const initial: Record<keyof TriggerRatings, number> = {
      doesTheDogDie: 3,
      jumpScare: 3,
      blood: 3,
      bodyHorror: 3,
      surgery: 3,
      isolation: 3,
      doom: 3,
      possession: 3,
      torture: 3,
      claustrophobia: 3,
    }
    if (existingReview?.triggers) {
      Object.keys(initial).forEach((key) => {
        const k = key as keyof TriggerRatings
        initial[k] = convertOldToNewTrigger(existingReview.triggers![k])
      })
    }
    return initial
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [movieId])

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true)
      const data = await getMovieDetails(movieId)
      setMovie(data)
      setLoading(false)
    }
    fetchMovie()
  }, [movieId])

  // TODO: Integrate real user-auth; currentUserId stays null

  useEffect(() => {
    const fetchApiTriggers = async () => {
      const triggerData = await fetchTriggerData(movieId)
      if (triggerData) {
        setApiTriggerData(triggerData)
      }
    }
    fetchApiTriggers()
  }, [movieId])

  useEffect(() => {
    const fetchSimilar = async () => {
      setLoadingSimilar(true)
      const similar = await getSimilarMovies(movieId)
      setSimilarMovies(similar)
      setLoadingSimilar(false)
    }
    fetchSimilar()
  }, [movieId])

  useEffect(() => {
    const fetchAmazonProviders = async () => {
      const providers = await getWatchProviders(movieId)
      if (providers) {
        const isAmazonProvider = (provider: WatchProvider) => 
          provider.provider_name.toLowerCase().includes('amazon') ||
          provider.provider_name.toLowerCase().includes('prime video')
        
        const amazonData: typeof amazonProviders = {}
        
        if (providers.flatrate) {
          const amazonStream = providers.flatrate.filter(isAmazonProvider)
          if (amazonStream.length > 0) amazonData.stream = amazonStream
        }
        
        if (providers.rent) {
          const amazonRent = providers.rent.filter(isAmazonProvider)
          if (amazonRent.length > 0) amazonData.rent = amazonRent
        }
        
        if (providers.buy) {
          const amazonBuy = providers.buy.filter(isAmazonProvider)
          if (amazonBuy.length > 0) amazonData.buy = amazonBuy
        }
        
        setAmazonProviders(amazonData)
      }
    }
    fetchAmazonProviders()
  }, [movieId])

  useEffect(() => {
    const resizeObserverErrHandler = (e: ErrorEvent) => {
      if (e.message === 'ResizeObserver loop completed with undelivered notifications.' || 
          e.message === 'ResizeObserver loop limit exceeded') {
        e.stopImmediatePropagation()
        return true
      }
    }
    window.addEventListener('error', resizeObserverErrHandler)
    return () => window.removeEventListener('error', resizeObserverErrHandler)
  }, [])

  const handleSaveReview = () => {
    if (reviewText.trim() && rating === null) {
      toast.error('Please provide a rating if you write a review')
      return
    }

    const convertedTriggers: TriggerRatings = {
      doesTheDogDie: convertNewToOldTrigger(triggerSliderValues.doesTheDogDie),
      jumpScare: convertNewToOldTrigger(triggerSliderValues.jumpScare),
      blood: convertNewToOldTrigger(triggerSliderValues.blood),
      bodyHorror: convertNewToOldTrigger(triggerSliderValues.bodyHorror),
      surgery: convertNewToOldTrigger(triggerSliderValues.surgery),
      isolation: convertNewToOldTrigger(triggerSliderValues.isolation),
      doom: convertNewToOldTrigger(triggerSliderValues.doom),
      possession: convertNewToOldTrigger(triggerSliderValues.possession),
      torture: convertNewToOldTrigger(triggerSliderValues.torture),
      claustrophobia: convertNewToOldTrigger(triggerSliderValues.claustrophobia),
    }

    const review: UserReview = {
      movieId,
      rating: rating ?? undefined,
      reviewText: reviewText.trim() || undefined,
      triggers: Object.values(convertedTriggers).some(v => v !== null) ? convertedTriggers : undefined,
      createdAt: new Date().toISOString(),
    }

    onSaveReview(review)
    toast.success('Review saved successfully!')
  }

  const handleTriggerChange = useCallback((key: keyof TriggerRatings, value: number) => {
    setTriggerSliderValues((prev) => ({ ...prev, [key]: value }))
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground">Loading...</div>
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground">Movie not found</div>
      </div>
    )
  }

  const backdropUrl = getImageUrl(movie.backdrop_path, 'original')
  const posterUrl = getImageUrl(movie.poster_path, 'w500')
  const trailer = movie.videos?.results.find(
    (v) => v.type === 'Trailer' && v.site === 'YouTube'
  )
  const director = movie.credits?.crew.find((c) => c.job === 'Director')
  const topCast = movie.credits?.cast.slice(0, 6) || []
  
  const defaultTriggers = apiTriggerData || getTriggerDataForMovie(movieId)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-background"
    >
      <div className="relative">
        {backdropUrl && (
          <div className="relative h-[60vh] overflow-hidden">
            <img
              src={backdropUrl}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          </div>
        )}

        <div className="absolute top-6 left-6 z-10 space-y-3">
          <Breadcrumbs
            items={[
              { label: 'Home', onClick: onBack },
              { label: movie.title }
            ]}
            variant="overlay"
          />
          <Button
            onClick={onBack}
            variant="secondary"
            className="bg-black/60 hover:bg-black/80 text-white border-none"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back
          </Button>
        </div>

        <div className="relative -mt-40 px-6 pb-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-shrink-0">
                {posterUrl && (
                  <Card className="overflow-hidden w-[300px] border-border">
                    <img
                      src={posterUrl}
                      alt={movie.title}
                      className="w-full h-auto"
                    />
                  </Card>
                )}
              </div>

              <div className="flex-1 space-y-6">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                      {movie.title}
                    </h1>
                    <div className="flex gap-2 shrink-0">
                      <Button
                        onClick={() => setShareDialogOpen(true)}
                        variant="outline"
                        size="icon"
                        title="Share this movie"
                      >
                        <ShareNetwork size={24} />
                      </Button>
                      {onToggleFavorite && (
                        <Button
                          onClick={() => {
                            onToggleFavorite()
                            if (isFavorite) {
                              toast.success(`Removed "${movie.title}" from Favorites`)
                            } else {
                              toast.success(`Added "${movie.title}" to Favorites`)
                            }
                          }}
                          variant="outline"
                          size="icon"
                          title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                        >
                          <FavoriteIcon isFavorite={isFavorite} size={24} />
                        </Button>
                      )}
                    </div>
                  </div>
                  {movie.tagline && (
                    <p className="text-lg text-muted-foreground italic mt-2">
                      "{movie.tagline}"
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star weight="fill" className="text-primary" size={20} />
                    <span className="text-foreground font-semibold">
                      {existingReview?.rating ?? movie.vote_average.toFixed(1)}
                    </span>
                    <span>/ 10</span>
                  </div>
                  {movie.release_date && (
                    <div>{new Date(movie.release_date).getFullYear()}</div>
                  )}
                  {movie.runtime && <div>{movie.runtime} min</div>}
                  {movie.original_language && movie.original_language.toLowerCase() !== 'en' && (
                    <div className="flex items-center gap-1">
                      <Globe weight="fill" size={16} />
                      <span>{getLanguageName(movie.original_language)}</span>
                    </div>
                  )}
                  {director && <div>Dir. {director.name}</div>}
                </div>

                <div className="flex flex-wrap gap-2">
                  {movie.genres?.map((genre) => (
                    <Badge key={genre.id} variant="secondary">
                      {genre.name}
                    </Badge>
                  ))}
                  {(() => {
                    const detectedSubgenres = detectMovieSubgenres(movie)
                    return detectedSubgenres.map((subgenreId) => {
                      const subgenreDef = HORROR_SUBGENRE_DEFINITIONS.find(d => d.id === subgenreId)
                      return subgenreDef ? (
                        <Badge 
                          key={subgenreId} 
                          variant="outline"
                          className="border-primary text-primary bg-primary/10"
                        >
                          {subgenreDef.name}
                        </Badge>
                      ) : null
                    })
                  })()}
                </div>

                <p className="text-foreground leading-relaxed">{movie.overview}</p>

                {trailer && (
                  <div className="space-y-3">
                    <div className="aspect-video w-full rounded-lg overflow-hidden border border-border">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube-nocookie.com/embed/${trailer.key}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-start gap-3">
                      {onToggleWatchLater && (
                        <Button
                          onClick={() => {
                            onToggleWatchLater()
                            if (isWatchLater) {
                              toast.success(`Removed "${movie.title}" from Watch Later`)
                            } else {
                              toast.success(`Added "${movie.title}" to Watch Later`)
                            }
                          }}
                          variant="outline"
                          size="icon"
                          title={isWatchLater ? "Remove from Watch Later" : "Add to Watch Later"}
                          className="w-[50px] shrink-0"
                        >
                          {isWatchLater ? (
                            <Eye weight="fill" className="text-red-600" size={24} />
                          ) : (
                            <EyeClosed size={24} />
                          )}
                        </Button>
                      )}
                      <CreepsterButton
                        onClick={() => setWhereToWatchOpen(true)}
                        icon={<TelevisionSimple size={22} weight="fill" />}
                        className="flex-1"
                      >
                        Where to Watch
                      </CreepsterButton>
                      <CreepsterButton
                        href={generateAmazonLink(movie.title, movie.release_date ? new Date(movie.release_date).getFullYear().toString() : undefined)}
                        icon={<ShoppingCart size={22} weight="fill" />}
                        className="flex-1"
                        variant="inverted"
                      >
                        Buy this Movie on Amazon
                      </CreepsterButton>
                    </div>
                    
                    {(amazonProviders.stream || amazonProviders.rent || amazonProviders.buy) && (
                      <div className="mt-4 p-4 bg-card rounded-lg border border-border">
                        <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                          <ShoppingCart size={16} weight="fill" className="text-primary" />
                          Available on Amazon
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {amazonProviders.stream?.map((provider) => (
                            <Button
                              key={`stream-${provider.provider_id}`}
                              variant="outline"
                              size="sm"
                              className="text-xs"
                              onClick={() => window.open(generateAmazonPrimeVideoLink(movie.title, movie.release_date ? new Date(movie.release_date).getFullYear().toString() : undefined), '_blank')}
                            >
                              <TelevisionSimple size={14} className="mr-1" weight="fill" />
                              Stream on {provider.provider_name}
                            </Button>
                          ))}
                          {amazonProviders.rent?.map((provider) => (
                            <Button
                              key={`rent-${provider.provider_id}`}
                              variant="outline"
                              size="sm"
                              className="text-xs"
                              onClick={() => window.open(generateAmazonRentBuyLink(movie.title, movie.release_date ? new Date(movie.release_date).getFullYear().toString() : undefined), '_blank')}
                            >
                              <ShoppingCart size={14} className="mr-1" />
                              Rent on {provider.provider_name}
                            </Button>
                          ))}
                          {amazonProviders.buy?.map((provider) => (
                            <Button
                              key={`buy-${provider.provider_id}`}
                              variant="outline"
                              size="sm"
                              className="text-xs"
                              onClick={() => window.open(generateAmazonRentBuyLink(movie.title, movie.release_date ? new Date(movie.release_date).getFullYear().toString() : undefined), '_blank')}
                            >
                              <ShoppingCart size={14} className="mr-1" weight="fill" />
                              Buy on {provider.provider_name}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {director && (
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-3">Director</h3>
                    <div className="text-base">
                      <span className="font-semibold text-foreground">{director.name}</span>
                    </div>
                  </div>
                )}

                {topCast.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-3">Cast</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                      {topCast.map((actor) => (
                        <div key={actor.id} className="flex flex-col items-center text-center group">
                          <div className="w-full aspect-[2/3] rounded-lg overflow-hidden bg-muted mb-2 border border-border">
                            {actor.profile_path ? (
                              <img
                                src={getImageUrl(actor.profile_path, 'w185') || ''}
                                alt={actor.name}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-muted">
                                <span className="text-4xl text-muted-foreground">?</span>
                              </div>
                            )}
                          </div>
                          <div className="text-sm font-semibold text-foreground line-clamp-2">
                            {actor.name}
                          </div>
                <div className="pt-6 border-t border-border">
                            {actor.character}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-6 border-t border-border">
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Trigger Warnings
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {(Object.keys(DEFAULT_TRIGGERS) as Array<
                      keyof TriggerRatings
                    >).map((key) => {
                      const info = TRIGGER_INFO[key]
                      const intensity = defaultTriggers[key]
                      return (
                        <div
                          key={key}
                          className="flex items-start justify-between gap-3 p-3 bg-card rounded-lg border border-border"
                        >
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-foreground uppercase tracking-wide">
                              {info.label}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {info.description}
                            </div>
                          </div>
                          <Badge
                            className={`${getTriggerColor(intensity)} ${intensity === null ? 'text-muted-foreground' : 'text-white'} shrink-0`}
                          >
                            {getTriggerLabel(intensity)}
                          </Badge>
                        </div>
                      )
                    })}
                  </div>

                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      Your Review
                    </h3>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Your Rating: {rating !== null ? `${rating}/10` : <span className="text-muted-foreground">No Rating</span>}
                        </label>
                        <Slider
                          value={rating !== null ? [rating] : [5]}
                          onValueChange={(value) => setRating(value[0])}
                          min={0}
                          max={10}
                          step={0.5}
                          className="w-full"
                        />
                        {rating !== null && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setRating(null)}
                            className="mt-2 text-xs"
                          >
                            Clear Rating
                          </Button>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-sm font-semibold text-foreground">
                            Your Review
                          </label>
                          <span className={cn(
                            "text-xs font-medium",
                            reviewText.length > REVIEW_CHARACTER_LIMIT
                              ? "text-destructive"
                              : reviewText.length > REVIEW_CHARACTER_LIMIT * 0.9
                              ? "text-yellow-500"
                              : "text-muted-foreground"
                          )}>
                            {reviewText.length} / {REVIEW_CHARACTER_LIMIT}
                          </span>
                        </div>
                        <Textarea
                          value={reviewText}
                          onChange={(e) => {
                            const newValue = e.target.value
                            if (newValue.length <= REVIEW_CHARACTER_LIMIT) {
                              setReviewText(newValue)
                            }
                          }}
                          placeholder="Share your thoughts about this movie..."
                          className="min-h-[150px] bg-card border-border text-foreground"
                        />
                      </div>

                      <div>
                        <h4 className="text-lg font-bold text-foreground mb-4">
                          Rate Each Trigger
                        </h4>
                        <div className="space-y-4">
                          {(Object.keys(triggerSliderValues) as Array<keyof TriggerRatings>).map((key) => {
                            const info = TRIGGER_INFO[key]
                            const value = triggerSliderValues[key]
                            const displayValue = getSliderDisplayValue(value)
                            return (
                              <div key={key} className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <div className="text-sm font-semibold text-foreground uppercase tracking-wide">
                                      {info.label}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                      {info.description}
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className={cn(
                                      "px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5",
                                      value === 3 ? "bg-muted text-muted-foreground" :
                                      value <= 1 ? "bg-green-600 text-white" :
                                      value === 2 || value === 4 ? "bg-yellow-500 text-white" :
                                      "bg-destructive text-destructive-foreground"
                                    )}>
                                      {value === 3 ? "No Review" :
                                       value <= 1 ? (
                                        <>
                                          <CheckCircle size={14} weight="fill" />
                                          Low Risk
                                        </>
                                       ) :
                                       value === 2 || value === 4 ? (
                                        <>
                                          <Warning size={14} weight="fill" />
                                          Caution
                                        </>
                                       ) : (
                                        <>
                                          <WarningCircle size={14} weight="fill" />
                                          Warning
                                        </>
                                       )}
                                    </span>
                                    {value !== 3 && (
                                      <span className="text-sm font-medium text-foreground min-w-[20px] text-center">
                                        {displayValue}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <Slider
                                  value={[value]}
                                  onValueChange={(val) =>
                                    handleTriggerChange(key, val[0])
                                  }
                                  min={0}
                                  max={6}
                                  step={1}
                                  className="w-full"
                                />
                              </div>
                            )
                          })}
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          onClick={handleSaveReview}
                          className="bg-primary hover:bg-primary/90"
                        >
                          Save Review
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {allReviews.length > 0 && (
                  <div className="pt-6 border-t border-border">
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      Community Reviews ({allReviews.length})
                    </h3>
                    <div className="space-y-4">
                      {allReviews
                        .filter((review) => review.userId !== currentUserId)
                        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                        .map((review, index) => (
                          <Card key={index} className="p-4 bg-card border-border">
                            <div className="flex items-start gap-3">
                              {review.userAvatar && (
                                <img
                                  src={review.userAvatar}
                                  alt={review.userLogin || 'User'}
                                  className="w-10 h-10 rounded-full border border-border"
                                />
                              )}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="font-semibold text-foreground">
                                    {review.userLogin || 'Anonymous'}
                                  </span>
                                  {review.rating !== undefined && (
                                    <div className="flex items-center gap-1">
                                      <Star weight="fill" className="text-primary" size={16} />
                                      <span className="font-semibold text-foreground text-sm">
                                        {review.rating}/10
                                      </span>
                                    </div>
                                  )}
                                  <span className="text-muted-foreground text-xs ml-auto">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                  </span>
                                </div>
                                {review.reviewText && (
                                  <p className="text-foreground leading-relaxed text-sm mb-3">
                                    {review.reviewText}
                                  </p>
                                )}
                                {review.triggers && Object.values(review.triggers).some(v => v !== null) && (
                                  <div>
                                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                                      Trigger Ratings
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                      {(Object.keys(review.triggers) as Array<keyof TriggerRatings>)
                                        .filter((key) => review.triggers![key] !== null)
                                        .map((key) => {
                                          const info = TRIGGER_INFO[key]
                                          const intensity = review.triggers![key]
                                          return (
                                            <Badge
                                              key={key}
                                              className={`${getTriggerColor(intensity)} ${intensity === null ? 'text-muted-foreground' : 'text-white'} text-xs`}
                                            >
                                              {info.label}: {getTriggerLabel(intensity)}
                                            </Badge>
                                          )
                                        })}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </Card>
                        ))}
                    </div>
                  </div>
                )}

                {similarMovies.length > 0 && (
                  <div className="pt-6 border-t border-border">
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      Similar Horror Movies
                    </h3>
                    {loadingSimilar ? (
                      <div className="text-muted-foreground">Loading recommendations...</div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                        {similarMovies.map((similarMovie) => {
                          const posterUrl = getImageUrl(similarMovie.poster_path, 'w342')
                          const isFav = favorites.includes(similarMovie.id)
                          const isWatch = watchLater.includes(similarMovie.id)
                          const movieRating = userRatings[similarMovie.id] ?? similarMovie.vote_average
                          
                          return (
                            <motion.div
                              key={similarMovie.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="group cursor-pointer"
                              onClick={() => onMovieClick?.(similarMovie.id)}
                            >
                              <Card className="overflow-hidden border-border hover:border-primary transition-all duration-300 hover:shadow-lg">
                                <div className="relative aspect-[2/3]">
                                  {posterUrl ? (
                                    <img
                                      src={posterUrl}
                                      alt={similarMovie.title}
                                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                  ) : (
                                    <div className="w-full h-full bg-muted flex items-center justify-center">
                                      <span className="text-4xl text-muted-foreground">?</span>
                                    </div>
                                  )}
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                  <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <div className="flex items-center gap-1 text-white">
                                      <Star weight="fill" size={14} />
                                      <span className="text-xs font-semibold">
                                        {movieRating.toFixed(1)}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="absolute top-2 right-2 flex gap-1">
                                    {isWatch && (
                                      <Eye weight="fill" className="text-yellow-400" size={20} />
                                    )}
                                    {isFav && (
                                      <Eye weight="fill" className="text-accent" size={20} />
                                    )}
                                  </div>
                                </div>
                                <div className="p-2">
                                  <h4 className="text-xs font-semibold text-foreground line-clamp-2 leading-tight">
                                    {similarMovie.title}
                                  </h4>
                                  {similarMovie.release_date && (
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                      {new Date(similarMovie.release_date).getFullYear()}
                                    </p>
                                  )}
                                </div>
                              </Card>
                            </motion.div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ShareMovieDialog
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
        movie={movie}
        userRating={existingReview?.rating}
        userReview={existingReview?.reviewText}
      />
      
      <WhereToWatchDialog
        open={whereToWatchOpen}
        onOpenChange={setWhereToWatchOpen}
        movieId={movieId}
        movieTitle={movie.title}
      />
    </motion.div>
  )
}
