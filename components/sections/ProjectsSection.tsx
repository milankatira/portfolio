"use client"

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { GlowCard } from '@/components/ui/animations/glow-card'
import { ExternalLink, Github } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Project, ProjectCategory, projects } from '@/lib/data'

export function ProjectsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'all'>('all')
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    
    const section = document.getElementById('projects')
    if (section) {
      observer.observe(section)
    }
    
    return () => {
      observer.disconnect()
    }
  }, [])
  
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter(project => project.category === selectedCategory))
    }
  }, [selectedCategory])
  
  const categories: { value: ProjectCategory | 'all', label: string }[] = [
    { value: 'all', label: 'All Projects' },
    { value: 'frontend', label: 'Frontend' },
    { value: 'fullstack', label: 'Full Stack' },
    { value: 'mobile', label: 'Mobile' },
    { value: 'design', label: 'Design' }
  ]
  
  return (
    <section 
      id="projects" 
      className="py-24 relative bg-muted/30"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 
            className={cn(
              "text-3xl md:text-4xl font-bold mb-4 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            Featured Projects
          </h2>
          <p 
            className={cn(
              "text-xl text-muted-foreground max-w-2xl mx-auto transition-all duration-700 delay-100",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            A selection of my recent work across various technologies and domains.
          </p>
        </div>
        
        {/* Category filter */}
        <div 
          className={cn(
            "flex flex-wrap justify-center gap-3 mb-12 transition-all duration-700 delay-200",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.value)}
              className="rounded-full px-6"
            >
              {category.label}
            </Button>
          ))}
        </div>
        
        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <GlowCard
              key={project.id}
              className={cn(
                "h-full transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                { 
                  "delay-300": index % 3 === 0, 
                  "delay-400": index % 3 === 1, 
                  "delay-500": index % 3 === 2 
                }
              )}
            >
              <div className="flex flex-col h-full">
                <div className="relative w-full h-48 rounded-t-xl overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="mb-1">
                    <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                      {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mt-2 mb-2">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-grow">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech, i) => (
                      <span 
                        key={i} 
                        className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex gap-3 mt-auto">
                    <Button asChild variant="default" size="sm" className="flex-1">
                      <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Demo
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="flex-1">
                      <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  )
}