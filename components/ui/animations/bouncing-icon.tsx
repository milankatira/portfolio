"use client"

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface BouncingIconProps {
  icon: React.ReactNode
  delay?: number
  className?: string
}

export function BouncingIcon({
  icon,
  delay = 0,
  className,
}: BouncingIconProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
      setIsAnimating(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div 
      className={cn(
        "opacity-0 transition-all duration-500 transform translate-y-4",
        isVisible && "opacity-100 translate-y-0",
        isAnimating && "animate-bounce",
        className
      )}
    >
      {icon}
    </div>
  )
}