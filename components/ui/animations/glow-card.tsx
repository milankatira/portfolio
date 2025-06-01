"use client"

import { useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  glowClassName?: string
}

export function GlowCard({
  children,
  className,
  containerClassName,
  glowClassName,
  ...props
}: GlowCardProps) {
  const divRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return
    
    const rect = divRef.current.getBoundingClientRect()
    
    // Calculate relative position within the element
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative overflow-hidden rounded-xl",
        containerClassName
      )}
      {...props}
    >
      {/* Glow effect */}
      <div
        className={cn(
          "absolute pointer-events-none opacity-0 transition-opacity duration-500",
          isHovered && "opacity-100",
          glowClassName
        )}
        style={{
          background: isHovered
            ? `radial-gradient(600px circle at ${position.x}px ${position.y}px, hsla(var(--chart-1) / 0.25), transparent 40%)`
            : "",
          height: "100%",
          width: "100%",
          left: 0,
          top: 0,
        }}
      />
      
      {/* Card content */}
      <div
        className={cn(
          "relative h-full transition-all duration-300 bg-card border-border border rounded-xl",
          className,
          isHovered && "scale-[0.98]"
        )}
      >
        {children}
      </div>
    </div>
  )
}