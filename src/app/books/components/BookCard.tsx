import { Book } from '../lib/types'
import { BookmarkSimple } from '@phosphor-icons/react'
import { getPrimarySubgenre, SUBGENRE_COLORS } from '../lib/subgenres'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '../lib/utils'

interface BookCardProps {
  book: Book
  isFavorite: boolean
  onToggleFavorite: () => void
  onClick: () => void
}

export function BookCard({ book, isFavorite, onToggleFavorite, onClick }: BookCardProps) {
  const primarySubgenre = book.subgenres && book.subgenres.length > 0 
    ? getPrimarySubgenre(book.subgenres)
    : null

  return (
    <div className="group relative flex-shrink-0 w-48 snap-start">
      <div
        className="book-card relative aspect-[2/3] overflow-hidden rounded-md cursor-pointer bg-card border border-border"
        onClick={onClick}
      >
        {book.coverUrl ? (
          <img
            src={book.coverUrl}
            alt={book.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              e.currentTarget.parentElement!.classList.add('flex', 'items-center', 'justify-center', 'p-4')
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full p-4 text-center">
            <span className="text-sm font-medium line-clamp-3">{book.title}</span>
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform">
          <h3 className="text-sm font-semibold line-clamp-2 text-white mb-1">
            {book.title}
          </h3>
          <p className="text-xs text-gray-300">{book.author}</p>
          {book.rating && book.rating > 0 && (
            <p className="text-xs text-gray-300 mt-1">
              ★ {book.rating.toFixed(1)}
            </p>
          )}
        </div>
      </div>
      
      <div className="mt-2 flex items-center justify-between gap-2">
        {primarySubgenre && (
          <Badge className={cn('text-xs', SUBGENRE_COLORS[primarySubgenre])}>
            {primarySubgenre}
          </Badge>
        )}
        
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 ml-auto"
          onClick={(e) => {
            e.stopPropagation()
            onToggleFavorite()
          }}
        >
          <BookmarkSimple
            size={16}
            weight={isFavorite ? 'fill' : 'regular'}
            className={cn(isFavorite && 'text-accent')}
          />
        </Button>
      </div>
    </div>
  )
}
