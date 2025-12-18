import { Book } from '@/lib/types'
import { BookCard } from './BookCard'

interface BookListProps {
  title: string
  books: Book[]
  favorites: string[]
  onToggleFavorite: (bookId: string) => void
  onBookClick: (book: Book) => void
}

export function BookList({ title, books, favorites, onToggleFavorite, onBookClick }: BookListProps) {
  if (books.length === 0) return null

  return (
    <section className="space-y-4">
      <h2 className="text-3xl font-semibold">{title}</h2>
      
      <div className="scroll-fade-container">
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {books.map(book => (
            <BookCard
              key={book.id}
              book={book}
              isFavorite={favorites.includes(book.id)}
              onToggleFavorite={() => onToggleFavorite(book.id)}
              onClick={() => onBookClick(book)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
