"use client"

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Code, Code2, Laptop, Server } from 'lucide-react'
import Link from 'next/link'
import { SpotlightCard } from '@/components/ui/animations/spotlight'
import { TypewriterEffect } from '@/components/ui/animations/typewriter-effect'
import { FlipWords } from '@/components/ui/animations/flip-words'

export function HeroSection() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const words = [
    { text: 'Full-Stack Developer', className: 'text-primary' },
    { text: 'UI/UX Designer', className: 'text-chart-2' },
    { text: 'React Expert', className: 'text-chart-1' },
    { text: 'Node.js Enthusiast', className: 'text-chart-4' },
  ]

  const flipWords = [
    "Node.js",
    "React",
    "TypeScript",
    "Next.js",
    "MongoDB",
  ]

  if (!isMounted) {
    return null
  }

  return (
    <section 
      id="hero" 
      className="min-h-screen relative flex items-center justify-center"
    >
      <SpotlightCard className="w-full max-w-3xl mx-auto">
        <div className="text-center space-y-8 py-24 px-4">
          <div className="space-y-4">
            <p className="text-xl text-primary font-medium">
              Hello, I&apos;m
            </p>
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
              Milan Katira
            </h1>
            
            <div className="h-16 flex items-center justify-center">
              <TypewriterEffect words={words} />
            </div>

            <div className="h-12 flex items-center justify-center text-2xl">
              <span className="text-muted-foreground mr-2">I work with</span>
              <FlipWords words={flipWords} />
            </div>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Crafting scalable, elegant, and impactful digital experiences.
              4+ years of building modern web applications.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center">
            <Button asChild size="lg" className="font-medium">
              <Link href="#projects">View My Work</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-medium">
              <Link href="#contact">Contact Me</Link>
            </Button>
          </div>
          
          <div className="flex items-center justify-center space-x-6 pt-8">
            <Code2 className="h-8 w-8 text-primary animate-bounce" />
            <Laptop className="h-8 w-8 text-chart-2 animate-bounce delay-100" />
            <Server className="h-8 w-8 text-chart-4 animate-bounce delay-200" />
            <Code className="h-8 w-8 text-chart-1 animate-bounce delay-300" />
          </div>
        </div>
      </SpotlightCard>
    </section>
  )
}