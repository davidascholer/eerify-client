import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { X } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'

export function KeyboardNavigationHint() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem('keyboard-hint-dismissed')
    if (dismissed) {
      setIsDismissed(true)
      return
    }

    const handleFirstKeyPress = (e: KeyboardEvent) => {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        setIsVisible(true)
        window.removeEventListener('keydown', handleFirstKeyPress)
        
        setTimeout(() => {
          setIsVisible(false)
        }, 5000)
      }
    }

    window.addEventListener('keydown', handleFirstKeyPress)
    return () => window.removeEventListener('keydown', handleFirstKeyPress)
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    setIsDismissed(true)
    localStorage.setItem('keyboard-hint-dismissed', 'true')
  }

  if (isDismissed || !isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-5">
      <Card className="p-4 shadow-lg border-primary/50 max-w-sm bg-card">
        <div className="flex items-start gap-3">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-sm text-foreground">Keyboard Navigation</h3>
            </div>
            <div className="space-y-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-muted rounded text-foreground font-mono">←</kbd>
                <kbd className="px-2 py-1 bg-muted rounded text-foreground font-mono">→</kbd>
                <span>Navigate movies</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-muted rounded text-foreground font-mono">↑</kbd>
                <kbd className="px-2 py-1 bg-muted rounded text-foreground font-mono">↓</kbd>
                <span>Navigate grid (up/down)</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-muted rounded text-foreground font-mono">Enter</kbd>
                <span>Open details</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-muted rounded text-foreground font-mono">Esc</kbd>
                <span>Clear focus</span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 shrink-0"
            onClick={handleDismiss}
          >
            <X size={16} />
          </Button>
        </div>
      </Card>
    </div>
  )
}
