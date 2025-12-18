import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Heart, BookmarkSimple, Star, ArrowLeft } from '@phosphor-icons/react'
import type { Game, Trailer } from '../lib/types'
import { useEffect, useState } from 'react'
import { rawgApi } from '../lib/api'
import { motion } from 'framer-motion'

interface GameDetailsProps {
  gameId: number
  isInCollection: boolean
  isInWatchlist: boolean
  onToggleCollection: (gameId: number) => void
  onToggleWatchlist: (gameId: number) => void
  onBack: () => void
}

export function GameDetails({
  gameId,
  isInCollection,
  isInWatchlist,
  onToggleCollection,
  onToggleWatchlist,
  onBack,
}: GameDetailsProps) {
  const [game, setGame] = useState<Game | null>(null)
  const [trailers, setTrailers] = useState<Trailer[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (gameId) {
      setLoading(true)
      window.scrollTo(0, 0)
      
      Promise.all([
        rawgApi.getGameDetails(gameId),
        rawgApi.getGameTrailers(gameId)
      ])
        .then(([gameData, trailersData]) => {
          setGame(gameData)
          setTrailers(trailersData.results)
        })
        .catch(console.error)
        .finally(() => setLoading(false))
    }
  }, [gameId])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-accent"></div>
      </div>
    )
  }

  if (!game) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background"
    >
      <div className="container mx-auto px-4 py-8">
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-6 gap-2"
        >
          <ArrowLeft />
          Back to Library
        </Button>

        <div className="space-y-6">
          {trailers.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <video
                src={trailers[0].data.max}
                controls
                poster={trailers[0].preview}
                className="w-full rounded-lg aspect-video object-cover max-h-[500px]"
              >
                Your browser does not support the video tag.
              </video>
            </motion.div>
          ) : game.clip ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <video
                src={game.clip.clip}
                controls
                poster={game.clip.preview}
                className="w-full rounded-lg aspect-video object-cover max-h-[500px]"
              >
                Your browser does not support the video tag.
              </video>
            </motion.div>
          ) : game.background_image ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={game.background_image}
                alt={game.name}
                className="w-full rounded-lg aspect-video object-cover max-h-[500px]"
              />
            </motion.div>
          ) : null}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              {game.name}
            </h1>

            <div className="flex items-center gap-4 flex-wrap mb-6">
              <Button
                onClick={() => onToggleCollection(game.id)}
                variant={isInCollection ? 'default' : 'outline'}
                className="gap-2"
              >
                <Heart weight={isInCollection ? 'fill' : 'regular'} />
                {isInCollection ? 'In Collection' : 'Add to Collection'}
              </Button>
              <Button
                onClick={() => onToggleWatchlist(game.id)}
                variant={isInWatchlist ? 'default' : 'outline'}
                className="gap-2"
              >
                <BookmarkSimple weight={isInWatchlist ? 'fill' : 'regular'} />
                {isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold mb-3 text-lg">Rating</h3>
              <div className="flex items-center gap-2 mb-2">
                <Star weight="fill" className="h-6 w-6 text-accent" />
                <span className="text-2xl font-medium">
                  {game.rating.toFixed(1)} / 5
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                ({game.ratings_count.toLocaleString()} ratings)
              </span>
              {game.metacritic && (
                <div className="mt-3">
                  <Badge variant="secondary" className="text-sm">
                    Metacritic: {game.metacritic}
                  </Badge>
                </div>
              )}
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold mb-3 text-lg">Release Date</h3>
              <p className="text-xl">
                {game.released
                  ? new Date(game.released).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : 'TBA'}
              </p>
            </div>
          </motion.div>

          <Separator />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-card border border-border rounded-lg p-6"
          >
            <h3 className="font-semibold mb-3 text-lg">Genres</h3>
            <div className="flex flex-wrap gap-2">
              {game.genres?.map((genre) => (
                <Badge key={genre.id} variant="outline">
                  {genre.name}
                </Badge>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="bg-card border border-border rounded-lg p-6"
          >
            <h3 className="font-semibold mb-3 text-lg">Platforms</h3>
            <div className="flex flex-wrap gap-2">
              {game.platforms?.map((p) => (
                <Badge key={p.platform.id} variant="secondary">
                  {p.platform.name}
                </Badge>
              ))}
            </div>
          </motion.div>

          {game.developers && game.developers.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="bg-card border border-border rounded-lg p-6"
            >
              <h3 className="font-semibold mb-3 text-lg">Developers</h3>
              <p className="text-muted-foreground">
                {game.developers.map((d) => d.name).join(', ')}
              </p>
            </motion.div>
          )}

          {game.publishers && game.publishers.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
              className="bg-card border border-border rounded-lg p-6"
            >
              <h3 className="font-semibold mb-3 text-lg">Publishers</h3>
              <p className="text-muted-foreground">
                {game.publishers.map((p) => p.name).join(', ')}
              </p>
            </motion.div>
          )}

          {game.esrb_rating && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.7 }}
              className="bg-card border border-border rounded-lg p-6"
            >
              <h3 className="font-semibold mb-3 text-lg">ESRB Rating</h3>
              <Badge>{game.esrb_rating.name}</Badge>
            </motion.div>
          )}

          {game.description_raw && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.8 }}
              className="bg-card border border-border rounded-lg p-6"
            >
              <h3 className="font-semibold mb-3 text-lg">About</h3>
              <p className="text-muted-foreground leading-relaxed">
                {game.description_raw}
              </p>
            </motion.div>
          )}

          {game.short_screenshots && game.short_screenshots.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.9 }}
              className="bg-card border border-border rounded-lg p-6"
            >
              <h3 className="font-semibold mb-3 text-lg">Screenshots</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {game.short_screenshots.slice(1, 5).map((screenshot) => (
                  <img
                    key={screenshot.id}
                    src={screenshot.image}
                    alt="Screenshot"
                    className="w-full rounded-lg aspect-video object-cover hover:scale-105 transition-transform duration-300"
                  />
                ))}
              </div>
            </motion.div>
          )}

          {trailers.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 1.0 }}
              className="bg-card border border-border rounded-lg p-6"
            >
              <h3 className="font-semibold mb-3 text-lg">Additional Trailers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trailers.slice(1).map((trailer) => (
                  <div key={trailer.id} className="space-y-2">
                    {trailer.name && (
                      <p className="text-sm font-medium">{trailer.name}</p>
                    )}
                    <video
                      src={trailer.data.max}
                      controls
                      poster={trailer.preview}
                      className="w-full rounded-lg aspect-video object-cover"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
