"use client"

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { GlowCard } from '@/components/ui/animations/glow-card'
import { Award, Book, Code, Lightbulb, User, Wrench, GraduationCap } from 'lucide-react' // Added icons for new sections

// Define data for different sections within the About page
const aboutSections = [
  {
    id: 'bio',
    name: 'Bio',
    icon: <User className="h-5 w-5 mr-2" />, // Icon for Bio
    content: (
      <div className="space-y-4 text-muted-foreground">
        <p>
          With over 4 years of experience in full-stack development, I specialize in building responsive, performant, and accessible web applications that solve real-world problems.
        </p>
        <p>
          My journey began with a deep fascination for web technologies and a desire to create meaningful digital experiences. Since then, I've worked with a diverse range of clients and projects, from startups to enterprise applications.
        </p>
        <p>
          I'm particularly passionate about front-end architecture, state management, and creating delightful user experiences that marry form and function seamlessly.
        </p>
        <p>
          When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or sharing my knowledge through technical writing and mentorship.
        </p>
      </div>
    ),
  },
  {
    id: 'highlights',
    name: 'Highlights',
    icon: <Lightbulb className="h-5 w-5 mr-2" />, // Icon for Highlights
    content: (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Existing highlights data */}
        {[
          {
            icon: <Code className="h-8 w-8 text-primary" />,
            title: "Web Development",
            description: "Expert in React, TypeScript, Next.js, and Node.js for building modern web applications."
          },
          {
            icon: <Award className="h-8 w-8 text-chart-1" />,
            title: "Quality Focus",
            description: "Dedicated to writing clean, maintainable code with comprehensive testing strategies."
          },
          {
            icon: <Book className="h-8 w-8 text-chart-2" />,
            title: "Continuous Learning",
            description: "Always learning new technologies and best practices to stay at the cutting edge."
          },
          {
            icon: <Lightbulb className="h-8 w-8 text-chart-4" />,
            title: "Problem Solver",
            description: "Analytical thinker who enjoys finding elegant solutions to complex problems."
          }
        ].map((highlight, index) => (
          <GlowCard
            key={index}
            className="p-6 h-full"
          >
            <div className="flex flex-col h-full">
              <div className="mb-4">{highlight.icon}</div>
              <h3 className="text-xl font-bold mb-2">{highlight.title}</h3>
              <p className="text-muted-foreground text-sm">{highlight.description}</p>
            </div>
          </GlowCard>
        ))}
      </div>
    ),
  },
  // You can add more sections here, e.g., Skills, Education, Interests
  // {
  //   id: 'skills',
  //   name: 'Skills',
  //   icon: <Wrench className="h-5 w-5 mr-2" />,
  //   content: (
  //     <div>
  //       <h3 className="text-2xl font-bold mb-4">Skills</h3>
  //       {/* Add your skills content here */}
  //     </div>
  //   ),
  // },
  // {
  //   id: 'education',
  //   name: 'Education',
  //   icon: <GraduationCap className="h-5 w-5 mr-2" />,
  //   content: (
  //     <div>
  //       <h3 className="text-2xl font-bold mb-4">Education</h3>
  //       {/* Add your education content here */}
  //     </div>
  //   ),
  // },
]

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedSectionId, setSelectedSectionId] = useState(aboutSections[0].id) // State to track selected section

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

    const section = document.getElementById('about')
    if (section) {
      observer.observe(section)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  const selectedSection = aboutSections.find(section => section.id === selectedSectionId)

  return (
    <section
      id="about"
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
            About Me
          </h2>
          <p
            className={cn(
              "text-xl text-muted-foreground max-w-2xl mx-auto transition-all duration-700 delay-100",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            A passionate developer dedicated to crafting exceptional digital experiences.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Left Column: Section Navigation */}
          <div
            className={cn(
              "w-full md:w-1/4 flex flex-col space-y-4 transition-all duration-700 delay-200",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
            )}
          >
            {aboutSections.map((section) => (
              <button
                key={section.id}
                className={cn(
                  "flex items-center px-4 py-3 rounded-lg text-left transition-colors",
                  selectedSectionId === section.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                )}
                onClick={() => setSelectedSectionId(section.id)}
              >
                {section.icon}
                <span className="font-medium">{section.name}</span>
              </button>
            ))}
          </div>

          {/* Right Column: Section Content */}
          <div
            className={cn(
              "w-full md:w-3/4 transition-all duration-700 delay-300",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
            )}
          >
            {selectedSection && (
              <div className="space-y-6">
                 <h3 className="text-2xl font-bold">{selectedSection.name}</h3> {/* Add section title */}
                {selectedSection.content}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
