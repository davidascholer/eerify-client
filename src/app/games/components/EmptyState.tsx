import { GameController, MagnifyingGlass } from '@phosphor-icons/react'

interface EmptyStateProps {
  type: 'search' | 'collection' | 'watchlist'
}

export function EmptyState({ type }: EmptyStateProps) {
  const config = {
    search: {
      icon: MagnifyingGlass,
      title: 'No games found',
      description: 'Try adjusting your search or filters',
    },
    collection: {
      icon: GameController,
      title: 'Your collection is empty',
      description: 'Start adding games to build your collection',
    },
    watchlist: {
      icon: GameController,
      title: 'Your watchlist is empty',
      description: 'Add games you want to play later',
    },
  }

  const { icon: Icon, title, description } = config[type]

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <Icon className="h-16 w-16 text-muted-foreground mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-md">{description}</p>
    </div>
  )
}
