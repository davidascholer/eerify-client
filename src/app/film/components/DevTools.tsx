import { useState, useEffect } from 'react'
import { useKV } from '@/lib/storage/useKV'
import { Button } from '@/components/ui/button'
import { Code, CodeBlock } from '@phosphor-icons/react'
import { toast } from 'sonner'

export function DevTools() {
  const [isDevMode, setIsDevMode] = useState(false)
  const [devToolsEnabled, setDevToolsEnabled] = useKV<boolean>('dev-tools-enabled', false)

  useEffect(() => {
    const isDev = import.meta.env.DEV || import.meta.env.MODE === 'development'
    setIsDevMode(isDev)
  }, [])

  if (!isDevMode) {
    return null
  }

  const handleToggle = () => {
    setDevToolsEnabled((current) => !current)
    toast.success(devToolsEnabled ? 'Dev Tools Disabled' : 'Dev Tools Enabled')
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {devToolsEnabled && (
        <div className="bg-accent text-accent-foreground px-3 py-1 rounded-md text-sm font-medium shadow-lg">
          Dev Mode Active
        </div>
      )}
      <Button
        onClick={handleToggle}
        size="icon"
        variant={devToolsEnabled ? 'default' : 'outline'}
        className="h-12 w-12 rounded-full shadow-lg cursor-pointer"
        title={devToolsEnabled ? 'Disable Dev Tools' : 'Enable Dev Tools'}
      >
        {devToolsEnabled ? <CodeBlock size={24} /> : <Code size={24} />}
      </Button>
    </div>
  )
}

export function useDevTools() {
  const [devToolsEnabled] = useKV<boolean>('dev-tools-enabled', false)
  const [isDevMode, setIsDevMode] = useState(false)

  useEffect(() => {
    const isDev = import.meta.env.DEV || import.meta.env.MODE === 'development'
    setIsDevMode(isDev)
  }, [])

  const copyToClipboard = async (data: unknown, label: string = 'Data') => {
    if (!isDevMode || !devToolsEnabled) {
      return
    }

    try {
      const jsonString = JSON.stringify(data, null, 2)
      await navigator.clipboard.writeText(jsonString)
      toast.success(`${label} copied to clipboard!`, {
        description: 'JSON data is now in your clipboard',
      })
    } catch (error) {
      toast.error('Failed to copy to clipboard', {
        description: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  }

  return {
    isDevToolsEnabled: isDevMode && devToolsEnabled,
    copyToClipboard,
  }
}
