import { useState } from 'react'
import { MovieDetails } from '@/lib/types'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Copy, Check, Link as LinkIcon } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface ShareMovieDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  movie: MovieDetails
  userRating?: number
  userReview?: string
}

interface ShareOptions {
  includeTitle: boolean
  includeOverview: boolean
  includeRating: boolean
  includeReview: boolean
  includeTrailer: boolean
  includeYear: boolean
  includeRuntime: boolean
}

export function ShareMovieDialog({
  open,
  onOpenChange,
  movie,
  userRating,
  userReview,
}: ShareMovieDialogProps) {
  const [copied, setCopied] = useState(false)
  const [shareOptions, setShareOptions] = useState<ShareOptions>({
    includeTitle: true,
    includeOverview: true,
    includeRating: true,
    includeReview: !!userReview,
    includeTrailer: true,
    includeYear: true,
    includeRuntime: true,
  })

  const trailer = movie.videos?.results.find(
    (v) => v.type === 'Trailer' && v.site === 'YouTube'
  )

  const generateShareText = () => {
    const parts: string[] = []

    if (shareOptions.includeTitle) {
      parts.push(`🎬 ${movie.title}`)
    }

    const metadata: string[] = []
    if (shareOptions.includeYear && movie.release_date) {
      metadata.push(new Date(movie.release_date).getFullYear().toString())
    }
    if (shareOptions.includeRuntime && movie.runtime) {
      metadata.push(`${movie.runtime} min`)
    }
    if (metadata.length > 0) {
      parts.push(`(${metadata.join(' • ')})`)
    }

    if (shareOptions.includeRating) {
      const rating = userRating ?? movie.vote_average
      parts.push(`⭐ ${rating.toFixed(1)}/10`)
    }

    if (shareOptions.includeOverview && movie.overview) {
      parts.push(`\n${movie.overview}`)
    }

    if (shareOptions.includeReview && userReview) {
      parts.push(`\n📝 My Review: ${userReview}`)
    }

    if (shareOptions.includeTrailer && trailer) {
      parts.push(`\n🎥 Watch Trailer: https://www.youtube.com/watch?v=${trailer.key}`)
    }

    return parts.join('\n')
  }

  const generateShareLink = () => {
    const baseUrl = window.location.origin
    const movieData = {
      id: movie.id,
      title: movie.title,
      overview: shareOptions.includeOverview ? movie.overview : undefined,
      rating: shareOptions.includeRating ? (userRating ?? movie.vote_average) : undefined,
      review: shareOptions.includeReview ? userReview : undefined,
      trailer: shareOptions.includeTrailer && trailer ? trailer.key : undefined,
      year: shareOptions.includeYear && movie.release_date ? new Date(movie.release_date).getFullYear() : undefined,
      runtime: shareOptions.includeRuntime ? movie.runtime : undefined,
    }
    
    const encodedData = btoa(JSON.stringify(movieData))
    return `${baseUrl}?movie=${encodedData}`
  }

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(generateShareText())
      setCopied(true)
      toast.success('Movie details copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast.error('Failed to copy to clipboard')
    }
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(generateShareLink())
      setCopied(true)
      toast.success('Share link copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast.error('Failed to copy link')
    }
  }

  const toggleOption = (key: keyof ShareOptions) => {
    setShareOptions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Share Movie Details</DialogTitle>
          <DialogDescription>
            Choose what information to share about {movie.title}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-3">
            <Label className="text-base font-semibold">Include in Share</Label>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="title"
                  checked={shareOptions.includeTitle}
                  onCheckedChange={() => toggleOption('includeTitle')}
                  disabled
                />
                <Label
                  htmlFor="title"
                  className="text-sm font-normal cursor-pointer text-muted-foreground"
                >
                  Title (required)
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="year"
                  checked={shareOptions.includeYear}
                  onCheckedChange={() => toggleOption('includeYear')}
                />
                <Label
                  htmlFor="year"
                  className="text-sm font-normal cursor-pointer"
                >
                  Release Year
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="runtime"
                  checked={shareOptions.includeRuntime}
                  onCheckedChange={() => toggleOption('includeRuntime')}
                />
                <Label
                  htmlFor="runtime"
                  className="text-sm font-normal cursor-pointer"
                >
                  Runtime
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rating"
                  checked={shareOptions.includeRating}
                  onCheckedChange={() => toggleOption('includeRating')}
                />
                <Label
                  htmlFor="rating"
                  className="text-sm font-normal cursor-pointer"
                >
                  Rating
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="overview"
                  checked={shareOptions.includeOverview}
                  onCheckedChange={() => toggleOption('includeOverview')}
                />
                <Label
                  htmlFor="overview"
                  className="text-sm font-normal cursor-pointer"
                >
                  Plot Overview
                </Label>
              </div>

              {userReview && (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="review"
                    checked={shareOptions.includeReview}
                    onCheckedChange={() => toggleOption('includeReview')}
                  />
                  <Label
                    htmlFor="review"
                    className="text-sm font-normal cursor-pointer"
                  >
                    Your Review
                  </Label>
                </div>
              )}

              {trailer && (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="trailer"
                    checked={shareOptions.includeTrailer}
                    onCheckedChange={() => toggleOption('includeTrailer')}
                  />
                  <Label
                    htmlFor="trailer"
                    className="text-sm font-normal cursor-pointer"
                  >
                    Trailer Link
                  </Label>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-semibold">Preview</Label>
            <div className="p-4 bg-muted rounded-lg border border-border">
              <pre className="text-xs text-foreground whitespace-pre-wrap font-sans break-words">
                {generateShareText()}
              </pre>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={handleCopyText}
              className="flex-1"
              variant="default"
            >
              {copied ? (
                <>
                  <Check className="mr-2" size={18} />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="mr-2" size={18} />
                  Copy as Text
                </>
              )}
            </Button>
            <Button
              onClick={handleCopyLink}
              className="flex-1"
              variant="outline"
            >
              <LinkIcon className="mr-2" size={18} />
              Copy Share Link
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
