"use client"
import TechStack from './TechStack'

export function TechStackSection() {

  return (
    <section className="container bg-white dark:bg-black-100">
    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-12">
      Technology Stack
    </h2>

    <TechStack />
  </section>
  )
}
