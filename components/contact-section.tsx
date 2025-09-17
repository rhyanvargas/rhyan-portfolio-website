"use client"

import { Button } from "@/components/ui/button"
import { getPortfolioConfig } from "@/lib/config"

export function ContactSection() {
  const config = getPortfolioConfig()

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            <span className="text-accent font-mono text-lg">04.</span> {config.contact.title}
          </h2>
        </div>

        <div className="space-y-8">
          <h3 className="text-4xl sm:text-5xl font-bold text-foreground">
            <span className="text-balance">{config.contact.subtitle}</span>
          </h3>

          <p className="text-lg text-muted-foreground leading-relaxed text-pretty">{config.contact.description}</p>

          <div className="pt-8">
            <Button
              size="lg"
              variant="outline"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground font-mono bg-transparent"
              onClick={() => window.open(`mailto:${config.personal.email}`, "_blank")}
            >
              {config.contact.cta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
