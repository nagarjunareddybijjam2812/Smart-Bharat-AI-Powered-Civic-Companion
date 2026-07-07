import * as React from 'react'
import { cn } from '../utils'
import { Sparkles } from 'lucide-react'

interface AiOrbProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
}

const iconSizeMap = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
}

export function AiOrb({ size = 'md', className, ...props }: AiOrbProps) {
  return (
    <div
      className={cn('ai-orb rounded-xl flex items-center justify-center', sizeMap[size], className)}
      {...props}
    >
      <Sparkles className={cn('text-white', iconSizeMap[size])} />
    </div>
  )
}
