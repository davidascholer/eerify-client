import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { GameCard } from './GameCard'
import { SearchBar } from './SearchBar'
import { FilterControls } from './FilterControls'
import { EmptyState } from './EmptyState'
import { rawgApi } from '../lib/api'
import type { Game, Genre, Platform, Tag } from '../lib/types'
import { toast } from 'sonner'

interface GameLibraryProps {
  collection: number[]
  watchlist: number[]
  onToggleCollection: (gameId: number) => void
  onToggleWatchlist: (gameId: number) => void
  onGameClick: (gameId: number) => void
}

export function GameLibrary({
  collection,
  watchlist,
  onToggleCollection,
  onToggleWatchlist,
  onGameClick,
}: GameLibraryProps) {
  const [games, setGames] = useState<Game[]>([])
  const [genres, setGenres] = useState<Genre[]>([])
  const [platforms, setPlatforms] = useState<Platform[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('all')
  const [selectedPlatform, setSelectedPlatform] = useState('all')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState('browse')

  const HORROR_GENRE_ID = '19'

  useEffect(() => {
    rawgApi.getGenres().then((res) => setGenres(res.results)).catch(console.error)
    rawgApi.getPlatforms().then((res) => setPlatforms(res.results)).catch(console.error)
    rawgApi.getTags().then((res) => setTags(res.results)).catch(console.error)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchGames()
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery, selectedGenre, selectedPlatform, selectedTags])

  const fetchGames = async () => {
    setLoading(true)
    try {
      const params = {
        search: searchQuery || undefined,
        genres: HORROR_GENRE_ID,
        platforms: selectedPlatform !== 'all' ? selectedPlatform : undefined,
        tags: selectedTags.length > 0 ? selectedTags.join(',') : undefined,
      }
      const response = await rawgApi.getGames(params)
      setGames(response.results)
    } catch (error) {
      console.error(error)
      toast.error('Failed to fetch games')
    } finally {
      setLoading(false)
    }
  }

  const handleClearSearch = () => {
    setSearchQuery('')
  }

  const handleClearFilters = () => {
    setSelectedGenre('all')
    setSelectedPlatform('all')
    setSelectedTags([])
  }

  const handleTagToggle = (tagId: string) => {
    setSelectedTags((current) => {
      if (current.includes(tagId)) {
        return current.filter((id) => id !== tagId)
      } else {
        return [...current, tagId]
      }
    })
  }

  const handleClearTags = () => {
    setSelectedTags([])
  }

  const collectionGames = games.filter((game) => collection.includes(game.id))
  const watchlistGames = games.filter((game) => watchlist.includes(game.id))

  return (
    <div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="browse">Browse</TabsTrigger>
          <TabsTrigger value="collection">
            Collection ({collection.length})
          </TabsTrigger>
          <TabsTrigger value="watchlist">
            Watchlist ({watchlist.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                onClear={handleClearSearch}
              />
            </div>
            <FilterControls
              genres={genres}
              platforms={platforms}
              selectedGenre={selectedGenre}
              selectedPlatform={selectedPlatform}
              onGenreChange={setSelectedGenre}
              onPlatformChange={setSelectedPlatform}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* <TagsFilter
            tags={tags}
            selectedTags={selectedTags}
            onTagToggle={handleTagToggle}
            onClearAll={handleClearTags}
          /> */}

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-accent"></div>
            </div>
          ) : games.length === 0 ? (
            <EmptyState type="search" />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {games.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  isInCollection={collection.includes(game.id)}
                  isInWatchlist={watchlist.includes(game.id)}
                  onToggleCollection={onToggleCollection}
                  onToggleWatchlist={onToggleWatchlist}
                  onClick={() => onGameClick(game.id)}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="collection">
          {collectionGames.length === 0 ? (
            <EmptyState type="collection" />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {collectionGames.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  isInCollection={true}
                  isInWatchlist={watchlist.includes(game.id)}
                  onToggleCollection={onToggleCollection}
                  onToggleWatchlist={onToggleWatchlist}
                  onClick={() => onGameClick(game.id)}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="watchlist">
          {watchlistGames.length === 0 ? (
            <EmptyState type="watchlist" />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {watchlistGames.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  isInCollection={collection.includes(game.id)}
                  isInWatchlist={true}
                  onToggleCollection={onToggleCollection}
                  onToggleWatchlist={onToggleWatchlist}
                  onClick={() => onGameClick(game.id)}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
