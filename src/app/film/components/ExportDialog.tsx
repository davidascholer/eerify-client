import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Download, File } from '@phosphor-icons/react'
import { Movie, UserReview, UserProfile, ViewingHistoryEntry } from '@/lib/types'
import { toast } from 'sonner'

interface ExportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  favorites: number[]
  watchLater: number[]
  reviews: Record<number, UserReview>
  userProfile: UserProfile | null
  viewingHistory: ViewingHistoryEntry[]
  allMovies: Record<number, Movie>
}

interface ExportData {
  exportDate: string
  favorites?: {
    movieIds: number[]
    movies: Movie[]
  }
  watchLater?: {
    movieIds: number[]
    movies: Movie[]
  }
  reviews?: UserReview[]
  viewingHistory?: ViewingHistoryEntry[]
  userProfile?: UserProfile
}

export function ExportDialog({
  open,
  onOpenChange,
  favorites,
  watchLater,
  reviews,
  userProfile,
  viewingHistory,
  allMovies,
}: ExportDialogProps) {
  const [includeFavorites, setIncludeFavorites] = useState(true)
  const [includeWatchLater, setIncludeWatchLater] = useState(true)
  const [includeReviews, setIncludeReviews] = useState(true)
  const [includeHistory, setIncludeHistory] = useState(true)
  const [includeProfile, setIncludeProfile] = useState(true)
  const [includeMovieDetails, setIncludeMovieDetails] = useState(true)

  const handleExport = () => {
    const exportData: ExportData = {
      exportDate: new Date().toISOString(),
    }

    if (includeFavorites && favorites.length > 0) {
      exportData.favorites = {
        movieIds: favorites,
        movies: includeMovieDetails
          ? favorites.map(id => allMovies[id]).filter(Boolean)
          : [],
      }
    }

    if (includeWatchLater && watchLater.length > 0) {
      exportData.watchLater = {
        movieIds: watchLater,
        movies: includeMovieDetails
          ? watchLater.map(id => allMovies[id]).filter(Boolean)
          : [],
      }
    }

    if (includeReviews && Object.keys(reviews).length > 0) {
      exportData.reviews = Object.values(reviews)
    }

    if (includeHistory && viewingHistory.length > 0) {
      exportData.viewingHistory = viewingHistory
    }

    if (includeProfile && userProfile) {
      exportData.userProfile = userProfile
    }

    const jsonString = JSON.stringify(exportData, null, 2)
    const blob = new Blob([jsonString], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `horrormovies-export-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    toast.success('Collection exported successfully!')
    onOpenChange(false)
  }

  const hasData = favorites.length > 0 || watchLater.length > 0 || Object.keys(reviews).length > 0 || viewingHistory.length > 0

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <File size={24} />
            Export Collections
          </DialogTitle>
          <DialogDescription>
            Download your movie data as a JSON file
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="favorites"
                checked={includeFavorites}
                onCheckedChange={(checked) => setIncludeFavorites(checked as boolean)}
                disabled={favorites.length === 0}
              />
              <Label
                htmlFor="favorites"
                className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${favorites.length === 0 ? 'text-muted-foreground' : ''}`}
              >
                Favorites ({favorites.length})
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="watchLater"
                checked={includeWatchLater}
                onCheckedChange={(checked) => setIncludeWatchLater(checked as boolean)}
                disabled={watchLater.length === 0}
              />
              <Label
                htmlFor="watchLater"
                className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${watchLater.length === 0 ? 'text-muted-foreground' : ''}`}
              >
                Watch Later ({watchLater.length})
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="reviews"
                checked={includeReviews}
                onCheckedChange={(checked) => setIncludeReviews(checked as boolean)}
                disabled={Object.keys(reviews).length === 0}
              />
              <Label
                htmlFor="reviews"
                className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${Object.keys(reviews).length === 0 ? 'text-muted-foreground' : ''}`}
              >
                Reviews ({Object.keys(reviews).length})
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="history"
                checked={includeHistory}
                onCheckedChange={(checked) => setIncludeHistory(checked as boolean)}
                disabled={viewingHistory.length === 0}
              />
              <Label
                htmlFor="history"
                className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${viewingHistory.length === 0 ? 'text-muted-foreground' : ''}`}
              >
                Viewing History ({viewingHistory.length})
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="profile"
                checked={includeProfile}
                onCheckedChange={(checked) => setIncludeProfile(checked as boolean)}
                disabled={!userProfile}
              />
              <Label
                htmlFor="profile"
                className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${!userProfile ? 'text-muted-foreground' : ''}`}
              >
                User Profile
              </Label>
            </div>

            <div className="border-t pt-3 mt-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="movieDetails"
                  checked={includeMovieDetails}
                  onCheckedChange={(checked) => setIncludeMovieDetails(checked as boolean)}
                />
                <Label
                  htmlFor="movieDetails"
                  className="text-sm font-medium leading-none"
                >
                  Include full movie details
                </Label>
              </div>
              <p className="text-xs text-muted-foreground mt-2 ml-6">
                When enabled, includes complete movie information. When disabled, only movie IDs are exported.
              </p>
            </div>
          </div>

          {!hasData && (
            <div className="text-sm text-muted-foreground text-center py-4">
              No data available to export. Start by adding favorites or watch later items.
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleExport}
              disabled={!hasData}
              className="cursor-pointer"
            >
              <Download size={16} className="mr-2" />
              Export
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
