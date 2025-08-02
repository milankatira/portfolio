"use client"
import { cn } from '@/lib/utils'
import TechStack from './TechStack'
import { useEffect, useState } from 'react'

export function TechStackSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    const section = document.getElementById("tech-stack")
    if (section) {
      observer.observe(section)
    }

    return () => {
      observer.disconnect()
    }
  }, [])


  return (
    <section id='tech-stack' className="container bg-white dark:bg-black-100">
      <div className="text-center">
        <h2
          id="tech-stack-heading"
          className={cn(
            "text-4xl md:text-5xl font-bold mb-4 transition-all duration-700 text-white tracking-tight",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          )}
        >
          Technology Stack
        </h2>
      </div>

      <div
        className={cn(
          "transition-all duration-700 delay-200",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        )}
      >
        <TechStack />
      </div>
    </section>
  )
}
