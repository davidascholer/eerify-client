import { useState, useEffect } from 'react'
import { UserProfile, Movie } from '../lib/types'
import { HORROR_SUBGENRE_DEFINITIONS, HorrorSubgenre } from '../lib/genres'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { User, Star, Heart, Eye, FilmStrip, Clock, TrendUp, Pencil, Check, X } from '@phosphor-icons/react'
import { format } from 'date-fns'
import { toast } from 'sonner'

interface UserProfileDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  profile: UserProfile | null
  onSaveProfile: (profile: Partial<UserProfile>) => void
  viewingHistory: Movie[]
  onMovieClick: (movieId: number) => void
}

export function UserProfileDialog({
  open,
  onOpenChange,
  profile,
  onSaveProfile,
  viewingHistory,
  onMovieClick,
}: UserProfileDialogProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState('')
  const [editedBio, setEditedBio] = useState('')
  const [selectedSubgenres, setSelectedSubgenres] = useState<HorrorSubgenre[]>([])

  useEffect(() => {
    if (profile) {
      setEditedName(profile.userName || '')
      setEditedBio(profile.bio || '')
      setSelectedSubgenres(profile.favoriteSubgenres as HorrorSubgenre[] || [])
    }
  }, [profile])

  const handleSave = () => {
    if (!editedName.trim()) {
      toast.error('Name is required')
      return
    }

    onSaveProfile({
      userName: editedName,
      bio: editedBio,
      favoriteSubgenres: selectedSubgenres,
      updatedAt: new Date().toISOString(),
    })

    setIsEditing(false)
    toast.success('Profile updated!')
  }

  const handleCancel = () => {
    if (profile) {
      setEditedName(profile.userName || '')
      setEditedBio(profile.bio || '')
      setSelectedSubgenres(profile.favoriteSubgenres as HorrorSubgenre[] || [])
    }
    setIsEditing(false)
  }

  const toggleSubgenre = (subgenreId: HorrorSubgenre) => {
    setSelectedSubgenres((current) =>
      current.includes(subgenreId)
        ? current.filter((id) => id !== subgenreId)
        : [...current, subgenreId]
    )
  }

  if (!profile) return null

  const recentHistory = viewingHistory.slice(0, 10)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <div className="flex flex-col h-full">
          <DialogHeader className="px-6 pt-6 pb-4 border-b">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={profile.userAvatar} alt={profile.userName} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    {profile.userName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-2">
                      <Input
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        placeholder="Your name"
                        className="font-semibold text-xl"
                      />
                      <Textarea
                        value={editedBio}
                        onChange={(e) => setEditedBio(e.target.value)}
                        placeholder="Tell us about your horror movie preferences..."
                        className="resize-none"
                        rows={2}
                      />
                    </div>
                  ) : (
                    <>
                      <DialogTitle className="text-2xl">{profile.userName}</DialogTitle>
                      {profile.bio && (
                        <DialogDescription className="mt-1 text-base">
                          {profile.bio}
                        </DialogDescription>
                      )}
                      <p className="text-xs text-muted-foreground mt-2">
                        Member since {format(new Date(profile.createdAt), 'MMMM yyyy')}
                      </p>
                    </>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button size="icon" variant="ghost" onClick={handleSave}>
                      <Check size={20} />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={handleCancel}>
                      <X size={20} />
                    </Button>
                  </>
                ) : (
                  <Button size="icon" variant="ghost" onClick={() => setIsEditing(true)}>
                    <Pencil size={20} />
                  </Button>
                )}
              </div>
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-hidden px-6 py-4">
            <Tabs defaultValue="stats" className="h-full flex flex-col">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="stats">
                  <TrendUp className="mr-2" size={16} />
                  Stats
                </TabsTrigger>
                <TabsTrigger value="history">
                  <Clock className="mr-2" size={16} />
                  History
                </TabsTrigger>
                <TabsTrigger value="preferences">
                  <Star className="mr-2" size={16} />
                  Preferences
                </TabsTrigger>
              </TabsList>

              <TabsContent value="stats" className="flex-1 mt-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-card rounded-lg p-4 border">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Eye size={20} />
                      <span className="text-sm font-medium">Watched</span>
                    </div>
                    <p className="text-3xl font-bold">{profile.stats.totalMoviesWatched}</p>
                  </div>

                  <div className="bg-card rounded-lg p-4 border">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <FilmStrip size={20} />
                      <span className="text-sm font-medium">Reviews</span>
                    </div>
                    <p className="text-3xl font-bold">{profile.stats.totalReviews}</p>
                  </div>

                  <div className="bg-card rounded-lg p-4 border">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Heart size={20} />
                      <span className="text-sm font-medium">Favorites</span>
                    </div>
                    <p className="text-3xl font-bold">{profile.stats.favoriteCount}</p>
                  </div>

                  <div className="bg-card rounded-lg p-4 border">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Star size={20} />
                      <span className="text-sm font-medium">Avg Rating</span>
                    </div>
                    <p className="text-3xl font-bold">
                      {profile.stats.averageRating > 0 ? profile.stats.averageRating.toFixed(1) : '—'}
                    </p>
                  </div>
                </div>

                {profile.stats.mostWatchedSubgenre && (
                  <div className="mt-6 bg-card rounded-lg p-4 border">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Most Watched Subgenre</h3>
                    <Badge variant="secondary" className="text-base">
                      {HORROR_SUBGENRE_DEFINITIONS.find(d => d.id === profile.stats.mostWatchedSubgenre)?.name || profile.stats.mostWatchedSubgenre}
                    </Badge>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="history" className="flex-1 mt-4 overflow-hidden">
                <ScrollArea className="h-[400px]">
                  {recentHistory.length > 0 ? (
                    <div className="space-y-2">
                      {recentHistory.map((movie) => {
                        const historyEntry = profile.viewingHistory.find(h => h.movieId === movie.id)
                        return (
                          <div
                            key={movie.id}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent cursor-pointer transition-colors"
                            onClick={() => {
                              onMovieClick(movie.id)
                              onOpenChange(false)
                            }}
                          >
                            {movie.poster_path ? (
                              <img
                                src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                                alt={movie.title}
                                className="w-12 h-18 object-cover rounded"
                              />
                            ) : (
                              <div className="w-12 h-18 bg-muted rounded flex items-center justify-center">
                                <FilmStrip size={20} className="text-muted-foreground" />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium truncate">{movie.title}</h4>
                              <p className="text-sm text-muted-foreground">
                                {historyEntry && format(new Date(historyEntry.viewedAt), 'MMM d, yyyy')}
                              </p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[400px] text-muted-foreground">
                      <Clock size={48} className="mb-4" />
                      <p>No viewing history yet</p>
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>

              <TabsContent value="preferences" className="flex-1 mt-4 overflow-hidden">
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-3">
                        {isEditing ? 'Select Your Favorite Subgenres' : 'Favorite Horror Subgenres'}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {HORROR_SUBGENRE_DEFINITIONS.map((subgenre) => {
                          const isSelected = selectedSubgenres.includes(subgenre.id)
                          return (
                            <Badge
                              key={subgenre.id}
                              variant={isSelected ? 'default' : 'outline'}
                              className={`cursor-pointer transition-colors ${
                                isEditing ? 'hover:bg-primary/80' : ''
                              }`}
                              onClick={() => isEditing && toggleSubgenre(subgenre.id)}
                            >
                              {subgenre.name}
                            </Badge>
                          )
                        })}
                      </div>
                      {selectedSubgenres.length === 0 && !isEditing && (
                        <p className="text-sm text-muted-foreground mt-3">
                          No favorite subgenres selected yet
                        </p>
                      )}
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
