import { CaretRight, House } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'

interface BreadcrumbItem {
  label: string
  onClick?: () => void
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  variant?: 'default' | 'overlay'
}

export function Breadcrumbs({ items, variant = 'default' }: BreadcrumbsProps) {
  if (items.length === 0) return null

  const isOverlay = variant === 'overlay'

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
      <Button
        variant="ghost"
        size="sm"
        onClick={items[0].onClick}
        className={`h-8 gap-2 px-2 ${
          isOverlay 
            ? 'text-white/80 hover:text-white hover:bg-white/10' 
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        <House size={16} />
        <span>{items[0].label}</span>
      </Button>
      
      {items.slice(1).map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <CaretRight size={16} className={isOverlay ? 'text-white/60' : 'text-muted-foreground'} />
          {item.onClick ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={item.onClick}
              className={`h-8 px-2 ${
                isOverlay 
                  ? 'text-white/80 hover:text-white hover:bg-white/10' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {item.label}
            </Button>
          ) : (
            <span className={`px-2 font-medium ${isOverlay ? 'text-white' : 'text-foreground'}`}>
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  )
}
