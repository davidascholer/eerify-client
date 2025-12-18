import { useState, useEffect } from 'react'
import { useKV } from '@/lib/storage/useKV'
import { GameLibrary } from './components/GameLibrary'
import { GameDetails } from './components/GameDetails'
import { toast } from 'sonner'
import { Toaster } from '@/components/ui/sonner'

function App() {
  const [currentView, setCurrentView] = useState<'library' | 'details'>('library')
  const [selectedGameId, setSelectedGameId] = useState<number | null>(null)
  
  const [collection, setCollection] = useKV<number[]>('game-collection', [])
  const [watchlist, setWatchlist] = useKV<number[]>('game-watchlist', [])

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1)
      if (hash.startsWith('game/')) {
        const gameId = parseInt(hash.split('/')[1])
        if (!isNaN(gameId)) {
          setSelectedGameId(gameId)
          setCurrentView('details')
        }
      } else {
        setCurrentView('library')
        setSelectedGameId(null)
      }
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const handleToggleCollection = (gameId: number) => {
    setCollection((current) => {
      const currentCollection = current || []
      if (currentCollection.includes(gameId)) {
        toast.success('Removed from collection')
        return currentCollection.filter((id) => id !== gameId)
      } else {
        toast.success('Added to collection')
        return [...currentCollection, gameId]
      }
    })
  }

  const handleToggleWatchlist = (gameId: number) => {
    setWatchlist((current) => {
      const currentWatchlist = current || []
      if (currentWatchlist.includes(gameId)) {
        toast.success('Removed from watchlist')
        return currentWatchlist.filter((id) => id !== gameId)
      } else {
        toast.success('Added to watchlist')
        return [...currentWatchlist, gameId]
      }
    })
  }

  const handleGameClick = (gameId: number) => {
    window.location.hash = `game/${gameId}`
  }

  const handleBackToLibrary = () => {
    window.location.hash = ''
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <div className="container mx-auto px-4 py-8">
        {currentView === 'library' ? (
          <GameLibrary
            collection={collection || []}
            watchlist={watchlist || []}
            onToggleCollection={handleToggleCollection}
            onToggleWatchlist={handleToggleWatchlist}
            onGameClick={handleGameClick}
          />
        ) : selectedGameId !== null ? (
          <GameDetails
            gameId={selectedGameId}
            isInCollection={(collection || []).includes(selectedGameId)}
            isInWatchlist={(watchlist || []).includes(selectedGameId)}
            onToggleCollection={handleToggleCollection}
            onToggleWatchlist={handleToggleWatchlist}
            onBack={handleBackToLibrary}
          />
        ) : null}
      </div>
    </div>
  )
}

export default App