import { SortOption } from '../lib/types'
import { HorrorSubgenre, HORROR_SUBGENRES } from '../lib/subgenres'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { X } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'

interface FilterBarProps {
  sortOption: SortOption
  onSortChange: (sort: SortOption) => void
  subgenreFilter: HorrorSubgenre | null
  onSubgenreChange: (subgenre: HorrorSubgenre | null) => void
}

export function FilterBar({ sortOption, onSortChange, subgenreFilter, onSubgenreChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Select value={sortOption} onValueChange={(value) => onSortChange(value as SortOption)}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="rating-high">Rating: High to Low</SelectItem>
          <SelectItem value="rating-low">Rating: Low to High</SelectItem>
          <SelectItem value="date-new">Date: Newest First</SelectItem>
          <SelectItem value="date-old">Date: Oldest First</SelectItem>
          <SelectItem value="title-az">Title: A-Z</SelectItem>
          <SelectItem value="title-za">Title: Z-A</SelectItem>
        </SelectContent>
      </Select>

      <Select value={subgenreFilter || 'all'} onValueChange={(value) => onSubgenreChange(value === 'all' ? null : value as HorrorSubgenre)}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Filter by subgenre" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Subgenres</SelectItem>
          {HORROR_SUBGENRES.map(subgenre => (
            <SelectItem key={subgenre} value={subgenre}>
              {subgenre}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {subgenreFilter && (
        <Badge variant="secondary" className="gap-1">
          {subgenreFilter}
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 p-0 hover:bg-transparent"
            onClick={() => onSubgenreChange(null)}
          >
            <X size={12} />
          </Button>
        </Badge>
      )}
    </div>
  )
}
