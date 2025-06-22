"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const defaultTechnologies = [
  "React",
  "TypeScript",
  "Next.js",
  "Node.js",
  "Python",
  "PostgreSQL",
  "AWS",
  "Docker",
  "GraphQL",
  "REST APIs",
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      duration: 0.6,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

const techVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.05,
      duration: 0.35,
      ease: "easeOut",
    },
  }),
}

export default function AboutSection({ technologies = defaultTechnologies }) {
  return (
    <section
      id="about"
      aria-label="About Me"
      className="text-gray-300 py-20 px-6 sm:px-0 z-50 w-full max-w-[1200px] mx-auto"
    >
      <motion.div
        className="grid md:grid-cols-3 gap-10 items-start"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        {/* Left: About Text */}
        <div className="md:col-span-2 space-y-6 text-gray-300">
          <motion.p className="leading-8" variants={itemVariants}>
            I'm a <span className="text-cyan-400 font-semibold">full-stack engineer</span> with a passion for building performant, scalable, and elegant digital products. With{" "}
            <span className="text-white font-semibold">4+ years of experience</span>, I specialize in creating AI-driven SaaS platforms, responsive user interfaces, and modern backend systems.
          </motion.p>

          <motion.p className="leading-8" variants={itemVariants}>
            I work with <span className="text-cyan-400 font-semibold">React, TypeScript, Node.js, and scalable design systems</span> to architect frontends and collaborate closely with backend and product teams. I've contributed to platforms serving{" "}
            <span className="text-white font-semibold">20,000+ active users weekly</span>.
          </motion.p>

          <motion.p className="leading-8" variants={itemVariants}>
            Outside of engineering, I mentor junior developers, contribute to open-source, and share my learnings through articles and tech talks.
          </motion.p>

          <motion.p className="leading-8" variants={itemVariants}>
            Currently focused on DX with React 18+, internal tooling, and scaling UI systems across teams with clean code and modern frameworks.
          </motion.p>

          <motion.div variants={itemVariants}>
            <Button
              asChild
            >
              <Link
                href="/Resume_Milan_Katira.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Resume
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Right: Core Technologies */}
        <motion.div className="space-y-4" variants={itemVariants}>
          <motion.h3
            className="text-2xl font-semibold text-white mb-4"
            variants={itemVariants}
          >
            Core Technologies
          </motion.h3>
          <div className="flex flex-wrap gap-3">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={techVariants}
                whileHover={{ scale: 1.08 }}
              >
                <Badge className="bg-[#1e293b] hover:bg-[#334155] text-cyan-400 border border-[#334155] py-1.5 px-4 text-sm rounded-full transition-colors duration-200">
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
