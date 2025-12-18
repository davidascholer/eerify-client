import { Badge } from '@/components/ui/badge'
import { X } from '@phosphor-icons/react'
import type { Tag } from '../lib/types'
import { motion } from 'framer-motion'

interface TagsFilterProps {
  tags: Tag[]
  selectedTags: string[]
  onTagToggle: (tagId: string) => void
  onClearAll: () => void
}

export function TagsFilter({
  tags,
  selectedTags,
  onTagToggle,
  onClearAll,
}: TagsFilterProps) {
  const horrorTags = tags.filter((tag) => {
    const lowerName = tag.name.toLowerCase()
    return (
      lowerName.includes('horror') ||
      lowerName.includes('survival') ||
      lowerName.includes('scary') ||
      lowerName.includes('dark') ||
      lowerName.includes('gore') ||
      lowerName.includes('atmospheric') ||
      lowerName.includes('zombie') ||
      lowerName.includes('psychological')
    )
  })

  if (horrorTags.length === 0) return null

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">Horror Sub-Genres</h3>
        {selectedTags.length > 0 && (
          <button
            onClick={onClearAll}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            Clear all
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {horrorTags.map((tag) => {
          const isSelected = selectedTags.includes(String(tag.id))
          return (
            <motion.div
              key={tag.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Badge
                variant={isSelected ? 'default' : 'outline'}
                className={`cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-accent text-accent-foreground hover:bg-accent/90'
                    : 'hover:bg-accent/20 hover:border-accent'
                }`}
                onClick={() => onTagToggle(String(tag.id))}
              >
                {tag.name}
              </Badge>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
