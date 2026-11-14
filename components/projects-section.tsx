"use client"

import { Suspense, useMemo } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FilterControls } from "@/components/filters/filter-controls"
import { FilterEmptyState } from "@/components/filters/filter-empty-state"
import { FilterProvider, useFilter } from "@/contexts/filter-context"
import { getPortfolioConfig } from "@/lib/config"
import { getAvailableFilterOptions } from "@/lib/available-filters"
import { filterProjects, hasActiveFilters } from "@/lib/filter-utils"
import { getFeaturedProjects, getOtherProjects } from "@/lib/project-utils"
import type { EnhancedProject, Project } from "@/schemas/portfolio"
import { cn } from "@/lib/utils"

function ProjectRoleLabel({ project }: { project: Project | EnhancedProject }) {
  if ("roles" in project && project.roles?.length) {
    return <p className="text-accent font-mono text-sm">{project.roles.join(" · ")}</p>
  }
  return <p className="text-accent font-mono text-sm">{project.role}</p>
}

function FeaturedProject({
  project,
  index,
}: {
  project: Project | EnhancedProject
  index: number
}) {
  const reverse = index % 2 === 1

  return (
    <div
      className={cn(
        "grid items-center gap-8 lg:grid-cols-12",
        reverse && "lg:text-right"
      )}
    >
      <div className={cn("lg:col-span-7", reverse && "lg:col-start-6")}>
        <div className="relative">
          <Image
            src={project.thumbnail || "/placeholder.svg"}
            alt={project.title}
            width={800}
            height={400}
            className="h-64 w-full rounded-lg object-cover"
            priority={index < 2}
          />
        </div>
      </div>

      <div
        className={cn(
          "lg:col-span-5",
          reverse && "lg:col-start-1 lg:row-start-1"
        )}
      >
        <div className="flex flex-col space-y-4">
          <ProjectRoleLabel project={project} />
          <h3 className="text-2xl font-bold text-foreground">{project.title}</h3>

          <Card className="border-border bg-card p-6">
            <p className="leading-relaxed text-muted-foreground">{project.summary}</p>
            {project.highlights.length > 0 && (
              <ul
                className={cn(
                  "mt-4 space-y-2 text-sm text-muted-foreground",
                  reverse && "lg:text-right"
                )}
              >
                {project.highlights.slice(0, 3).map((highlight) => (
                  <li
                    key={highlight}
                    className={cn(
                      "flex items-start gap-2",
                      reverse && "lg:flex-row-reverse"
                    )}
                  >
                    <span className="mt-1 text-accent" aria-hidden="true">
                      ▹
                    </span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          {project.metrics && project.metrics.length > 0 && (
            <div
              className={cn(
                "flex flex-wrap gap-4 text-sm",
                reverse && "lg:justify-end"
              )}
            >
              {project.metrics.map((metric) => (
                <div key={metric.label} className="font-mono">
                  <span className="font-semibold text-accent">{metric.value}</span>
                  <span className="ml-2 text-muted-foreground">{metric.label}</span>
                </div>
              ))}
            </div>
          )}

          <div
            className={cn(
              "mb-8 flex flex-wrap gap-2",
              reverse && "lg:justify-end"
            )}
          >
            {project.tech.map((tech) => (
              <Badge key={tech} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>
          <div
            className={cn(
              "flex flex-wrap items-center gap-4 text-sm",
              reverse && "lg:justify-end"
            )}
          >
            {project.links.repo ? (
              <a
                href={project.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground underline transition-colors hover:text-accent"
              >
                Code
              </a>
            ) : (
              <Badge variant="shadow">Coming Soon</Badge>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground underline transition-colors hover:text-accent"
              >
                Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function OtherProject({
  project,
  index,
}: {
  project: Project | EnhancedProject
  index: number
}) {
  return (
    <Card className="border-border bg-card p-6 transition-colors duration-300 hover:border-accent/50">
      <div className="mb-4 flex items-start justify-between">
        <div className="text-accent" aria-hidden="true">
          <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          {project.links.repo ? (
            <a
              href={project.links.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground underline transition-colors hover:text-accent"
            >
              Code
            </a>
          ) : (
            <Badge variant="outline">Coming Soon</Badge>
          )}
          {project.links.demo ? (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground underline transition-colors hover:text-accent"
            >
              Demo
            </a>
          ) : (
            <Badge variant="outline">Coming Soon</Badge>
          )}
        </div>
      </div>

      <Image
        src={project.thumbnail || "/placeholder.svg"}
        alt={project.title}
        className="h-48 w-full rounded-l object-cover"
        width={600}
        height={350}
        priority={index < 2}
      />
      <h4 className="mb-2 text-lg font-semibold text-foreground">{project.title}</h4>
      <ProjectRoleLabel project={project} />
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{project.summary}</p>

      <div className="flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <Badge key={tech} variant="outline">
            {tech}
          </Badge>
        ))}
      </div>
    </Card>
  )
}

function ProjectsSectionContent() {
  const config = getPortfolioConfig()
  const { state } = useFilter()

  const allProjects = useMemo(
    () => config.projects.items ?? [],
    [config.projects.items]
  )

  const availableFilters = useMemo(
    () => getAvailableFilterOptions(allProjects),
    [allProjects]
  )

  const filteredProjects = useMemo(
    () => filterProjects(allProjects, state),
    [allProjects, state]
  )

  const featuredProjects = useMemo(
    () => getFeaturedProjects(filteredProjects),
    [filteredProjects]
  )
  const otherProjects = useMemo(
    () => getOtherProjects(filteredProjects),
    [filteredProjects]
  )

  const filtersActive = hasActiveFilters(state)
  const resultCount = filteredProjects.length

  return (
    <section id="work" className="scroll-mt-20 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            <span className="font-mono text-lg text-accent">02.</span> My Work
          </h2>
          <div className="h-px w-20 bg-accent" />
        </div>

        <div className="mb-10 space-y-4">
          <FilterControls
            availableTechnologies={availableFilters.technologies}
            availableRoles={availableFilters.roles}
            availableSkillCategories={availableFilters.skillCategories}
            availableDomains={availableFilters.domains}
          />

          <div
            className="flex flex-wrap items-center justify-between gap-2"
            aria-live="polite"
            aria-atomic="true"
          >
            {filtersActive ? (
              <p className="font-mono text-sm text-muted-foreground">
                Showing{" "}
                <span className="text-accent">{resultCount}</span>{" "}
                {resultCount === 1 ? "project" : "projects"}
              </p>
            ) : (
              <p className="font-mono text-sm text-muted-foreground">
                {allProjects.length} projects
              </p>
            )}
          </div>
        </div>

        {resultCount === 0 ? (
          <FilterEmptyState />
        ) : (
          <div className="transition-opacity duration-300">
            {featuredProjects.length > 0 && (
              <div className="mb-20 space-y-20">
                {featuredProjects.map((project, index) => (
                  <FeaturedProject
                    key={project.slug}
                    project={project}
                    index={index}
                  />
                ))}
              </div>
            )}

            {otherProjects.length > 0 && (
              <div className="mb-16">
                <h3 className="mb-8 text-center text-2xl font-bold text-foreground">
                  Other Noteworthy Projects
                </h3>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {otherProjects.map((project, index) => (
                    <OtherProject
                      key={project.slug}
                      project={project}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

function ProjectsSectionFallback() {
  return (
    <section id="work" className="scroll-mt-20 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            <span className="font-mono text-lg text-accent">02.</span> My Work
          </h2>
          <div className="h-px w-20 bg-accent" />
        </div>
        <p className="font-mono text-sm text-muted-foreground">Loading filters…</p>
      </div>
    </section>
  )
}

export function ProjectsSection() {
  return (
    <Suspense fallback={<ProjectsSectionFallback />}>
      <FilterProvider>
        <ProjectsSectionContent />
      </FilterProvider>
    </Suspense>
  )
}
