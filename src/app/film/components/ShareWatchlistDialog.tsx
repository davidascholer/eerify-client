import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Copy, Check, Eye } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface ShareWatchlistDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  watchLaterMovieIds: number[]
}

export function ShareWatchlistDialog({ open, onOpenChange, watchLaterMovieIds }: ShareWatchlistDialogProps) {
  const [copied, setCopied] = useState(false)
  const [shareUrl, setShareUrl] = useState('')

  useEffect(() => {
    if (open && watchLaterMovieIds.length > 0) {
      const baseUrl = window.location.origin + window.location.pathname
      const encodedIds = btoa(JSON.stringify(watchLaterMovieIds))
      const url = `${baseUrl}?watchlist=${encodedIds}`
      setShareUrl(url)
    }
  }, [open, watchLaterMovieIds])

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      toast.success('Watchlist link copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast.error('Failed to copy link')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye size={24} className="text-primary" />
            Share Your Watchlist
          </DialogTitle>
          <DialogDescription>
            {watchLaterMovieIds.length === 0 
              ? "You don't have any movies in your watchlist yet. Start adding movies to share them with friends!"
              : `Share your watchlist of ${watchLaterMovieIds.length} horror movie${watchLaterMovieIds.length === 1 ? '' : 's'} with friends!`
            }
          </DialogDescription>
        </DialogHeader>
        
        {watchLaterMovieIds.length > 0 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="watchlist-link">Share Link</Label>
              <div className="flex gap-2">
                <Input
                  id="watchlist-link"
                  value={shareUrl}
                  readOnly
                  className="flex-1 font-mono text-sm"
                  onClick={(e) => e.currentTarget.select()}
                />
                <Button
                  size="icon"
                  onClick={handleCopyLink}
                  className="shrink-0"
                >
                  {copied ? <Check size={20} /> : <Copy size={20} />}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Anyone with this link can view your watchlist
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
