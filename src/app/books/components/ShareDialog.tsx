import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Copy, Check } from '@phosphor-icons/react'
import { useState } from 'react'
import { toast } from 'sonner'

interface ShareDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  favorites: string[]
}

export function ShareDialog({ open, onOpenChange, favorites }: ShareDialogProps) {
  const [copied, setCopied] = useState(false)
  
  const shareUrl = favorites.length > 0
    ? `${window.location.origin}${window.location.pathname}?shared=${btoa(favorites.join(','))}`
    : ''

  function handleCopy() {
    if (!shareUrl) return
    
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    toast.success('Link copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Your Favorites</DialogTitle>
        </DialogHeader>

        {favorites.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            <p>You haven't favorited any books yet.</p>
            <p className="text-sm mt-2">Add books to your favorites to share them with friends!</p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Share this link with friends to show them your {favorites.length} favorite horror book{favorites.length === 1 ? '' : 's'}:
            </p>
            
            <div className="flex gap-2">
              <Input
                value={shareUrl}
                readOnly
                className="flex-1"
              />
              <Button
                onClick={handleCopy}
                size="icon"
                variant="secondary"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
