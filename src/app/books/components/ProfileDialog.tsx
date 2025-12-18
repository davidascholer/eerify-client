import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { UserProfile, ViewingHistoryEntry, Book } from '../lib/types'
import { HORROR_SUBGENRES, HorrorSubgenre, SUBGENRE_COLORS } from '../lib/subgenres'
import { cn } from '../lib/utils'

interface ProfileDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  profile: UserProfile
  onProfileUpdate: (updater: (current: UserProfile | undefined) => UserProfile) => void
  viewingHistory: ViewingHistoryEntry[]
  favorites: string[]
  books: Book[]
}

export function ProfileDialog({
  open,
  onOpenChange,
  profile,
  onProfileUpdate,
  viewingHistory,
  favorites,
  books
}: ProfileDialogProps) {
  const [editName, setEditName] = useState(profile.name)
  const [editBio, setEditBio] = useState(profile.bio)
  const [selectedSubgenres, setSelectedSubgenres] = useState<HorrorSubgenre[]>(profile.favoriteSubgenres)

  function handleSave() {
    onProfileUpdate(() => ({
      ...profile,
      name: editName,
      bio: editBio,
      favoriteSubgenres: selectedSubgenres
    }))
  }

  function toggleSubgenre(subgenre: HorrorSubgenre) {
    setSelectedSubgenres(prev =>
      prev.includes(subgenre)
        ? prev.filter(s => s !== subgenre)
        : [...prev, subgenre]
    )
  }

  const booksViewed = viewingHistory.length
  const booksReviewed = 0
  const favoriteCount = favorites.length

  const mostViewedSubgenre = viewingHistory.length > 0
    ? viewingHistory
        .flatMap(entry => entry.subgenres || [])
        .reduce((acc, subgenre) => {
          acc[subgenre] = (acc[subgenre] || 0) + 1
          return acc
        }, {} as Record<string, number>)
    : {}

  const topSubgenre = Object.entries(mostViewedSubgenre).sort((a, b) => b[1] - a[1])[0]?.[0]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl">Profile</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="stats" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="stats">Stats</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="border border-border rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-primary">{booksViewed}</div>
                <div className="text-sm text-muted-foreground">Books Viewed</div>
              </div>
              <div className="border border-border rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-primary">{favoriteCount}</div>
                <div className="text-sm text-muted-foreground">Favorites</div>
              </div>
              <div className="border border-border rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-primary">{booksReviewed}</div>
                <div className="text-sm text-muted-foreground">Reviews</div>
              </div>
            </div>

            {topSubgenre && (
              <div className="border border-border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Most Viewed Subgenre</h3>
                <Badge className={cn('text-base', SUBGENRE_COLORS[topSubgenre as HorrorSubgenre])}>
                  {topSubgenre}
                </Badge>
              </div>
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            {viewingHistory.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground">
                <p>You haven't viewed any books yet.</p>
                <p className="text-sm mt-2">Start exploring to build your reading history!</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {viewingHistory.map(entry => (
                  <div
                    key={entry.bookId + entry.timestamp}
                    className="flex items-center gap-3 p-3 rounded-md border border-border"
                  >
                    {entry.coverUrl ? (
                      <img
                        src={entry.coverUrl}
                        alt={entry.title}
                        className="w-12 h-16 object-cover rounded"
                      />
                    ) : (
                      <div className="w-12 h-16 bg-card border border-border rounded flex items-center justify-center">
                        <span className="text-xs">No cover</span>
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{entry.title}</h4>
                      <p className="text-sm text-muted-foreground truncate">{entry.author}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(entry.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="preferences" className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <Input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Your name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Bio</label>
              <Textarea
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                placeholder="Tell us about your horror book interests..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Favorite Subgenres</label>
              <div className="flex flex-wrap gap-2">
                {HORROR_SUBGENRES.map(subgenre => (
                  <Badge
                    key={subgenre}
                    className={cn(
                      'cursor-pointer transition-all',
                      selectedSubgenres.includes(subgenre)
                        ? SUBGENRE_COLORS[subgenre]
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    )}
                    onClick={() => toggleSubgenre(subgenre)}
                  >
                    {subgenre}
                  </Badge>
                ))}
              </div>
            </div>

            <Button onClick={handleSave} className="w-full">
              Save Changes
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
