import * as React from 'react'
import { cn } from '../utils'

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'tertiary'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

export function Badge({ variant = 'info', className, children, ...props }: BadgeProps) {
  const variantClass = `badge-${variant}`
  return (
    <span className={cn(variantClass, className)} {...props}>
      {children}
    </span>
  )
}
