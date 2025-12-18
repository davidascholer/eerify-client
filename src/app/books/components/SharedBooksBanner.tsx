import { Book } from '../lib/types'
import { X } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'

interface SharedBooksBannerProps {
  books: Book[]
  onDismiss: () => void
  onBookClick: (book: Book) => void
}

export function SharedBooksBanner({ books, onDismiss, onBookClick }: SharedBooksBannerProps) {
  return (
    <div className="bg-primary/10 border border-primary rounded-lg p-6 space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Shared Books</h2>
          <p className="text-sm text-muted-foreground">
            Someone shared {books.length} horror book{books.length === 1 ? '' : 's'} with you
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onDismiss}
        >
          <X size={20} />
        </Button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {books.map(book => (
          <div
            key={book.id}
            className="flex-shrink-0 w-32 cursor-pointer group"
            onClick={() => onBookClick(book)}
          >
            {book.coverUrl ? (
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-full aspect-[2/3] object-cover rounded-md border border-border group-hover:shadow-lg transition-shadow"
              />
            ) : (
              <div className="w-full aspect-[2/3] bg-card border border-border rounded-md flex items-center justify-center p-2 text-center">
                <span className="text-xs line-clamp-3">{book.title}</span>
              </div>
            )}
            <p className="text-sm font-medium mt-2 line-clamp-2">{book.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
