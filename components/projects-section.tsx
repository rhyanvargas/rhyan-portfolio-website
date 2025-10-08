"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getPortfolioConfig } from "@/lib/config"

export function ProjectsSection() {
  const config = getPortfolioConfig()

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            <span className="text-accent font-mono text-lg">03.</span> Some Things I've Built
          </h2>
          <div className="w-20 h-px bg-accent"></div>
        </div>

        {/* Featured Projects */}
        <div className="space-y-20 mb-20">
          {config.projects.featured.map((project, index) => (
            <div
              key={index}
              className={`grid lg:grid-cols-12 gap-8 items-center ${index % 2 === 1 ? "lg:text-right" : ""}`}
            >
              <div className={`lg:col-span-7 ${index % 2 === 1 ? "lg:col-start-6" : ""}`}>
                <div className="relative group">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-accent/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              <div className={`lg:col-span-5 ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                <div className="space-y-4">
                  <p className="text-accent font-mono text-sm">Featured Project</p>
                  <h3 className="text-2xl font-bold text-foreground">{project.title}</h3>

                  <Card className="p-6 bg-card border-border">
                    <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                  </Card>

                  <div className={`flex flex-wrap gap-2 ${index % 2 === 1 ? "lg:justify-end" : ""}`}>
                    {project.technologies.map((tech) => (
                      <span key={tech} className="text-sm font-mono text-muted-foreground">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className={`flex flex-wrap gap-4 text-sm ${index % 2 === 1 ? "lg:justify-end" : ""}`}>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-accent underline transition-colors"
                    >
                      Code
                    </a>
                    <a
                      href={project.external}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-accent underline transition-colors"
                    >
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Projects */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Other Noteworthy Projects</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {config.projects.other.map((project, index) => (
              <Card
                key={index}
                className="p-6 bg-card border-border hover:border-accent/50 transition-colors duration-300 group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="text-accent">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-accent underline transition-colors"
                      >
                        Code
                      </a>
                    )}
                    {project.external && (
                      <a
                        href={project.external}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-accent underline transition-colors"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>

                <h4 className="text-lg font-semibold text-foreground mb-2">{project.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="text-xs font-mono text-muted-foreground">
                      {tech}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
          >
            Show More
          </Button>
        </div>
      </div>
    </section>
  )
}
