"use client"

import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string
    className?: string
  }[]
  className?: string
  cursorClassName?: string
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(150) // milliseconds per character

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentWord = words[currentWordIndex].text
      
      // If deleting
      if (isDeleting) {
        setCurrentText(currentWord.substring(0, currentText.length - 1))
        setTypingSpeed(50) // faster when deleting
        
        // When fully deleted
        if (currentText === "") {
          setIsDeleting(false)
          setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length)
          setTypingSpeed(150) // reset typing speed
        }
      } 
      // If typing
      else {
        setCurrentText(currentWord.substring(0, currentText.length + 1))
        
        // When fully typed
        if (currentText === currentWord) {
          // Pause at the end of the word
          setTypingSpeed(2000) // longer pause when word is complete
          
          // Start deleting after pause
          setTimeout(() => {
            setIsDeleting(true)
            setTypingSpeed(50) // set speed for deleting
          }, 2000)
        }
      }
    }, typingSpeed)
    
    return () => clearTimeout(timeout)
  }, [currentText, currentWordIndex, isDeleting, typingSpeed, words])

  return (
    <div className={cn("inline-flex items-center", className)}>
      <span className="inline-block overflow-hidden">
        <span className={words[currentWordIndex].className}>
          {currentText}
        </span>
        <span
          className={cn(
            "ml-1 inline-block h-4 w-[2px] animate-blink bg-primary",
            cursorClassName
          )}
        ></span>
      </span>
    </div>
  )
}