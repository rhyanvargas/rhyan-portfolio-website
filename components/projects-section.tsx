"use client"

import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getPortfolioConfig } from "@/lib/config"
import { getFeaturedProjects, getOtherProjects } from "@/lib/project-utils"
import { Badge } from "./ui/badge"

export function ProjectsSection() {
  const config = getPortfolioConfig()
  const featuredProjects = config.projects.items ? getFeaturedProjects(config.projects.items) : []
  const otherProjects = config.projects.items ? getOtherProjects(config.projects.items) : []

  return (
    <section id="work" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            <span className="text-accent font-mono text-lg">03.</span> My Work
          </h2>
          <div className="w-20 h-px bg-accent"></div>
        </div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="space-y-20 mb-20  ">
            {featuredProjects.map((project, index) => (
              <div
                key={project.slug}
                className={`grid lg:grid-cols-12 gap-8 items-center ${index % 2 === 1 ? "lg:text-right" : ""}`}
              >
                <div className={`lg:col-span-7 ${index % 2 === 1 ? "lg:col-start-6" : ""}`}>
                  <div className="relative">
                    <Image
                      src={project.thumbnail || "/placeholder.svg"}
                      alt={project.title}
                      width={800}
                      height={400}
                      className="w-full h-64 object-cover rounded-lg"
                      priority={index < 2}
                    />

                  </div>
                </div>

                <div className={`lg:col-span-5 ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                  <div className="flex flex-col space-y-4">
                    <p className="text-accent font-mono text-sm">{project.role}</p>
                    <h3 className="text-2xl font-bold text-foreground">{project.title}</h3>

                    <Card className="p-6 bg-card border-border">
                      <p className="text-muted-foreground leading-relaxed">{project.summary}</p>
                    </Card>
                    <div className={`flex flex-wrap gap-2 mb-8 ${index % 2 === 1 ? "lg:justify-end" : ""}`}>
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="outline" className="">{tech}</Badge>
                      ))}
                    </div>
                    <div className={`items-center flex flex-wrap gap-4 text-sm ${index % 2 === 1 ? "lg:justify-end" : ""}`}>
                      {project.links.repo ? (
                        <a
                          href={project.links.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-accent underline transition-colors"
                        >
                          Code
                        </a>
                      ) : <Badge
                        variant="shadow"
                      // className="inline-flex items-center justify-center py-1 px-2 rounded-full  backdrop-blur-sm shadow-xs shadow-accent/50"
                      >

                        🚀 Coming Soon

                      </Badge>}
                      {project.links.demo && (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-accent underline transition-colors"
                        >
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Other Noteworthy Projects</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project, index) => (
                <Card
                  key={project.slug}
                  className="p-6 bg-card border-border hover:border-accent/50 transition-colors duration-300 group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-accent">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-sm md:opacity-0 md:group-hover:opacity-100 transition-opacity ">
                      {project.links.repo ? (
                        <a
                          href={project.links.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-accent underline transition-colors"
                        >
                          Code
                        </a>
                      ) : <Badge
                        variant="outline"
                        className="inline-flex items-center justify-center py-1 px-2 rounded-full  backdrop-blur-sm shadow-xs shadow-accent/50"
                      >

                        🚀 Coming Soon

                      </Badge>}
                      {project.links.demo ? (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-accent underline transition-colors"
                        >
                          Demo
                        </a>
                      ) : <Badge
                        variant="outline"
                        className="inline-flex items-center justify-center py-1 px-2 rounded-full  backdrop-blur-sm shadow-xs shadow-accent/50"
                      >

                        🚀 Coming Soon

                      </Badge>}
                    </div>
                  </div>

                  <Image
                    src={project.thumbnail || "/placeholder.svg"}
                    alt={project.title}
                    className="rounded-l h-48 w-full object-cover "
                    width={600}
                    height={350}
                    priority={index < 2}

                  />
                  <h4 className="text-lg font-semibold text-foreground mb-2">{project.title}</h4>
                  <p className="text-accent font-mono text-sm">{project.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.summary}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span key={tech} className="text-xs font-mono text-muted-foreground">
                        <Badge variant="outline">{tech}</Badge>
                      </span>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* <div className="text-center">
          <Button
            variant="outline"
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
          >
            Show More
          </Button>
        </div> */}
      </div>
    </section>
  )
}
