import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { searchHorrorBooks } from '../lib/openlibrary'
import { Book } from '../lib/types'
import { MagnifyingGlass } from '@phosphor-icons/react'
import { useDebounce } from '../hooks/use-debounce'

interface SearchAutocompleteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onBookSelect: (book: Book) => void
}

export function SearchAutocomplete({ open, onOpenChange, onBookSelect }: SearchAutocompleteProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Book[]>([])
  const [loading, setLoading] = useState(false)
  
  const debouncedQuery = useDebounce(query, 300)

  async function handleSearch(searchQuery: string) {
    if (searchQuery.length < 2) {
      setResults([])
      return
    }
    
    setLoading(true)
    const books = await searchHorrorBooks(searchQuery, 8)
    setResults(books)
    setLoading(false)
  }

  React.useEffect(() => {
    handleSearch(debouncedQuery)
  }, [debouncedQuery])

  function handleSelectBook(book: Book) {
    onBookSelect(book)
    onOpenChange(false)
    setQuery('')
    setResults([])
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Search Horror Books</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative">
            <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2" size={18} />
            <Input
              placeholder="Search by title or author..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
              autoFocus
            />
          </div>

          {loading && (
            <div className="py-8 text-center text-muted-foreground">
              Searching...
            </div>
          )}

          {!loading && query.length >= 2 && results.length === 0 && (
            <div className="py-8 text-center text-muted-foreground">
              No horror books found matching "{query}"
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {results.map(book => (
                <div
                  key={book.id}
                  className="flex items-center gap-3 p-3 rounded-md hover:bg-accent cursor-pointer transition-colors"
                  onClick={() => handleSelectBook(book)}
                >
                  {book.coverUrl ? (
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="w-12 h-16 object-cover rounded"
                    />
                  ) : (
                    <div className="w-12 h-16 bg-card border border-border rounded flex items-center justify-center">
                      <span className="text-xs">No cover</span>
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{book.title}</h4>
                    <p className="text-sm text-muted-foreground truncate">{book.author}</p>
                    {book.publishYear && (
                      <p className="text-xs text-muted-foreground">{book.publishYear}</p>
                    )}
                  </div>
                  
                  {book.rating && book.rating > 0 && (
                    <div className="text-sm text-muted-foreground">
                      ★ {book.rating.toFixed(1)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

import * as React from 'react'
