import { useState, useEffect } from 'react'
import { getWatchProviders, getImageUrl, WatchProviders } from '../api/tmdb'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TelevisionSimple, ShoppingCart, CurrencyDollar } from '@phosphor-icons/react'

interface WhereToWatchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  movieId: number
  movieTitle: string
}

export function WhereToWatchDialog({
  open,
  onOpenChange,
  movieId,
  movieTitle,
}: WhereToWatchDialogProps) {
  const [providers, setProviders] = useState<WatchProviders | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (open && movieId) {
      const fetchProviders = async () => {
        setLoading(true)
        const data = await getWatchProviders(movieId)
        setProviders(data)
        setLoading(false)
      }
      fetchProviders()
    }
  }, [open, movieId])

  const hasAnyProviders = providers && (
    (providers.flatrate && providers.flatrate.length > 0) ||
    (providers.rent && providers.rent.length > 0) ||
    (providers.buy && providers.buy.length > 0)
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Where to Watch</DialogTitle>
          <DialogDescription>
            Find out where you can stream, rent, or buy <span className="font-semibold">{movieTitle}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-muted-foreground">Loading providers...</div>
            </div>
          ) : !hasAnyProviders ? (
            <div className="text-center py-12 space-y-3">
              <p className="text-muted-foreground">
                No streaming providers found for this movie in the US.
              </p>
              <p className="text-sm text-muted-foreground">
                Try checking your local streaming services or digital storefronts.
              </p>
            </div>
          ) : (
            <Tabs defaultValue="stream" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="stream" disabled={!providers?.flatrate || providers.flatrate.length === 0}>
                  <TelevisionSimple className="mr-2" size={16} />
                  Stream
                  {providers?.flatrate && providers.flatrate.length > 0 && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {providers.flatrate.length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="rent" disabled={!providers?.rent || providers.rent.length === 0}>
                  <CurrencyDollar className="mr-2" size={16} />
                  Rent
                  {providers?.rent && providers.rent.length > 0 && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {providers.rent.length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="buy" disabled={!providers?.buy || providers.buy.length === 0}>
                  <ShoppingCart className="mr-2" size={16} />
                  Buy
                  {providers?.buy && providers.buy.length > 0 && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {providers.buy.length}
                    </Badge>
                  )}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="stream" className="mt-6">
                {providers?.flatrate && providers.flatrate.length > 0 ? (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground mb-4">
                      Available to stream with subscription:
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {providers.flatrate.map((provider) => (
                        <div
                          key={provider.provider_id}
                          className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border bg-card hover:bg-accent/10 transition-colors"
                        >
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-white">
                            <img
                              src={getImageUrl(provider.logo_path, 'w185') || ''}
                              alt={provider.provider_name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <span className="text-sm font-medium text-center text-foreground">
                            {provider.provider_name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No streaming options available
                  </div>
                )}
              </TabsContent>

              <TabsContent value="rent" className="mt-6">
                {providers?.rent && providers.rent.length > 0 ? (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground mb-4">
                      Available to rent:
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {providers.rent.map((provider) => (
                        <div
                          key={provider.provider_id}
                          className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border bg-card hover:bg-accent/10 transition-colors"
                        >
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-white">
                            <img
                              src={getImageUrl(provider.logo_path, 'w185') || ''}
                              alt={provider.provider_name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <span className="text-sm font-medium text-center text-foreground">
                            {provider.provider_name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No rental options available
                  </div>
                )}
              </TabsContent>

              <TabsContent value="buy" className="mt-6">
                {providers?.buy && providers.buy.length > 0 ? (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground mb-4">
                      Available to purchase:
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {providers.buy.map((provider) => (
                        <div
                          key={provider.provider_id}
                          className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border bg-card hover:bg-accent/10 transition-colors"
                        >
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-white">
                            <img
                              src={getImageUrl(provider.logo_path, 'w185') || ''}
                              alt={provider.provider_name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <span className="text-sm font-medium text-center text-foreground">
                            {provider.provider_name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No purchase options available
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}

          {providers?.link && (
            <div className="mt-6 pt-6 border-t border-border">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => window.open(providers.link, '_blank')}
              >
                View on JustWatch
              </Button>
            </div>
          )}

          <p className="text-xs text-muted-foreground text-center mt-4">
            Data provided by TMDB. Availability may vary by region.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
