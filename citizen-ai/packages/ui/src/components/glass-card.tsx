import * as React from 'react'
import { cn } from '../utils'

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  raised?: boolean
  children: React.ReactNode
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, raised = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          raised ? 'glass-card-raised' : 'glass-card',
          'rounded-2xl',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
GlassCard.displayName = 'GlassCard'
