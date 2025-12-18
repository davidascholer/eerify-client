import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Slider } from '@/components/ui/slider'
import { BookmarkSimple, ArrowLeft } from '@phosphor-icons/react'
import { useKV } from '@/lib/storage/useKV'
import { getBookDetails } from '../lib/openlibrary'
import { BookDetails } from '../lib/types'
import { BookReview, TriggerWarning, DEFAULT_TRIGGERS, TRIGGER_LABELS } from '../lib/triggerData'
import { SUBGENRE_COLORS } from '../lib/subgenres'
import { cn } from '../lib/utils'
import { toast } from 'sonner'

interface BookDetailsDialogProps {
  bookId: string
  open: boolean
  onOpenChange: (open: boolean) => void
  isFavorite: boolean
  onToggleFavorite: () => void
}

export function BookDetailsDialog({
  bookId,
  open,
  onOpenChange,
  isFavorite,
  onToggleFavorite
}: BookDetailsDialogProps) {
  const [book, setBook] = useState<BookDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewText, setReviewText] = useState('')
  const [triggerRatings, setTriggerRatings] = useState<TriggerWarning>(DEFAULT_TRIGGERS)
  
  const [reviews, setReviews] = useKV<BookReview[]>('book-reviews', [])

  useEffect(() => {
    if (open && bookId) {
      loadBookDetails()
    }
  }, [open, bookId])

  async function loadBookDetails() {
    setLoading(true)
    const data = await getBookDetails(bookId)
    setBook(data)
    setLoading(false)
  }

  function handleSubmitReview() {
    if (!book) return
    
    const review: BookReview = {
      bookId: book.id,
      triggers: triggerRatings,
      review: reviewText,
      rating: Object.values(triggerRatings).reduce((a, b) => a + b, 0) / 8,
      timestamp: Date.now()
    }
    
    setReviews((current) => {
      const filtered = (current || []).filter(r => r.bookId !== book.id)
      return [review, ...filtered]
    })
    
    toast.success('Review submitted!')
    setShowReviewForm(false)
    setReviewText('')
    setTriggerRatings(DEFAULT_TRIGGERS)
  }

  const userReview = reviews?.find(r => r.bookId === bookId)

  if (!open) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        {loading ? (
          <div className="py-20 text-center text-muted-foreground">
            Loading book details...
          </div>
        ) : book ? (
          <div className="space-y-6">
            <DialogHeader>
              <div className="flex items-start gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onOpenChange(false)}
                >
                  <ArrowLeft size={20} />
                </Button>
                <DialogTitle className="flex-1 text-4xl">{book.title}</DialogTitle>
              </div>
            </DialogHeader>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-64">
                {book.coverUrl ? (
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-full rounded-md border border-border"
                  />
                ) : (
                  <div className="aspect-[2/3] flex items-center justify-center bg-card border border-border rounded-md p-6 text-center">
                    <span className="font-medium">{book.title}</span>
                  </div>
                )}
                
                <Button
                  className="w-full mt-4"
                  variant={isFavorite ? 'secondary' : 'default'}
                  onClick={onToggleFavorite}
                >
                  <BookmarkSimple
                    size={18}
                    weight={isFavorite ? 'fill' : 'regular'}
                    className="mr-2"
                  />
                  {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </Button>
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <p className="text-xl text-muted-foreground">{book.author}</p>
                  {book.publishYear && (
                    <p className="text-sm text-muted-foreground">
                      Published: {book.publishYear}
                    </p>
                  )}
                  {book.rating && book.rating > 0 && (
                    <p className="text-sm text-muted-foreground">
                      Rating: ★ {book.rating.toFixed(1)}
                    </p>
                  )}
                </div>

                {book.subgenres && book.subgenres.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {book.subgenres.map(subgenre => (
                      <Badge key={subgenre} className={cn(SUBGENRE_COLORS[subgenre])}>
                        {subgenre}
                      </Badge>
                    ))}
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {book.fullDescription || book.description || 'No description available'}
                  </p>
                </div>

                {userReview ? (
                  <div className="border border-border rounded-md p-4 space-y-3">
                    <h3 className="font-semibold">Your Review</h3>
                    <p className="text-sm text-muted-foreground">{userReview.review}</p>
                    
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(userReview.triggers).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between text-sm">
                          <span>{TRIGGER_LABELS[key as keyof TriggerWarning]}</span>
                          <Badge
                            variant={value === 0 ? 'secondary' : value === 1 ? 'default' : 'destructive'}
                          >
                            {value}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : showReviewForm ? (
                  <div className="border border-border rounded-md p-4 space-y-4">
                    <h3 className="font-semibold">Add Your Review</h3>
                    
                    <div className="space-y-3">
                      {Object.entries(triggerRatings).map(([key, value]) => (
                        <div key={key} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-medium">
                              {TRIGGER_LABELS[key as keyof TriggerWarning]}
                            </label>
                            <Badge
                              variant={value === 0 ? 'secondary' : value === 1 ? 'default' : 'destructive'}
                            >
                              {value}
                            </Badge>
                          </div>
                          <Slider
                            value={[value]}
                            onValueChange={([newValue]) =>
                              setTriggerRatings(prev => ({ ...prev, [key]: newValue }))
                            }
                            max={2}
                            step={1}
                            className="w-full"
                          />
                        </div>
                      ))}
                    </div>

                    <Textarea
                      placeholder="Share your thoughts about this book..."
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      rows={4}
                    />

                    <div className="flex gap-2">
                      <Button onClick={handleSubmitReview}>Submit Review</Button>
                      <Button variant="ghost" onClick={() => setShowReviewForm(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button onClick={() => setShowReviewForm(true)}>
                    Add Review
                  </Button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="py-20 text-center text-muted-foreground">
            Book not found
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
