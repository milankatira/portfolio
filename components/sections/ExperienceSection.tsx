"use client"

import { useEffect, useState, useRef, type KeyboardEvent } from "react"
import { cn } from "@/lib/utils"
import { ArrowRight, Building, MapPin, Calendar } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import { MagicCard } from "../magicui/magic-card"
import { parseTextWithBold } from "@/utils/parseTextWithBold"

interface ExperienceEntry {
  id: string
  company: string
  logo?: string
  title: string
  duration: string
  location: string
  details: string[]
  color: string
}

const workExperience: ExperienceEntry[] = [
  {
    id: "instaservice",
    company: "Instaservice",
    title: "Senior Software Engineer",
    duration: "Aug 2023 – Present",
    location: "Remote (USA)",
    color: "#06b6d4",
    details: [
      "**Led frontend development** of Instaservice.com and bo.instaservice.com in collaboration with a junior developer, using **TypeScript, React, React Query, and Tailwind CSS**.",
      "**Designed and maintained** a scalable design system and reusable component library with **Storybook**, supporting consistent UI/UX across apps.",
      "Built **advanced booking experiences** including:",
      "  - **Smart calendar UI**: 7-day dynamic view with slot rendering, blocked dates, and timezone-aware scheduling.",
      "  - **On-demand service booking**, rescheduling, custom service provider selection, and quote requests for large projects.",
      "  - **Recurring bookings** with complete payment edge-case handling, including retries, failures, and fallback states.",
      "Developed **real-time features** such as chat between customers and providers, and **live location tracking** during service sessions.",
      "**Automated CI/CD pipelines** with formatting, linting, and type-check validations using **Prettier, ESLint, and TypeScript** before production builds.",
      "Integrated **monitoring and analytics tools** including **PostHog and Sentry** to track user behavior and proactively address production issues.",
    ],
  },
  {
    id: "cerebry",
    company: "Cerebry",
    title: "Senior Software Engineer",
    duration: "Feb 2023 – Aug 2023",
    location: "Remote (Singapore)",
    color: "#6366F1",
    details: [
      "Contributed to the frontend of a **high-scale AI-powered edtech platform** used by **20,000+ active students weekly**.",
      "Built **responsive and scalable user interfaces** using **React and Preact**, styled with **SCSS**, and integrated advanced charting libraries for visualizing learning progress.",
      "Enhanced user experience through design collaboration, resulting in a **15% reduction in friction** and a **10% increase in task completion**.",
      "Implemented **analytics tools** such as **Google Analytics and Google Tag Manager** to track key user interactions and improve engagement.",
      "**Mentored three junior developers** and deployed frontend features in coordination with backend **Node.js services** via **CI/CD pipelines**.",
      "Participated in hiring by conducting **technical interviews for 20+ candidates** and onboarding **three successful hires**.",
    ],
  },
  {
    id: "ics",
    company: "ICS",
    title: "Junior Software Engineer",
    duration: "Oct 2021 – Feb 2023",
    location: "Ahmedabad, India",
    color: "#2DD4BF",
    details: [
      "Developed and maintained **full-stack applications** using **ReactJS, NextJS, NodeJS, and MongoDB**, applying **test-driven development** to ensure high code quality and reliability.",
      "Designed **RESTful APIs** and created **scalable database models**, supporting multiple production-level systems across different use cases.",
      "Built frontend and backend development efforts on several **large-scale platforms**:",
      "  - Engineered a backend system that handled **8.7 million API requests within 48 hours** and supported over **15,000 unique users per day**.",
      "  - Built a comprehensive **interview and hiring platform** with **Google Meet and Zoom integration**, online coding and MCQ assessments, and optimized memory usage (**1.2 GB RAM handling 300+ sessions**).",
      "  - Delivered **reusable UI components** and dynamic user flows for a high-volume video content platform using **ReactJS** and modular design principles.",
      "Contributed to a **global retail technology project** by writing utility functions with **100% unit test coverage** and implementing complex modal and interface logic.",
      "Collaborated with blockchain developers to write and deploy **smart contracts in Solidity**, integrating with **Binance Smart Chain (BSC)** and **Hedera Hashgraph**.",
      "Participated in the backend architecture for a **distributed application ecosystem**, incorporating tools like **Contentful CMS, Customer.io, and JW Player API** to enable content management and automation.",
    ],
  },
];


