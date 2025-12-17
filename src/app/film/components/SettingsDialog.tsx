import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Key, CheckCircle, Database, Trash, Flask } from '@phosphor-icons/react'
import { Separator } from '@/components/ui/separator'
import { clearTriggerCache } from '../api/triggers'

interface SettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentToken: string | null
  onSaveToken: (token: string) => void
  currentTriggerApiUrl?: string | null
  onSaveTriggerApiUrl?: (url: string) => void
}

export function SettingsDialog({ 
  open, 
  onOpenChange, 
  currentToken, 
  onSaveToken,
  currentTriggerApiUrl,
  onSaveTriggerApiUrl 
}: SettingsDialogProps) {
  const [token, setToken] = useState(currentToken || '')
  const [triggerApiUrl, setTriggerApiUrl] = useState(currentTriggerApiUrl || '')
  const [isValidating, setIsValidating] = useState(false)
  const [isTesting, setIsTesting] = useState(false)

  const validateToken = async (apiToken: string) => {
    try {
      console.log('[Settings] Testing API token...')
      const response = await fetch(
        `https://api.themoviedb.org/3/configuration`,
        {
          headers: {
            'Authorization': `Bearer ${apiToken}`,
            'Content-Type': 'application/json'
          }
        }
      )
      console.log('[Settings] API test response status:', response.status)
      return response.ok
    } catch (error) {
      console.error('[Settings] API test failed:', error)
      return false
    }
  }

  const handleTestApi = async () => {
    const testToken = token.trim() || currentToken
    if (!testToken) {
      toast.error('Please enter an API token first')
      return
    }

    setIsTesting(true)
    try {
      console.log('[Settings] Testing TMDB API connection...')
      const response = await fetch(
        'https://api.themoviedb.org/3/discover/movie?with_genres=27&page=1',
        {
          headers: {
            'Authorization': `Bearer ${testToken}`,
            'Content-Type': 'application/json'
          }
        }
      )

      if (!response.ok) {
        console.error('[Settings] API test failed with status:', response.status)
        const errorText = await response.text()
        console.error('[Settings] Error response:', errorText)
        toast.error(`API test failed: ${response.status} ${response.statusText}`)
      } else {
        const data = await response.json()
        console.log('[Settings] API test successful, received', data.results?.length || 0, 'movies')
        toast.success(`API is working! Received ${data.results?.length || 0} horror movies.`)
      }
    } catch (error) {
      console.error('[Settings] API test error:', error)
      toast.error('API test failed. Please check your internet connection.')
    } finally {
      setIsTesting(false)
    }
  }

  const handleSave = async () => {
    if (!token.trim()) {
      toast.error('Please enter a valid API token')
      return
    }

    setIsValidating(true)
    const isValid = await validateToken(token.trim())
    setIsValidating(false)

    if (!isValid) {
      toast.error('Invalid TMDB API token. Please check and try again.')
      return
    }

    onSaveToken(token.trim())
    
    if (onSaveTriggerApiUrl && triggerApiUrl.trim()) {
      onSaveTriggerApiUrl(triggerApiUrl.trim())
    }
    
    toast.success('Settings saved successfully!')
    onOpenChange(false)
  }

  const handleClearCache = () => {
    clearTriggerCache()
    toast.success('Trigger data cache cleared!')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key size={24} />
            API Settings
          </DialogTitle>
          <DialogDescription>
            Configure TMDB API and custom trigger data API endpoints
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Key size={20} className="text-muted-foreground" />
              <h3 className="font-medium">TMDB API</h3>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="api-token">API Key (v3 auth)</Label>
              <Input
                id="api-token"
                type="password"
                placeholder="Enter your TMDB API key"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="font-mono text-sm"
              />
            </div>

            {currentToken && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle size={16} className="text-primary" />
                API token is currently configured
              </div>
            )}

            <div className="bg-muted/50 p-4 rounded-lg space-y-2 text-sm">
              <p className="font-medium">How to get your API key:</p>
              <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                <li>Create a free account at themoviedb.org</li>
                <li>Go to Settings → API</li>
                <li>Request an API key (choose "Developer" option)</li>
                <li>Copy your API Read Access Token (Bearer token) and paste it above</li>
              </ol>
            </div>

            <Button
              variant="outline"
              onClick={handleTestApi}
              disabled={isTesting}
              className="w-full"
            >
              <Flask size={16} className="mr-2" />
              {isTesting ? 'Testing API...' : 'Test API Connection'}
            </Button>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Database size={20} className="text-muted-foreground" />
              <h3 className="font-medium">Custom Trigger API</h3>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="trigger-api-url">API Base URL (Optional)</Label>
              <Input
                id="trigger-api-url"
                type="url"
                placeholder="https://api.example.com"
                value={triggerApiUrl}
                onChange={(e) => setTriggerApiUrl(e.target.value)}
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Configure your custom API endpoint for fetching trigger data. Leave empty to use local data.
              </p>
            </div>

            {currentTriggerApiUrl && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle size={16} className="text-primary" />
                Custom trigger API is configured
              </div>
            )}

            <div className="bg-muted/50 p-4 rounded-lg space-y-2 text-sm">
              <p className="font-medium">Expected API Endpoints:</p>
              <ul className="space-y-1 text-muted-foreground font-mono text-xs">
                <li>GET /triggers - Fetch all trigger data</li>
                <li>GET /triggers/:movieId - Fetch trigger data for specific movie</li>
              </ul>
            </div>

            <Button
              variant="outline"
              onClick={handleClearCache}
              className="w-full"
            >
              <Trash size={16} className="mr-2" />
              Clear Trigger Cache
            </Button>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isValidating}>
            {isValidating ? 'Validating...' : 'Save Token'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
