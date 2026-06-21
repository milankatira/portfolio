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
    id: "gohighlevel",
    company: "GoHighLevel",
    title: "SDE-II",
    duration: "Sep 2025 – Present",
    location: "Remote",
    color: "#f59e0b",
    details: [
      "Manage core **media service infrastructure** and partnered cross-functionally to deliver a scalable media model, robust REST APIs, and seamless editor integrations.",
      "Resolved critical **Node.js heap exhaustion** and OOM failures through memory profiling and by refactoring payload handling into **non-blocking stream-based flows**.",
      "Engineered a **multipart upload API** for files up to **500 MB** with constant memory usage, replacing inefficient buffer-heavy processing.",
      "Improved system throughput with **Redis-backed caching**, intelligent request batching, and **distributed rate limiting**.",
      "Architected a resilient **Canva integration** to ingest large design assets into internal media systems reliably at scale.",
    ],
  },
  {
    id: "instaservice",
    company: "Instaservice",
    title: "Senior Software Engineer",
    duration: "Jul 2023 – Sep 2025",
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
      "Led frontend and backend development across several **large-scale platforms**:",
      "  - Engineered a backend system that handled **8.7 million API requests within 48 hours** and supported over **15,000 unique users per day**.",
      "  - Built a comprehensive **interview and hiring platform** with **Google Meet and Zoom integration**, online coding and MCQ assessments, and optimized memory usage (**1.2 GB RAM handling 300+ sessions**).",
      "  - Delivered **reusable UI components** and dynamic user flows for a high-volume video content platform using **ReactJS** and modular design principles.",
      "Contributed to a **global retail technology project** by writing utility functions with **100% unit test coverage** and implementing complex modal and interface logic.",
      "Collaborated with blockchain developers to write and deploy **smart contracts in Solidity**, integrating with **Binance Smart Chain (BSC)** and **Hedera Hashgraph**.",
      "Participated in the backend architecture for a **distributed application ecosystem**, incorporating tools like **Contentful CMS, Customer.io, and JW Player API** to enable content management and automation.",
    ],
  },
]

export function ExperienceSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedCompanyId, setSelectedCompanyId] = useState(workExperience[0].id)
  const navRefs = useRef<(HTMLButtonElement | null)[]>([])

  const selectedCompany =
    workExperience.find((company) => company.id === selectedCompanyId) || workExperience[0]

  // Entrance animation when the section scrolls into view
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
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  // Roving-focus keyboard navigation across the company tabs
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number, companyId: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      setSelectedCompanyId(companyId)
      return
    }

    const lastIndex = workExperience.length - 1
    let nextIndex: number | null = null
    if (e.key === "ArrowDown" || e.key === "ArrowRight") nextIndex = index === lastIndex ? 0 : index + 1
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") nextIndex = index === 0 ? lastIndex : index - 1

    if (nextIndex !== null) {
      e.preventDefault()
      const next = workExperience[nextIndex]
      setSelectedCompanyId(next.id)
      navRefs.current[nextIndex]?.focus()
    }
  }

  return (
    <section
      id="experience"
      className="py-20 md:py-28 relative overflow-hidden w-full bg-black-100 z-10"
      aria-labelledby="experience-heading"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12 md:mb-16">
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

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 items-start">
          {/* Left: Company tabs */}
          <div
            role="tablist"
            aria-label="Companies"
            aria-orientation="vertical"
            className={cn(
              "w-full lg:w-1/4 flex lg:flex-col overflow-x-auto lg:overflow-x-visible space-x-3 lg:space-x-0 lg:space-y-3 pb-2 lg:pb-0 transition-all duration-700 delay-200",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4",
            )}
          >
            {workExperience.map((company, idx) => {
              const isSelected = selectedCompanyId === company.id
              return (
                <button
                  key={company.id}
                  ref={(el: HTMLButtonElement | null): void => {
                    navRefs.current[idx] = el
                  }}
                  role="tab"
                  id={`tab-${company.id}`}
                  aria-selected={isSelected}
                  aria-controls={`panel-${company.id}`}
                  tabIndex={isSelected ? 0 : -1}
                  className={cn(
                    "group flex items-center px-4 lg:px-6 py-3 lg:py-4 rounded-xl text-left transition-all duration-300 relative border backdrop-blur-sm flex-shrink-0 lg:flex-shrink min-w-max lg:min-w-0",
                    isSelected
                      ? "bg-surface text-white border-hairline shadow-lg"
                      : "text-gray-400 border-transparent hover:bg-surface/50 hover:text-white",
                  )}
                  onClick={() => setSelectedCompanyId(company.id)}
                  onKeyDown={(e) => handleKeyDown(e, idx, company.id)}
                  style={{
                    boxShadow: isSelected ? `0 0 20px ${company.color}20` : "none",
                    borderLeft: isSelected ? `3px solid ${company.color}` : "3px solid transparent",
                  }}
                >
                  <Building
                    className={cn(
                      "h-4 w-4 lg:h-5 lg:w-5 mr-2 lg:mr-3 transition-colors",
                      isSelected ? "text-white" : "text-gray-500",
                    )}
                    style={{ color: isSelected ? company.color : "" }}
                  />
                  <span
                    className={cn(
                      "tracking-wide text-sm lg:text-base",
                      isSelected ? "font-semibold" : "font-light",
                    )}
                  >
                    {company.company}
                  </span>

                  {isSelected && (
                    <ArrowRight
                      className="h-3 w-3 lg:h-4 lg:w-4 ml-auto hidden lg:block"
                      style={{ color: company.color }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* Right: Selected experience panel */}
          <div
            id={`panel-${selectedCompany.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${selectedCompany.id}`}
            tabIndex={0}
            className={cn(
              "w-full lg:w-3/4 transition-all duration-700 delay-300",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4",
            )}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCompany.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <MagicCard
                  gradientFrom={selectedCompany.color}
                  gradientTo="#06b6d4"
                  gradientColor="#0f172a"
                  className="p-6 md:p-8 rounded-2xl border border-hairline backdrop-blur-sm bg-surface/60 w-full shadow-lg"
                >
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div
                        className="h-1 w-16 rounded-full mb-4"
                        style={{ backgroundColor: selectedCompany.color }}
                      />

                      <h3 className="text-2xl md:text-3xl font-bold flex flex-wrap items-center gap-2 tracking-tight">
                        <span className="text-white">{selectedCompany.title}</span>
                        <span className="text-gray-400 font-light">@</span>
                        <span style={{ color: selectedCompany.color }}>{selectedCompany.company}</span>
                      </h3>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm text-gray-400 mt-2">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" style={{ color: selectedCompany.color }} />
                          <span className="font-semibold">{selectedCompany.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" style={{ color: selectedCompany.color }} />
                          <span className="font-semibold">{selectedCompany.location}</span>
                        </div>
                      </div>
                    </div>

                    <div
                      className="h-px w-full"
                      style={{
                        background: `linear-gradient(to right, transparent, ${selectedCompany.color}40, transparent)`,
                      }}
                    />

                    <ul className="space-y-4">
                      {selectedCompany.details.map((detail, idx) => {
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
                              className="mt-1 mr-3 flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center transition-colors"
                              style={{
                                backgroundColor: `${selectedCompany.color}10`,
                                border: `1px solid ${selectedCompany.color}40`,
                              }}
                            >
                              <div
                                className="h-1.5 w-1.5 rounded-full"
                                style={{ backgroundColor: selectedCompany.color }}
                              />
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
        </div>
      </div>
    </section>
  )
}
