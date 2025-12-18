import { useState, useEffect } from 'react'
import { useKV } from '@/lib/storage/useKV'
import { Moon, Sun, User, Shuffle, ShareNetwork, MagnifyingGlass } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { BookList } from './components/BookList'
import { BookDetailsDialog } from './components/BookDetailsDialog'
import { ProfileDialog } from './components/ProfileDialog'
import { ShareDialog } from './components/ShareDialog'
import { FilterBar } from './components/FilterBar'
import { SearchAutocomplete } from './components/SearchAutocomplete'
import { SharedBooksBanner } from './components/SharedBooksBanner'
import { fetchHorrorBooks } from './lib/openlibrary'
import { Book, SortOption, TriggerFilterLevel, UserProfile, ViewingHistoryEntry } from './lib/types'
import { HorrorSubgenre } from './lib/subgenres'
import { toast } from 'sonner'

function App() {
  const [theme, setTheme] = useKV<'dark' | 'light'>('theme', 'dark')
  const [favorites, setFavorites] = useKV<string[]>('favorites', [])
  const [viewingHistory, setViewingHistory] = useKV<ViewingHistoryEntry[]>('viewing-history', [])
  const [profile, setProfile] = useKV<UserProfile>('user-profile', {
    name: 'Guest User',
    bio: '',
    favoriteSubgenres: [],
    createdAt: Date.now()
  })
  
  const [books, setBooks] = useState<Book[]>([])
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedBook, setSelectedBook] = useState<string | null>(null)
  const [showProfile, setShowProfile] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  
  const [sortOption, setSortOption] = useState<SortOption>('rating-high')
  const [triggerFilter, setTriggerFilter] = useState<TriggerFilterLevel>(null)
  const [subgenreFilter, setSubgenreFilter] = useState<HorrorSubgenre | null>(null)
  
  const [sharedBookIds, setSharedBookIds] = useState<string[]>([])

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light')
    } else {
      document.documentElement.classList.remove('light')
    }
  }, [theme])

  useEffect(() => {
    loadBooks()
  }, [])
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const shared = params.get('shared')
    if (shared) {
      try {
        const ids = atob(shared).split(',')
        setSharedBookIds(ids)
      } catch {
        toast.error('Invalid share link')
      }
    }
  }, [])

  useEffect(() => {
    applyFilters()
  }, [books, sortOption, triggerFilter, subgenreFilter])

  async function loadBooks() {
    setLoading(true)
    const data = await fetchHorrorBooks(100)
    setBooks(data)
    setLoading(false)
  }

  function applyFilters() {
    let result = [...books]
    
    if (subgenreFilter) {
      result = result.filter(book => 
        book.subgenres?.includes(subgenreFilter)
      )
    }
    
    switch (sortOption) {
      case 'rating-high':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case 'rating-low':
        result.sort((a, b) => (a.rating || 0) - (b.rating || 0))
        break
      case 'date-new':
        result.sort((a, b) => (b.publishYear || 0) - (a.publishYear || 0))
        break
      case 'date-old':
        result.sort((a, b) => (a.publishYear || 0) - (b.publishYear || 0))
        break
      case 'title-az':
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'title-za':
        result.sort((a, b) => b.title.localeCompare(a.title))
        break
    }
    
    setFilteredBooks(result)
  }

  function toggleTheme() {
    setTheme((current) => current === 'dark' ? 'light' : 'dark')
  }

  function toggleFavorite(bookId: string) {
    setFavorites((current) => {
      const currentFavorites = current || []
      return currentFavorites.includes(bookId)
        ? currentFavorites.filter(id => id !== bookId)
        : [...currentFavorites, bookId]
    })
  }

  function addToHistory(book: Book) {
    setViewingHistory((current) => {
      const currentHistory = current || []
      const filtered = currentHistory.filter(entry => entry.bookId !== book.id)
      return [{
        bookId: book.id,
        timestamp: Date.now(),
        title: book.title,
        author: book.author,
        coverUrl: book.coverUrl,
        subgenres: book.subgenres
      }, ...filtered].slice(0, 100)
    })
  }

  function handleBookClick(book: Book) {
    setSelectedBook(book.id)
    addToHistory(book)
  }

  function handleRandomBook() {
    if (filteredBooks.length === 0) {
      toast.error('No books available')
      return
    }
    const randomBook = filteredBooks[Math.floor(Math.random() * filteredBooks.length)]
    handleBookClick(randomBook)
  }

  const favoriteBooks = filteredBooks.filter(book => (favorites || []).includes(book.id))
  const recommendedBooks = filteredBooks.slice(0, 30)
  const forYouBooks = getPersonalizedRecommendations()

  function getPersonalizedRecommendations(): Book[] {
    const currentHistory = viewingHistory || []
    const currentFavorites = favorites || []
    const currentProfile = profile || { name: '', bio: '', favoriteSubgenres: [], createdAt: Date.now() }
    
    if (currentHistory.length === 0 && currentFavorites.length === 0) {
      return []
    }
    
    const viewedSubgenres = currentHistory.flatMap(entry => entry.subgenres || [])
    const favoriteSubgenres = currentProfile.favoriteSubgenres
    const allPreferredSubgenres = [...new Set([...viewedSubgenres, ...favoriteSubgenres])]
    
    const scored = filteredBooks
      .filter(book => !currentHistory.some(entry => entry.bookId === book.id))
      .map(book => {
        let score = 0
        book.subgenres?.forEach(subgenre => {
          if (allPreferredSubgenres.includes(subgenre)) {
            score += 3
          }
        })
        if (currentFavorites.some(favId => {
          const favBook = books.find(b => b.id === favId)
          return favBook?.author === book.author
        })) {
          score += 2
        }
        if (book.publishYear && book.publishYear > 2015) {
          score += 1
        }
        return { book, score }
      })
      .sort((a, b) => b.score - a.score)
    
    return scored.slice(0, 50).map(item => item.book)
  }

  const sharedBooks = books.filter(book => sharedBookIds.includes(book.id))

  return (
    <div className="min-h-screen bg-background text-foreground">

      <main className="container mx-auto px-6 py-8 space-y-8">
        {sharedBooks.length > 0 && (
          <SharedBooksBanner
            books={sharedBooks}
            onDismiss={() => {
              setSharedBookIds([])
              window.history.replaceState({}, '', window.location.pathname)
            }}
            onBookClick={handleBookClick}
          />
        )}
        
        <FilterBar
          sortOption={sortOption}
          onSortChange={setSortOption}
          subgenreFilter={subgenreFilter}
          onSubgenreChange={setSubgenreFilter}
        />

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-muted-foreground">Loading horror books...</div>
          </div>
        ) : (
          <>
            <BookList
              title="Recommended"
              books={recommendedBooks}
              favorites={favorites || []}
              onToggleFavorite={toggleFavorite}
              onBookClick={handleBookClick}
            />

            {forYouBooks.length > 0 && (
              <BookList
                title="For You"
                books={forYouBooks}
                favorites={favorites || []}
                onToggleFavorite={toggleFavorite}
                onBookClick={handleBookClick}
              />
            )}

            {favoriteBooks.length > 0 && (
              <BookList
                title="Favorites"
                books={favoriteBooks}
                favorites={favorites || []}
                onToggleFavorite={toggleFavorite}
                onBookClick={handleBookClick}
              />
            )}
          </>
        )}
      </main>

      {selectedBook && (
        <BookDetailsDialog
          bookId={selectedBook}
          open={!!selectedBook}
          onOpenChange={(open) => !open && setSelectedBook(null)}
          isFavorite={(favorites || []).includes(selectedBook)}
          onToggleFavorite={() => toggleFavorite(selectedBook)}
        />
      )}

      <ProfileDialog
        open={showProfile}
        onOpenChange={setShowProfile}
        profile={profile || { name: 'Guest User', bio: '', favoriteSubgenres: [], createdAt: Date.now() }}
        onProfileUpdate={setProfile}
        viewingHistory={viewingHistory || []}
        favorites={favorites || []}
        books={books}
      />

      <ShareDialog
        open={showShare}
        onOpenChange={setShowShare}
        favorites={favorites || []}
      />

      <SearchAutocomplete
        open={showSearch}
        onOpenChange={setShowSearch}
        onBookSelect={handleBookClick}
      />
    </div>
  )
}

export default App
