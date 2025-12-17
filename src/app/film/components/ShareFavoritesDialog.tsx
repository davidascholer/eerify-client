import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Copy, Check, ShareNetwork } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface ShareFavoritesDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  favoriteMovieIds: number[]
}

export function ShareFavoritesDialog({ open, onOpenChange, favoriteMovieIds }: ShareFavoritesDialogProps) {
  const [copied, setCopied] = useState(false)
  const [shareUrl, setShareUrl] = useState('')

  useEffect(() => {
    if (open && favoriteMovieIds.length > 0) {
      const baseUrl = window.location.origin + window.location.pathname
      const encodedIds = btoa(JSON.stringify(favoriteMovieIds))
      const url = `${baseUrl}?shared=${encodedIds}`
      setShareUrl(url)
    }
  }, [open, favoriteMovieIds])

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      toast.success('Link copied to clipboard!')
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
            <ShareNetwork size={24} className="text-primary" />
            Share Your Favorites
          </DialogTitle>
          <DialogDescription>
            {favoriteMovieIds.length === 0 
              ? "You don't have any favorite movies yet. Start adding favorites to share them with friends!"
              : `Share your ${favoriteMovieIds.length} favorite horror movie${favoriteMovieIds.length === 1 ? '' : 's'} with friends!`
            }
          </DialogDescription>
        </DialogHeader>
        
        {favoriteMovieIds.length > 0 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="share-link">Share Link</Label>
              <div className="flex gap-2">
                <Input
                  id="share-link"
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
                Anyone with this link can view your favorite movies
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
