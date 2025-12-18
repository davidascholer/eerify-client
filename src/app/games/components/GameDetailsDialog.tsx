import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Heart, BookmarkSimple, Star } from '@phosphor-icons/react'
import type { Game } from '../lib/types'
import { useEffect, useState } from 'react'
import { rawgApi } from '../lib/api'

interface GameDetailsDialogProps {
  gameId: number | null
  open: boolean
  onOpenChange: (open: boolean) => void
  isInCollection: boolean
  isInWatchlist: boolean
  onToggleCollection: (gameId: number) => void
  onToggleWatchlist: (gameId: number) => void
}

export function GameDetailsDialog({
  gameId,
  open,
  onOpenChange,
  isInCollection,
  isInWatchlist,
  onToggleCollection,
  onToggleWatchlist,
}: GameDetailsDialogProps) {
  const [game, setGame] = useState<Game | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (gameId && open) {
      setLoading(true)
      rawgApi
        .getGameDetails(gameId)
        .then(setGame)
        .catch(console.error)
        .finally(() => setLoading(false))
    }
  }, [gameId, open])

  if (!gameId) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {loading ? 'Loading...' : game?.name}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(90vh-8rem)]">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
            </div>
          ) : game ? (
            <div className="space-y-6">
              {game.background_image && (
                <img
                  src={game.background_image}
                  alt={game.name}
                  className="w-full rounded-lg aspect-video object-cover"
                />
              )}

              <div className="flex items-center gap-4 flex-wrap">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Rating</h3>
                  <div className="flex items-center gap-2">
                    <Star weight="fill" className="h-5 w-5 text-accent" />
                    <span className="text-lg font-medium">
                      {game.rating.toFixed(1)} / 5
                    </span>
                    <span className="text-sm text-muted-foreground">
                      ({game.ratings_count.toLocaleString()} ratings)
                    </span>
                  </div>
                  {game.metacritic && (
                    <div className="mt-2">
                      <Badge variant="secondary" className="text-sm">
                        Metacritic: {game.metacritic}
                      </Badge>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Release Date</h3>
                  <p>
                    {game.released
                      ? new Date(game.released).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })
                      : 'TBA'}
                  </p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-2">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {game.genres?.map((genre) => (
                    <Badge key={genre.id} variant="outline">
                      {genre.name}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Platforms</h3>
                <div className="flex flex-wrap gap-2">
                  {game.platforms?.map((p) => (
                    <Badge key={p.platform.id} variant="secondary">
                      {p.platform.name}
                    </Badge>
                  ))}
                </div>
              </div>

              {game.developers && game.developers.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Developers</h3>
                  <p className="text-muted-foreground">
                    {game.developers.map((d) => d.name).join(', ')}
                  </p>
                </div>
              )}

              {game.publishers && game.publishers.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Publishers</h3>
                  <p className="text-muted-foreground">
                    {game.publishers.map((p) => p.name).join(', ')}
                  </p>
                </div>
              )}

              {game.esrb_rating && (
                <div>
                  <h3 className="font-semibold mb-2">ESRB Rating</h3>
                  <Badge>{game.esrb_rating.name}</Badge>
                </div>
              )}

              {game.description_raw && (
                <div>
                  <h3 className="font-semibold mb-2">About</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {game.description_raw}
                  </p>
                </div>
              )}

              {game.short_screenshots && game.short_screenshots.length > 1 && (
                <div>
                  <h3 className="font-semibold mb-2">Screenshots</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {game.short_screenshots.slice(1, 5).map((screenshot) => (
                      <img
                        key={screenshot.id}
                        src={screenshot.image}
                        alt="Screenshot"
                        className="w-full rounded-lg aspect-video object-cover"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
