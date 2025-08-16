"use client"
import { useRef, useEffect } from "react";
import { FaLocationArrow } from "react-icons/fa6";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Github, Linkedin, Download, Mail } from "lucide-react";
import { Spotlight } from "../ui/Spotlight";

const Hero = () => {


  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    typeof window != 'undefined' && window.scrollTo(0, 0);

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const { clientX, clientY } = e;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      containerRef.current.style.setProperty("--x", `${x}px`);
      containerRef.current.style.setProperty("--y", `${y}px`);
    };

    const el = containerRef.current;
    if (el) {
      el.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (el) {
        el.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const socialVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 1.2,
        staggerChildren: 0.1
      }
    }
  };

  const socialItemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden min-h-[80vh] flex items-center justify-center bg-white dark:bg-black-100"
    >
      {/**
       *  UI: Spotlights
       *  Link: https://ui.aceternity.com/components/spotlight
       */}
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-[80vh]"
          fill="white"
        />
        <Spotlight
          className="h-[80vh] w-[50vw] top-10 left-full"
          fill="purple"
        />
        <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
      </div>

      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-grid-white/[0.01] -z-10" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none h-56 w-56 rounded-full bg-primary/30 blur-[100px] -z-10"
          style={{
            transform: "translate(calc(-50% + var(--x, 0px) / 20), calc(-50% + var(--y, 0px) / 20))"
          }}
        />
        <div
          className="absolute top-1/4 right-1/4 pointer-events-none h-56 w-56 rounded-full bg-blue-500/20 blur-[120px] -z-10"
          style={{
            transform: "translate(calc(var(--x, 0px) / -30), calc(var(--y, 0px) / -30))"
          }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 pointer-events-none h-60 w-60 rounded-full bg-purple-500/20 blur-[130px] -z-10"
          style={{
            transform: "translate(calc(var(--x, 0px) / 40), calc(var(--y, 0px) / 40))"
          }}
        />
      </div>

      {/* Mask for gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] -z-10" />

      {/* Content */}
      <motion.div
        className="px-4 max-w-5xl w-full mx-auto flex flex-col items-center justify-center py-20 z-50 h-screen gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400"
          variants={itemVariants}
        >
          I build products that scale. I write clean code. <div className="text-cyan-500">I create digital experiences.</div>
        </motion.h1>

        <motion.p
          className="mt-4 text-center md:tracking-wider mb-8 text-base md:text-lg lg:text-xl text-gray-400"
          variants={itemVariants}
        >
          I'm Milan Katira — a full-stack engineer with a frontend soul and backend brawn. From React components to APIs, I build performant, scalable, and delightful digital experiences.
        </motion.p>

        <motion.p
          className="mb-6 text-center text-base md:text-lg text-amber-400"
          variants={itemVariants}
        >
          Powered by clean code, TypeScript expertise, and modern frameworks.
        </motion.p>

        {/* Social Icons */}
        <motion.div
          className="flex items-center justify-center gap-4 mt-2 mb-8"
          variants={socialVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.a
            href="https://github.com/milankatira"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-2 bg-gray-900/50 hover:bg-gray-800 rounded-full transition-colors duration-300"
            variants={socialItemVariants}
            aria-label="GitHub Profile"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="h-5 w-5 text-gray-200 group-hover:text-white transition-colors" />
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/milan-katira/"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-2 bg-gray-900/50 hover:bg-blue-700 rounded-full transition-colors duration-300"
            variants={socialItemVariants}
            aria-label="LinkedIn Profile"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Linkedin className="h-5 w-5 text-gray-200 group-hover:text-white transition-colors" />
          </motion.a>

          <motion.a
            href="mailto:milankatira26@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-2 bg-gray-900/50 hover:bg-blue-500 rounded-full transition-colors duration-300"
            variants={socialItemVariants}
            aria-label="Email Contact"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail className="h-5 w-5 text-gray-200 group-hover:text-white transition-colors" />
          </motion.a>

          <motion.a
            href="/Milan_Katira_Senior_FullStack_Developer_4YOE.pdf"
            download="Milan_Katira_Senior_FullStack_Developer_4YOE.pdf"
            className="group p-2 bg-gray-900/50 hover:bg-green-700 rounded-full transition-colors duration-300"
            variants={socialItemVariants}
            aria-label="Download Resume"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="h-5 w-5 text-gray-200 group-hover:text-white transition-colors" />
          </motion.a>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Button
            asChild
            size="lg"
            className={cn(
              "relative group ",
              "hover:shadow-md",
              "transition-all duration-300 ease-out"
            )}
          >

            <a href="#about" className="flex items-center gap-2 text-black">
              <span>Show my work</span>
              <span className="inline-block transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 duration-200">
                <FaLocationArrow className="h-4 w-4" />
              </span>

              <span className="absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-b from-gray-600 to-purple-600/20 opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
