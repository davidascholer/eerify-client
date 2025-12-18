import { Button } from '@/components/ui/button'
import { ArrowRight } from '@phosphor-icons/react'

interface MovieListHeaderProps {
  title: string
  onViewAll?: () => void
  totalCount?: number
}

export function MovieListHeader({ title, onViewAll, totalCount }: MovieListHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 
        className={`text-2xl font-bold text-foreground tracking-tight ${
          onViewAll ? 'cursor-pointer hover:text-primary transition-colors' : ''
        }`}
        onClick={onViewAll}
      >
        {title}
      </h2>
      {onViewAll && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onViewAll}
          className="gap-2 cursor-pointer"
        >
          View All
          <ArrowRight size={16} />
        </Button>
      )}
    </div>
  )
}
