"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import { getPortfolioConfig } from "@/lib/config"

export function HeroSection() {
  const config = getPortfolioConfig()

  const scrollToAbout = () => {
    const element = document.querySelector("#about")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <p className="text-accent font-mono text-sm mb-4">Hi, my name is</p>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-4">
            <span className="text-balance">
              {config.personal.firstName} {config.personal.lastName}
            </span>
          </h1>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-muted-foreground mb-8">
            <span className="text-balance">{config.personal.tagline}</span>
          </h2>
        </div>

        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed text-pretty">
          {config.personal.description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-mono"
            onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
          >
            Check out my work
          </Button>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-accent"
              onClick={() => window.open(config.social.github, "_blank")}
            >
              <Github className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-accent"
              onClick={() => window.open(config.social.linkedin, "_blank")}
            >
              <Linkedin className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-accent"
              onClick={() => window.open(`mailto:${config.personal.email}`, "_blank")}
            >
              <Mail className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={scrollToAbout}
          className="text-muted-foreground hover:text-accent animate-bounce"
        >
          <ArrowDown className="h-5 w-5" />
        </Button>
      </div>
    </section>
  )
}
