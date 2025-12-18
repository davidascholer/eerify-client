import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Heart, BookmarkSimple, Star } from '@phosphor-icons/react'
import type { Game } from '../lib/types'
import { motion } from 'framer-motion'

interface GameCardProps {
  game: Game
  isInCollection: boolean
  isInWatchlist: boolean
  onToggleCollection: (gameId: number) => void
  onToggleWatchlist: (gameId: number) => void
  onClick: () => void
}

export function GameCard({
  game,
  isInCollection,
  isInWatchlist,
  onToggleCollection,
  onToggleWatchlist,
  onClick,
}: GameCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden bg-card border-border hover:border-accent/50 transition-all cursor-pointer group h-full flex flex-col">
        <div className="relative aspect-video overflow-hidden" onClick={onClick}>
          {game.background_image ? (
            <img
              src={game.background_image}
              alt={game.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <span className="text-muted-foreground">No image</span>
            </div>
          )}
          <div className="absolute top-2 right-2 flex gap-2">
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 bg-background/80 backdrop-blur-sm hover:bg-background"
              onClick={(e) => {
                e.stopPropagation()
                onToggleWatchlist(game.id)
              }}
            >
              {isInWatchlist ? (
                <BookmarkSimple weight="fill" className="h-4 w-4 text-accent" />
              ) : (
                <BookmarkSimple className="h-4 w-4" />
              )}
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 bg-background/80 backdrop-blur-sm hover:bg-background"
              onClick={(e) => {
                e.stopPropagation()
                onToggleCollection(game.id)
              }}
            >
              {isInCollection ? (
                <Heart weight="fill" className="h-4 w-4 text-destructive" />
              ) : (
                <Heart className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        <div className="p-4 flex-1 flex flex-col" onClick={onClick}>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{game.name}</h3>
          <div className="flex items-center gap-2 mb-3">
            {game.rating > 0 && (
              <div className="flex items-center gap-1">
                <Star weight="fill" className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium">{game.rating.toFixed(1)}</span>
              </div>
            )}
            {game.metacritic && (
              <Badge variant="secondary" className="text-xs">
                {game.metacritic}
              </Badge>
            )}
          </div>
          <div className="flex flex-wrap gap-1 mb-3">
            {game.genres?.slice(0, 3).map((genre) => (
              <Badge key={genre.id} variant="outline" className="text-xs">
                {genre.name}
              </Badge>
            ))}
          </div>
          <div className="mt-auto">
            {game.released && (
              <p className="text-sm text-muted-foreground">
                {new Date(game.released).getFullYear()}
              </p>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