export function ExperienceSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedCompanyId, setSelectedCompanyId] = useState(workExperience[0].id)
  const [scrolling, setScrolling] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const companySectionsRef = useRef<(HTMLDivElement | null)[]>([])
  const navRefs = useRef<(HTMLButtonElement | null)[]>([])

  // Get the selected company data
  const selectedCompany = workExperience.find((company) => company.id === selectedCompanyId) || workExperience[0]
  const selectedIndex = workExperience.findIndex((company) => company.id === selectedCompanyId)

  // Set up intersection observer for initial animation
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

    const section = document.getElementById("experience")
    if (section) {
      observer.observe(section)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  // Set up scroll snapping and company selection based on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || scrolling) return

      const container = sectionRef.current
      const { scrollTop } = container

      // Find which company section is most visible
      const sectionHeight = container.clientHeight
      const currentIndex = Math.round(scrollTop / sectionHeight)

      if (currentIndex >= 0 && currentIndex < workExperience.length) {
        const newCompanyId = workExperience[currentIndex].id
        if (newCompanyId !== selectedCompanyId) {
          setSelectedCompanyId(newCompanyId)
        }
      }
    }

    const sectionElement = sectionRef.current
    if (sectionElement) {
      sectionElement.addEventListener("scroll", handleScroll)
    }

    return () => {
      if (sectionElement) {
        sectionElement.removeEventListener("scroll", handleScroll)
      }
    }
  }, [selectedCompanyId, scrolling])

  // Set up keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Enter") {
        // Move to next company on Enter key
        const nextIndex = (selectedIndex + 1) % workExperience.length
        const nextCompanyId = workExperience[nextIndex].id
        handleCompanyChange(nextCompanyId)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [selectedIndex])

  // Handle company selection via click or keyboard
  const handleCompanyChange = (companyId: string) => {
    if (companyId === selectedCompanyId) return

    setScrolling(true)
    setSelectedCompanyId(companyId)

    // Find the index of the selected company
    const index = workExperience.findIndex((company) => company.id === companyId)

    // Scroll to the selected company section
    if (sectionRef.current && index >= 0) {
      const targetScrollTop = index * sectionRef.current.clientHeight

      sectionRef.current.scrollTo({
        top: targetScrollTop,
        behavior: "smooth",
      })

      // Reset scrolling state after animation completes
      setTimeout(() => {
        setScrolling(false)
      }, 1000)
    }
  }

  // Handle keyboard navigation within the company list
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, companyId: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      handleCompanyChange(companyId)
    }
  }

  return (
    <section
      id="experience"
      className="min-h-screen lg:h-screen py-12 relative overflow-hidden w-screen bg-white dark:bg-black-100 z-10"
      aria-labelledby="experience-heading"
    >
      <div className="container mx-auto px-4 h-full flex flex-col max-w-7xl">
        <div className="text-center mb-8">
          <h2
            id="experience-heading"
            className={cn(
              "text-4xl md:text-5xl font-bold mb-4 transition-all duration-700 text-white tracking-tight",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            )}
          >
            Professional Experience
          </h2>
          <p
            className={cn(
              "text-lg md:text-xl text-gray-400 max-w-2xl mx-auto transition-all duration-700 delay-100 font-light",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            )}
          >
            Building scalable solutions across diverse technology stacks
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 flex-1 relative">
          {/* Left Column: Company Navigation */}
          <div
            className={cn(
              "w-full lg:w-1/4 flex lg:flex-col overflow-x-auto lg:overflow-x-visible overflow-y-hidden lg:overflow-y-auto space-x-3 lg:space-x-0 lg:space-y-3 transition-all duration-700 delay-200 relative z-10 pb-2 lg:pb-0",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4",
            )}
          >
            {workExperience.map((company, idx) => (
              <button
                key={company.id}
                ref={(el: HTMLButtonElement | null): void => {
                  navRefs.current[idx] = el;
                }}
                className={cn(
                  "group flex items-center px-4 lg:px-6 py-3 lg:py-4 rounded-xl text-left transition-all duration-300 relative border backdrop-blur-sm flex-shrink-0 lg:flex-shrink min-w-max lg:min-w-0",
                  selectedCompanyId === company.id
                    ? "bg-gray-900/80 text-white border-gray-700 shadow-lg"
                    : "text-gray-400 border-gray-800/50 hover:bg-gray-900/30 hover:text-white hover:border-gray-700",
                )}
                onClick={() => handleCompanyChange(company.id)}
                onKeyDown={(e) => handleKeyDown(e, company.id)}
                aria-pressed={selectedCompanyId === company.id}
                tabIndex={0}
                style={{
                  boxShadow: selectedCompanyId === company.id ? `0 0 20px ${company.color}20` : "none",
                  borderLeft:
                    selectedCompanyId === company.id ? `3px solid ${company.color}` : "1px solid rgba(31, 41, 55, 0.5)",
                }}
              >
                <Building
                  className={cn(
                    "h-4 w-4 lg:h-5 lg:w-5 mr-2 lg:mr-3 transition-colors",
                    selectedCompanyId === company.id ? "text-white" : "text-gray-500",
                  )}
                  style={{ color: selectedCompanyId === company.id ? company.color : "" }}
                />
                <span className={cn(
                  "tracking-wide text-sm lg:text-base",
                  selectedCompanyId === company.id ? "font-semibold" : "font-light"
                )}>
                  {company.company}
                </span>

                {selectedCompanyId === company.id && (
                  <ArrowRight className="h-3 w-3 lg:h-4 lg:w-4 ml-auto hidden lg:block" style={{ color: company.color }} />
                )}
              </button>
            ))}
          </div>

          {/* Right Column: Experience Details */}
          <div
            className={cn(
              "w-full lg:w-3/4 transition-all duration-700 delay-300 relative",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4",
            )}
          >
            {/* Mobile: Single card view */}
            <div className="lg:hidden">
              <motion.div
                key={selectedCompany.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6 p-6 rounded-2xl border border-gray-800/80 backdrop-blur-sm bg-gray-900/30 w-full shadow-lg"
              >
                <div className="space-y-2">
                  <div className="h-1 w-16 rounded-full mb-4" style={{ backgroundColor: selectedCompany.color }} />

                  <h3 className="text-xl font-bold flex flex-col gap-1 tracking-tight">
                    <span className="text-white">{selectedCompany.title}</span>
                    <span className="text-sm font-light">
                      <span className="text-gray-400">@</span>
                      <span style={{ color: selectedCompany.color }} className="font-semibold"> {selectedCompany.company}</span>
                    </span>
                  </h3>

                  <div className="flex flex-col gap-2 text-sm text-gray-400 mt-2 font-light">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" style={{ color: selectedCompany.color }} />
                      <span className="font-medium">{selectedCompany.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" style={{ color: selectedCompany.color }} />
                      <span className="font-medium">{selectedCompany.location}</span>
                    </div>
                  </div>
                </div>

                <div
                  className="h-px w-full"
                  style={{
                    background: `linear-gradient(to right, transparent, ${selectedCompany.color}40, transparent)`,
                  }}
                />

                <ul className="space-y-3">
                  {selectedCompany.details.map((detail, idx) => {
                    const isNested = detail.startsWith("  - ")
                    const content = isNested ? detail.substring(4) : detail

                    return isNested ? (
                      <motion.li
                        key={idx}
                        className="ml-6 flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 + idx * 0.05 }}
                      >
                        <div
                          className="h-1.5 w-1.5 rounded-full mt-2 mr-3 flex-shrink-0"
                          style={{ backgroundColor: selectedCompany.color }}
                        />
                        <p className="text-gray-300 leading-relaxed text-base">
                          {parseTextWithBold(content)}
                        </p>
                      </motion.li>
                    ) : (
                      <motion.li
                        key={idx}
                        className="flex items-start group"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                      >
                        <div
                          className="mt-1 mr-3 flex-shrink-0 h-4 w-4 rounded-full flex items-center justify-center transition-colors"
                          style={{
                            backgroundColor: `${selectedCompany.color}10`,
                            border: `1px solid ${selectedCompany.color}40`,
                          }}
                        >
                          <div className="h-1 w-1 rounded-full" style={{ backgroundColor: selectedCompany.color }} />
                        </div>
                        <p className="text-gray-300 leading-relaxed text-base">
                          {parseTextWithBold(content)}
                        </p>
                      </motion.li>
                    )
                  })}
                </ul>
              </motion.div>
            </div>

            {/* Desktop: Scrollable view */}
            <div
              ref={sectionRef}
              className={cn(
                "hidden lg:block overflow-y-auto snap-y snap-mandatory",
                "scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent h-full",
              )}
              style={{
                minHeight: "calc(100vh - 250px)",
                scrollSnapType: "y mandatory",
              }}
            >
              {workExperience.map((company, index) => (
                <div
                  key={company.id}
                  ref={(el: HTMLDivElement | null): void => {
                    companySectionsRef.current[index] = el;
                  }}
                  className="h-full snap-start snap-always"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={company.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="h-full flex items-start"
                    >
                      <MagicCard className="p-8 rounded-2xl border border-gray-800/80 backdrop-blur-sm bg-gray-900/30 w-full shadow-lg">
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <div className="h-1 w-16 rounded-full mb-4" style={{ backgroundColor: company.color }} />

                            <h3 className="text-2xl md:text-3xl font-bold flex flex-wrap items-center gap-2 tracking-tight">
                              <span className="text-white">{company.title}</span>
                              <span className="text-gray-400 font-light">@</span>
                              <span style={{ color: company.color }}>{company.company}</span>
                            </h3>

                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm text-gray-400 mt-2">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2" style={{ color: company.color }} />
                                <span className="font-semibold">{company.duration}</span>
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-2" style={{ color: company.color }} />
                                <span className="font-semibold">{company.location}</span>
                              </div>
                            </div>
                          </div>

                          <div
                            className="h-px w-full"
                            style={{
                              background: `linear-gradient(to right, transparent, ${company.color}40, transparent)`,
                            }}
                          />

                          <ul className="space-y-4">
                            {company.details.map((detail, idx) => {
                              const isNested = detail.startsWith("  - ")
                              const content = isNested ? detail.substring(4) : detail

                              return isNested ? (
                                <motion.li
                                  key={idx}
                                  className="ml-8 flex items-start"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: 0.1 + idx * 0.05 }}
                                >
                                  <div
                                    className="h-1.5 w-1.5 rounded-full mt-2 mr-3 flex-shrink-0"
                                    style={{ backgroundColor: company.color }}
                                  />
                                  <p className="text-gray-300 leading-relaxed text-base">
                                    {parseTextWithBold(content)}
                                  </p>
                                </motion.li>
                              ) : (
                                <motion.li
                                  key={idx}
                                  className="flex items-start group"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                                >
                                  <div
                                    className="mt-1 mr-3 flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center transition-colors"
                                    style={{
                                      backgroundColor: `${company.color}10`,
                                      border: `1px solid ${company.color}40`,
                                    }}
                                  >
                                    <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: company.color }} />
                                  </div>
                                  <p className="text-gray-300 leading-relaxed text-base">
                                    {parseTextWithBold(content)}
                                  </p>
                                </motion.li>
                              )
                            })}
                          </ul>
                        </div>
                      </MagicCard>
                    </motion.div>
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
