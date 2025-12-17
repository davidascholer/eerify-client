import { ReactNode } from 'react'
import { Button } from '@/components/ui/button'

interface CreepsterButtonProps {
  children: ReactNode
  icon?: ReactNode
  onClick?: () => void
  href?: string
  className?: string
  disabled?: boolean
  variant?: 'default' | 'inverted'
}

export function CreepsterButton({
  children,
  icon,
  onClick,
  href,
  className = '',
  disabled = false,
  variant = 'default',
}: CreepsterButtonProps) {
  const buttonContent = (
    <>
      {icon && <span className="mr-2 flex items-center">{icon}</span>}
      {children}
    </>
  )

  const colorClasses = variant === 'inverted' 
    ? 'bg-accent hover:bg-accent/90 text-primary' 
    : 'bg-primary hover:bg-primary/90 text-accent'

  const baseClasses = `
    w-full 
    ${colorClasses}
    font-bold 
    rounded-md 
    py-6 
    text-lg 
    transition-all
    cursor-pointer
    ${className}
  `.trim()

  const textStyle = {
    fontFamily: "'Creepster', cursive",
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.6)',
  }

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full"
      >
        <Button className={baseClasses} style={textStyle} disabled={disabled}>
          {buttonContent}
        </Button>
      </a>
    )
  }

  return (
    <Button
      onClick={onClick}
      className={baseClasses}
      style={textStyle}
      disabled={disabled}
    >
      {buttonContent}
    </Button>
  )
}
