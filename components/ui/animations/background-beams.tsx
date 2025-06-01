"use client"

import React, { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface BackgroundBeamsProps extends React.HTMLAttributes<HTMLDivElement> {
  disableAnimation?: boolean
}

export function BackgroundBeams({
  className,
  disableAnimation = false,
  ...props
}: BackgroundBeamsProps) {
  const [opacity, setOpacity] = useState(0)
  const [size, setSize] = useState(0)
  const beamRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (disableAnimation) {
      setOpacity(1)
      setSize(500)
      return
    }

    // Fade in the beams
    const fadeInTimeout = setTimeout(() => {
      setOpacity(1)
    }, 300)

    // Grow the beams
    const growTimeout = setTimeout(() => {
      setSize(500)
    }, 600)

    return () => {
      clearTimeout(fadeInTimeout)
      clearTimeout(growTimeout)
    }
  }, [disableAnimation])

  // Optional parallax effect on mouse move
  useEffect(() => {
    if (disableAnimation || !beamRef.current) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = beamRef.current?.getBoundingClientRect()
      if (!rect) return
      
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      const moveX = x - rect.width / 2
      const moveY = y - rect.height / 2
      
      beamRef.current.style.setProperty("--mouse-x", `${moveX}px`)
      beamRef.current.style.setProperty("--mouse-y", `${moveY}px`)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [disableAnimation])

  return (
    <div
      ref={beamRef}
      className={cn(
        "h-screen w-full overflow-hidden fixed top-0 left-0 right-0 bottom-0 pointer-events-none z-0",
        className
      )}
      style={{
        "--beam-opacity": opacity,
        "--beam-size": `${size}px`,
      } as React.CSSProperties}
      {...props}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[var(--beam-size)] w-[var(--beam-size)] bg-[radial-gradient(circle_at_center,_var(--chart-1)_0%,_transparent_70%)] opacity-[var(--beam-opacity)] blur-[60px] transition-all duration-1000" />
      <div className="absolute top-1/3 right-1/3 h-[var(--beam-size)] w-[var(--beam-size)] bg-[radial-gradient(circle_at_center,_var(--chart-2)_0%,_transparent_70%)] opacity-[var(--beam-opacity)] blur-[60px] transition-all duration-1000" />
      <div className="absolute bottom-1/3 left-1/3 h-[var(--beam-size)] w-[var(--beam-size)] bg-[radial-gradient(circle_at_center,_var(--chart-4)_0%,_transparent_70%)] opacity-[var(--beam-opacity)] blur-[60px] transition-all duration-1000" />
    </div>
  )
}